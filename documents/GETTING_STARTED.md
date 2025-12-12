========================================================
GETTING STARTED — PROJECT SETUP GUIDE
========================================================

This guide explains how to install, configure, and run the Movie Database project (Node.js + MySQL + React).

1) Clone the Repository
git clone https://git.indstate.edu/ect-437-fall-2025/<your-repo-name>.git
cd <your-repo-name>

2) Install Backend Dependencies (Node.js / Express)
cd server
npm install


Make sure you have Node.js 18+ installed.

3) Configure the MySQL Database
A) Create the Database

Open MySQL Workbench or CLI:

CREATE DATABASE movie_db;

B) Create a .env File

Inside the server folder:

DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=movie_db
DB_PORT=3306

C) Import Any Provided SQL File
mysql -u root -p movie_db < movie_data.sql

4) Start the Backend Server
npm start


If successful:

Server running on http://localhost:3000
Connected to MySQL

5) Install Frontend Dependencies

Open a new terminal window:

cd client
npm install

6) Start the React Frontend
npm start

7) Troubleshooting

rm -rf node_modules
npm install

