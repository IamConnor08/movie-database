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
    #commit and close sql changes and connection
    conn.commit()
    conn.close()

#function call to make db
make_db()



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

if __name__ == '__main__':
    #remove debug = true later
    app.run(debug=True)
    