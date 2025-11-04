from flask import Flask
from flask import request
from flask import jsonify
import requests
import sqlite3
from flask_cors import CORS

#api key for OMDB
OMDB_KEY = "e32f6c75"
#sqlite3 database
DATABASE = "movie.db"


#creates Flask instance
app = Flask(__name__)
#lets React make requests to flask backend
CORS(app)

def make_db():
    #create database or establish database connection
    conn = sqlite3.connect('movie.db')
    #create a cursor object to execute SQL commands and interact with the database
    cursor = conn.cursor()
    #create table and columns to store movie information
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS movie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            year TEXT,
            rated TEXT,
            released TEXT,
            runtime TEXT,
            genre TEXT,
            director TEXT,
            writer TEXT,
            actors TEXT,
            plot TEXT,
            language TEXT,
            country TEXT,
            awards TEXT,
            imdb_rating TEXT,
            rotten_tomatoes_rating TEXT,
            metacritic_rating TEXT,
            poster TEXT
        )
    """)

    # Create TV show table (same structure as movie)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tvshow (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            year TEXT,
            rated TEXT,
            released TEXT,
            runtime TEXT,
            genre TEXT,
            director TEXT,
            writer TEXT,
            actors TEXT,
            plot TEXT,
            language TEXT,
            country TEXT,
            awards TEXT,
            imdb_rating TEXT,
            rotten_tomatoes_rating TEXT,
            metacritic_rating TEXT,
            poster TEXT
        )
    """)

    #commit and close sql changes and connection
    conn.commit()
    conn.close()

#function call to make db
make_db()

@app.route('/movies/search', methods=['GET'])
def search_multiple_movies():
    title = request.args.get('title')
    if not title:
        return jsonify({"error": "Title is required"}), 400
    title = title.strip()

    omdb_url = f"http://www.omdbapi.com/?s={title}&apikey={OMDB_KEY}"
    response = requests.get(omdb_url)
    data = response.json()

    if data.get('Response') == 'False':
        return jsonify({"error": "No movies found"}), 404

    movies = []
    for movie in data.get('Search', []):
        movies.append({
            'title': movie.get('Title'),
            'year': movie.get('Year'),
            'imdb_id': movie.get('imdbID'),
            'type': movie.get('Type'),
            'poster': movie.get('Poster')
        })

    return jsonify(movies), 200



