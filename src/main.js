import { API_KEY } from "./secrets.js";
const trendingMovies_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY;
const moviesGenre_URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY;

async function getTrendingMoviesPreview() {
    try {
        const res = await fetch(trendingMovies_URL);
        
        if (res.status === 200) {
            const data = await res.json();
            const movies = data.results;

            console.log({data, movies});
            createTrendingMoviesPreview(movies)
        } else {
            console.error('error');
        }

    } catch (error) {
        console.error(error);
    }
}

function createTrendingMoviesPreview(movies) {
    movies.forEach(movie => {
        const TrendingMoviesPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

        const movieContainer = document.createElement('article');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');

        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('title', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);
        
        movieContainer.appendChild(movieImg);
        TrendingMoviesPreviewContainer.appendChild(movieContainer);
    });
}

async function getMoviesGenrePreview() {
    try {
        const res = await fetch(moviesGenre_URL);
        
        if (res.status === 200) {
            const data = await res.json();
            const movies = data.results;

            console.log({data, movies});
            createMoviesGenrePreview(movies)
        } else {
            console.error('error');
        }

    } catch (error) {
        console.error(error);
    }
}

function createMoviesGenrePreview(movies) {
    movies.forEach(movie => {
        const TrendingMoviesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

        const movieContainer = document.createElement('article');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');

        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('title', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);
        
        movieContainer.appendChild(movieImg);
        TrendingMoviesPreviewContainer.appendChild(movieContainer);
    });
}

getTrendingMoviesPreview();
getMoviesGenrePreview();