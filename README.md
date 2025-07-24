# Test Movies App

This is a Single Page Application (SPA) for managing a movie collection.  
Built using **React + Vite**, with **CSS/SCSS**, and **JavaScript**.  
The backend API is provided via a prebuilt Docker image: [`webbylabhub/movies`](https://hub.docker.com/r/webbylabhub/movies).

---

## Tech Stack

- React (with Vite)
- Redux Toolkit
- JavaScript
- CSS / SCSS
- Docker (for backend and production deployment)

---

## Getting Started (Local Development)

### 1. Clone the repository

git clone https://github.com/nazar-petrenko/test_movies.git

### 2. Install dependencies
bash
npm install

### 3. Create .env file
Create a .env file in the root of the project with the following content:

VITE_API_URL=http://localhost:8000/api/v1
VITE_USER_EMAIL=test@example.com
VITE_USER_PASSWORD=123456

Replace values if needed.

### Running the Backend API via Docker
You can run the backend API with this command:

docker run --name movies-api -p 8000:8000 webbylabhub/movies
The API will be available at: http://localhost:8000/api/v1

Running the Frontend (Development Mode)

npm run dev
Then open your browser at http://localhost:5173

If the port is different, Vite will show it in the terminal.

Environment Variables
Variable	Description
VITE_API_URL	URL to the backend API (/api/v1)
VITE_USER_EMAIL	Email used for login
VITE_USER_PASSWORD	Password used for login

---

### Features

**Add, delete, search, and sort movies**
**View movie details**
**Import movies from .txt file**
**Authenticated requests via API token**
**Mobile-friendly layout**

---

## To Be Added

**Dockerfile for frontend**
**Docker deployment instructions**
**Production build setup**
**API token auto-generation or login on start**

---