#how to handle GET requests using flask
@app.route('/movies', methods=['GET'])
def search_movies():
    #get the 'title' query parameter from the request url
    title = request.args.get('title')
    #return error if title not found
    if not title:
        return jsonify({"ERROR": "Title not found"}), 400
    title = title.strip()

    #create url to call OMDB api with movie title and our key
    omdb_url = f"http://www.omdbapi.com/?t={title}&apikey={OMDB_KEY}"
    #HTTP request to OMDB
    response = requests.get(omdb_url)
    #convert JSON response to Python dict
    movie = response.json()

    #if OMDB did not find movie return error msg and code 404 for user error
    if movie.get('Response') == 'False':
        return jsonify({"error": "Movie not found"}), 404

    #if movie found check if it is in our db
    Title = movie.get('Title', '').strip()
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    #make sure we dont have duplicates in our database
    cur.execute("SELECT * FROM movie WHERE LOWER(title) = LOWER(?)", (Title,))
    #store match or None with fetchone
    match = cur.fetchone()
    #if match return and dont add duplicate to db
    if match:
        conn.close()
        return jsonify({
            "title": match[1],
            "year": match[2],
            "rated": match[3],
            "released": match[4],
            "runtime": match[5],
            "genre": match[6],
            "director": match[7],
            "writer": match[8],
            "actors": match[9],
            "plot": match[10],
            "language": match[11],
            "country": match[12],
            "awards": match[13],
            "imdb_rating": match[14],
            "rotten_tomatoes_rating": match[15],
            "metacritic_rating": match[16],
            "poster": match[17]
        }), 200
    #get rotten tomatoes rating from ratings lists
    #"imdb and metacritic are not in a ratings list"
    rotten_tomatoes = None
    #.get to avoid crash if RT does not exists
    for rating in movie.get('Ratings', []):
        if rating['Source'] == 'Rotten Tomatoes':
            rotten_tomatoes = rating['Value']

    #insert new movie into db
    #? are placeholders, this is called parameterzied query. Safe way to insert data into SQL
    cur.execute("""
        INSERT INTO movie (
            title, year, rated, released, runtime, genre, director, writer, actors, plot,
            language, country, awards, imdb_rating, rotten_tomatoes_rating, metacritic_rating, poster
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        #use .get to return None to avoid crash
        movie.get('Title'),
        movie.get('Year'),
        movie.get('Rated'),
        movie.get('Released'),
        movie.get('Runtime'),
        movie.get('Genre'),
        movie.get('Director'),
        movie.get('Writer'),
        movie.get('Actors'),
        movie.get('Plot'),
        movie.get('Language'),
        movie.get('Country'),
        movie.get('Awards'),
        movie.get('imdbRating'),
        rotten_tomatoes,
        movie.get('Metascore'),
        movie.get('Poster')
    ))
    #close and commit changes
    conn.commit()
    conn.close()

    #return the searched for movie data to the front end with success code 201
    return jsonify({
    "title": movie.get('Title'),
    "year": movie.get('Year'),
    "rated": movie.get('Rated'),
    "released": movie.get('Released'),
    "runtime": movie.get('Runtime'),
    "genre": movie.get('Genre'),
    "director": movie.get('Director'),
    "writer": movie.get('Writer'),
    "actors": movie.get('Actors'),
    "plot": movie.get('Plot'),
    "language": movie.get('Language'),
    "country": movie.get('Country'),
    "awards": movie.get('Awards'),
    "imdb_rating": movie.get('imdbRating'),
    "rotten_tomatoes_rating": rotten_tomatoes,
    "metacritic_rating": movie.get('Metascore'),
    "poster": movie.get('Poster')
}), 201

@app.route('/tvshows', methods=['GET'])
def search_tvshows():
    title = request.args.get('title')
    if not title:
        return jsonify({"error": "Title not found"}), 400

    omdb_url = f"http://www.omdbapi.com/?t={title}&type=series&apikey={OMDB_KEY}"
    response = requests.get(omdb_url)
    show = response.json()

    if show.get('Response') == 'False':
        return jsonify({"error": "TV show not found"}), 404

    Title = show.get('Title', '').strip()
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM tvshow WHERE LOWER(title) = LOWER(?)", (Title,))
    match = cur.fetchone()

    if match:
        conn.close()
        return jsonify({
            "title": match[1],
            "year": match[2],
            "rated": match[3],
            "released": match[4],
            "runtime": match[5],
            "genre": match[6],
            "director": match[7],
            "writer": match[8],
            "actors": match[9],
            "plot": match[10],
            "language": match[11],
            "country": match[12],
            "awards": match[13],
            "imdb_rating": match[14],
            "rotten_tomatoes_rating": match[15],
            "metacritic_rating": match[16],
            "poster": match[17]
        }), 200

    rotten_tomatoes = None
    for rating in show.get('Ratings', []):
        if rating['Source'] == 'Rotten Tomatoes':
            rotten_tomatoes = rating['Value']

    cur.execute("""
        INSERT INTO tvshow (
            title, year, rated, released, runtime, genre, director, writer, actors, plot,
            language, country, awards, imdb_rating, rotten_tomatoes_rating, metacritic_rating, poster
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        show.get('Title'),
        show.get('Year'),
        show.get('Rated'),
        show.get('Released'),
        show.get('Runtime'),
        show.get('Genre'),
        show.get('Director'),
        show.get('Writer'),
        show.get('Actors'),
        show.get('Plot'),
        show.get('Language'),
        show.get('Country'),
        show.get('Awards'),
        show.get('imdbRating'),
        rotten_tomatoes,
        show.get('Metascore'),
        show.get('Poster')
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "title": show.get('Title'),
        "year": show.get('Year'),
        "rated": show.get('Rated'),
        "released": show.get('Released'),
        "runtime": show.get('Runtime'),
        "genre": show.get('Genre'),
        "director": show.get('Director'),
        "writer": show.get('Writer'),
        "actors": show.get('Actors'),
        "plot": show.get('Plot'),
        "language": show.get('Language'),
        "country": show.get('Country'),
        "awards": show.get('Awards'),
        "imdb_rating": show.get('imdbRating'),
        "rotten_tomatoes_rating": rotten_tomatoes,
        "metacritic_rating": show.get('Metascore'),
        "poster": show.get('Poster')
    }), 201

