CREATE TABLE Movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT,
    genre VARCHAR(100),
    rating DECIMAL(2,1),
    runtime INT
);

CREATE TABLE Actors (
    actor_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob DATE,
    nationality VARCHAR(100)
);

CREATE TABLE Movie_Actor (
    movie_id INT REFERENCES Movies(movie_id),
    actor_id INT REFERENCES Actors(actor_id),
    PRIMARY KEY (movie_id, actor_id)
);

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255)
);

CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    movie_id INT REFERENCES Movies(movie_id),
    user_id INT REFERENCES Users(user_id),
    rating INT,
    comment TEXT
);

