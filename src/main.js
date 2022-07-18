/* const trendingMovies_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY; */
/* const moviesGenre_URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY + "&language=en-US"; */

/* Instanciando axios
    1.Se crea la URL base para el momento de invocarlo no se repita una y otra vez
    2.Se puede agregar params donde almacena el apikey para evitar la repetición
*/
const API = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params:{
        'api_key': API_KEY,
    },
})

async function getTrendingMoviesPreview() {
    try {
        /* const res = await fetch(trendingMovies_URL); */
        const {data, status} = await API('trending/movie/day');
        
        if (status === 200) {
            /* const data = await res.json(); */
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
        const {data, status} = await API('genre/movie/list');
        
        if (status === 200) {
            console.log(data);
            const categories = data.genres;

            console.log({data, categories});
            createMoviesGenrePreview(categories)
        } else {
            console.error('error');
        }

    } catch (error) {
        console.error(error);
    }
}

function createMoviesGenrePreview(categories) {
    categories.forEach(category => {
        const moviesGenrePreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('genre-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('genre-title');
        categoryTitle.setAttribute('id', 'id' + category.id)
        const categoryTitleText = document.createTextNode(category.name);
        
        categoriesContainer.appendChild(categoryTitleText);
        moviesGenrePreviewContainer.appendChild(categoriesContainer);
    });
}