@app.route('/filter', methods=['GET'])
def filter_movies():
    genres = request.args.getlist('genre')  # allows multiple genres
    if not genres:
        return jsonify({"error": "No genres provided"}), 400

    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    # Build a dynamic SQL query that matches ANY selected genre
    conditions = " OR ".join(["genre LIKE ?"] * len(genres))
    values = [f"%{g}%" for g in genres]

    cur.execute(f"SELECT * FROM movie WHERE {conditions}", values)
    rows = cur.fetchall()
    conn.close()

    if not rows:
        return jsonify([]), 200

    movies = []
    for row in rows:
        movies.append({
            "id": row[0],
            "title": row[1],
            "year": row[2],
            "genre": row[6],
            "poster": row[17],
            "imdb_rating": row[14]
        })

    return jsonify(movies), 200

@app.route('/tvfilter', methods=['GET'])
def filter_tvshows():
    genres = request.args.getlist('genre')  # multiple genres
    if not genres:
        return jsonify({"error": "No genres provided"}), 400

    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    # Match any selected genre (Action OR Drama OR Comedy)
    conditions = " OR ".join(["genre LIKE ?"] * len(genres))
    values = [f"%{g}%" for g in genres]

    cur.execute(f"SELECT * FROM tvshow WHERE {conditions}", values)
    rows = cur.fetchall()
    conn.close()

    if not rows:
        return jsonify([]), 200

    shows = []
    for row in rows:
        shows.append({
            "id": row[0],
            "title": row[1],
            "year": row[2],
            "genre": row[6],
            "poster": row[17],
            "imdb_rating": row[14]
        })

    return jsonify(shows), 200

@app.route('/people', methods=['GET'])
def get_people():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    # Collect movie people
    cur.execute("SELECT title, actors, director, writer FROM movie")
    movie_people = cur.fetchall()

    # Collect TV show people
    cur.execute("SELECT title, actors, director, writer FROM tvshow")
    tv_people = cur.fetchall()

    conn.close()

    all_people = []

    # Function to add entries with roles
    def add_person_entry(person_list, title, role_type):
        for person in person_list:
            cleaned = person.strip()
            if cleaned:
                all_people.append({
                    "name": cleaned,
                    "role": role_type,
                    "title": title
                })

    # Go through movies
    for title, actors, director, writer in movie_people + tv_people:
        if actors:
            add_person_entry(actors.split(','), title, "Actor")
        if director:
            add_person_entry(director.split(','), title, "Director")
        if writer:
            add_person_entry(writer.split(','), title, "Writer")

    # Remove duplicates (same name, role, title)
    unique_people = {f"{p['name']}|{p['role']}|{p['title']}": p for p in all_people}
    sorted_people = sorted(unique_people.values(), key=lambda x: x["name"])

    return jsonify(sorted_people)


@app.route('/movies/top', methods=['GET'])
def highest_rated_movies():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("""
        SELECT id, title, CAST(imdb_rating AS FLOAT) AS rating, poster
        FROM movie
        WHERE imdb_rating IS NOT NULL AND imdb_rating != 'N/A'
        ORDER BY rating DESC
        LIMIT 10
    """)
    rows = cur.fetchall()
    conn.close()
    result = []
    for i in rows:
        result.append({
            "id": i[0],
            "title": i[1],
            "rating": i[2],
            "poster": i[3]
        })
    return jsonify(result), 200


@app.route('/movies/awards', methods=['GET'])
def award_winning_movies():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id, 
            title,
            poster,
            CAST(
                SUBSTR(
                    awards,
                    INSTR(awards, "wins") - 3, 3
                ) AS INTEGER
            ) AS wins
        FROM movie
        WHERE awards LIKE '%wins%'
        ORDER BY wins DESC
        LIMIT 10;
    """)
    rows = cur.fetchall()
    conn.close()

    movies = []
    for row in rows:
        movies.append({
            "id": row[0],
            "title": row[1],
            "poster": row[2],
            "wins": row[3]
        })

    return jsonify(movies), 200



if __name__ == '__main__':
    #remove debug = true later
    app.run(debug=True)

