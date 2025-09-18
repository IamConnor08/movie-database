import requests
import sqlite3

#add your own key
api_key = 
tmdb_url = "https://api.themoviedb.org/3"

conn = sqlite3.connect("movie.db")
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    release_date TEXT,
    runtime INTEGER,
    overview TEXT,
    rating REAL,
    poster TEXT,
    genres TEXT
)            
''')

conn.commit()

def search_movie(query):
    url = f"{tmdb_url}/search/movie"
    params = {"api_key": api_key, "query": query}
    response = requests.get(url, params=params).json()
    
    results = response.get("results")
    if results:
        return results[0]
    return None
        

def get_movie(movie_id):
    url = f"{tmdb_url}/movie/{movie_id}"
    params = {"api_key": api_key}
    response = requests.get(url, params=params)
    return response.json()

def clean_data(movie_json):
    img_url = "https://image.tmdb.org/t/p/w500"
    poster = movie_json.get("poster_path")
    return {
        "id": movie_json["id"],
        "title": movie_json["title"],
        "release_date": movie_json.get("release_date"),
        "runtime": movie_json.get("runtime"),
        "overview": movie_json.get("overview"),
        "genres": [g["name"] for g in movie_json.get("genres", [])],
        "rating": movie_json.get("vote_average"),
        "poster": f"{img_url}{poster}",
    }

def save_movie_to_db(movie):
    
    genres_str = ", ".join(movie["genres"]) if movie["genres"] else None
    
    cursor.execute('''
    INSERT OR REPLACE INTO movies (id, title, release_date, runtime, overview, rating, poster, genres)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        movie["id"],
        movie["title"],
        movie.get("release_date"),
        movie.get("runtime"),
        movie.get("overview"),
        movie.get("rating"),
        movie.get("poster"),
        genres_str
    ))
    conn.commit()


if __name__ == "__main__":
    title = input("enter a move name: ")
    
    movie = search_movie(title)
    if movie:
        print(f"Found: {movie['title']} (ID: {movie['id']})")
        
        details = get_movie(movie["id"])
        cleaned = clean_data(details)
        print(cleaned)

        save_movie_to_db(cleaned)
        
    else:
        print("No movie found")



    




