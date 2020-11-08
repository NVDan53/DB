# Homework - New tech week 6

## How to run

  1. First go to terminal and type `npm install`
  2. After install modules then type `npm start`
  
## Config .env file

  1. ```MONGODB_URI = mongodb://admin:bomb_code_7355608@ds042688.mlab.com:42688/new-tech```
  2. ```PORT = 3001```

## API

* Users
  1. Create
  **URL: POST `localhost:3000/register`
  **Body: `name, email, password`
  2. Authenticate
  **URL: POST `localhost:3000/authenticate`
  **Body: `email, password`
* Movies
  1. Create
  **URL: POST `localhost:3000/movies`
  **Header: `jwt`
  **Body: `name, released_on`
  2. Get movie list
  **URL: GET `localhost:3000/movies`
  **Header: `jwt`
  3. Get movie by id
  **URL: GET `localhost:3000/movies/*movie-id*`
  **Header: `jwt`
  4. Update movie by id
  **URL: PUT `localhost:3000/movies/*movie-id*`
  **Header: `jwt`
  **Body: `name, released_on`
  5. Update movie by id
  **URL: DELETE `localhost:3000/movies/*movie-id*`
  **Header: `jwt`
