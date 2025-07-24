# 🎬 Movies App (React + Vite + Docker)

A single-page application (SPA) built with **React**, **Vite**, **SCSS**, and **Redux Toolkit** for managing a movie collection.  
This app is designed to work with the official WebbyLab backend API image:  
👉 [`webbylabhub/movies`](https://hub.docker.com/r/webbylabhub/movies)

## 🚀 Features

- View movies
- Add / delete / search movies
- Sort movies by title
- Search by actor
- Import from `.txt` file via upload
- Auth/login automatically via ENV credentials
- Dynamic runtime config via `env-config.js`


## 🐳 Run with Docker (recommended)

Run the app in **a single line**, with API and user credentials passed via environment variables:

```bash
docker run --name movies-app -p 3000:3000 \
  -e API_URL="http://host.docker.internal:8000/api/v1" \
  -e USER_EMAIL="your_email@example.com" \
  -e USER_PASSWORD="your_secure_password" \
  your-super-account/movies
```

🔐 If the user doesn’t exist, it will be registered automatically.
The generated token will be injected into window.AUTH_TOKEN.

## 🌍 Access

After startup, open your browser at:

http://localhost:3000

## ⚙️ Configuration

All configuration is handled via environment variables:
Variable	Description
API_URL	Backend API base URL (e.g. http://host.docker.internal:8000/api/v1)
USER_EMAIL	Email used to login/register user
USER_PASSWORD	Password for the user

## 🧱 Tech Stack
  *React + Vite* 
  *Redux Toolkit*
  *SCSS for styling*
  *Axios for HTTP*
  *Node.js + Nginx in Docker*
  *Runtime config via env-config.js*

## 🔧 Architecture Overview

    The app is built using Vite (npm run build)

    The Docker image includes:
        React static files
        Node.js runtime for token generation (generateToken.js)
        Nginx web server

    During container startup:
        Auth token is requested via generateToken.js
        env-config.js is generated dynamically with:
            window.API_URL
            window.AUTH_TOKEN
        This config file is injected into index.html

## 🔁 Preventing Caching

To avoid stale API_URL values in browsers, nginx.conf disables caching for env-config.js:

```
location = /env-config.js {
  add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
}
```

This ensures changes to environment variables are always reflected.

## 🧪 Manual build & run (optional)

If you want to build the image manually:

### 1. Build the image
docker build -t your_super_account/movies .

### 2. Run
```
docker run --rm -p 3000:3000 \
  -e API_URL=http://host.docker.internal:8000/api/v1 \
  -e USER_EMAIL=... \
  -e USER_PASSWORD=... \
  your_super_account/movies
```

## 📁 Project Structure
```
.
├── Dockerfile                        # Docker build instructions
├── entrypoint.sh                     # Startup script: generates token + env-config.js
├── nginx.conf                        # Nginx config for SPA routing and caching
├── generateToken.js                  # Generates user token or registers new user
├── src/
│   ├── config.js                     # Reads window.API_URL & window.AUTH_TOKEN
│   ├── app/
│   │   └── store.js                  # Redux store configuration
│   ├── main.jsx                      # React root mount point
│   ├── App.jsx                       # Root app component
│   ├── App.css                       
│   ├── styles.scss                   # Global SCSS styles
│   ├── assets/                       # Static assets
│   ├── components/
│   │   ├── FileUploader.jsx          # UI for uploading .txt movie files
│   │   ├── MovieEditWrapper.jsx      # Edit logic and route handling
│   │   ├── MovieForm.jsx             # Reusable form for adding/editing movies
│   │   └── UniversalModal.jsx        # Generic modal component
│   ├── pages/
│   │   ├── AddMoviePage.jsx          # Form page to add a new movie
│   │   ├── MovieDetails.jsx          # Single movie detail view
│   │   ├── MovieEdit.jsx             # Movie editing page
│   │   └── MovieList.jsx             # Main list of movies
│   ├── utils/
│   │   └── validateMovie.js          # Input validation logic
│   ├── services/
│   │   └── api.js                    # Axios instance + API helpers
│   ├── features/
│   │   ├── modal/
│   │   │   └── modalSlice.js         # Redux modal slice
│   │   └── movies/
│   │       └── moviesSlice.js       # Redux movies slice
└── index.html                        # Injected with <script src="/env-config.js">
```

## 📄 API Documentation
    Backend image: webbylabhub/movies
    API docs: https://documenter.getpostman.com/view/356840/TzkyLeVK

## ✅ Task Requirements Coverage
```
  React SPA
  Redux Toolkit
  SCSS styling
  Works with official backend image
  API URL configurable via ENV
  DockerHub-published image
  One-liner Docker run
  README with setup instructions
```