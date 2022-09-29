/* const trendingMovies_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY; */
/* const moviesGenre_URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY + "&language=en-US"; */

/* Instanciando axios
    1.Se crea la URL base para el momento de invocarlo no se repita una y otra vez
    2.Se puede agregar params donde almacena el apikey para evitar la repetición
*/

/* AXIOS */
const API = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params:{
        'api_key': API_KEY,
    },
})

/* UTILS = FUNCIONES REUTILIZABLES PARA NO REPETIR CÓDIGO */

function createMovies(movies, container) {
    container.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement('article');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');

        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('title', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);
        
        movieContainer.addEventListener('click', () => {
            location.hash = "#movie=" + movie.id;
        })

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container) {
    container.innerHTML = "";

    categories.forEach(category => {
        const categoriesContainer = document.createElement('div');
        categoriesContainer.classList.add('genre-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('genre-title');
        
        categoryTitle.setAttribute('id', 'id' + category.id)
        categoryTitle.addEventListener('click', () => {
            location.hash = '#categories=' + category.id + "-" + category.name;
        });
        const categoryTitleText = document.createTextNode(category.name);
        
        categoryTitle.appendChild(categoryTitleText)
        categoriesContainer.appendChild(categoryTitle);
        container.appendChild(categoriesContainer);
    });
}

/*LLAMADAS A LA API(APPLICATION PROGRAMMING INTERFACE)*/

async function getTrendingMoviesPreview() {
    try {
        /* const res = await fetch(trendingMovies_URL); */
        const {data, status} = await API('trending/movie/day');
        
        if (status === 200) {
            /* const data = await res.json(); */
            const movies = data.results;
            console.log(data);
            console.log(movies);
            createMovies(movies, trendingMoviesPreviewList);
        } else {
            console.error('error');
        }

    } catch (error) {
        console.error(error);
    }
}

async function getMoviesGenrePreview() {
    try {
        const {data, status} = await API('genre/movie/list');
        
        if (status === 200) {
            const categories = data.genres;
            createCategories(categories, categoriesPreviewList)
        } else {
            console.error('error');
        }
    } catch (error) {
        console.error(error);
    }
}


async function getMoviesByCategory(id) {
    const { data } = await API('discover/movie', {
      params: {
        with_genres: id,
      },
    });

    const movies = data.results;
    createMovies(movies, genericSection)
}

async function getMoviesBySearch(query) {
    const {data} = await API('search/movie', {
        params: {
            query,
        }
    })

    const movies = data.results;
    createMovies(movies, genericSection);
}

async function getTrendingMovies() {
    const { data } = await API('trending/movie/day');
    const movies = data.results;
    
    createMovies(movies, genericSection);
}

async function getMovieById(id) {
    const { data: movie } = await API('movie/' + id);

    const movieImg = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    headerSection.style.background = `
        linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImg})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContet = movie.vote_average;
    
    createCategories(movie.genres, movieDetailCategoriesList);
    getSimilarMoviesById(id)
}

async function getSimilarMoviesById(id) {
    const { data } = await API(`movie/${id}/similar`);
    const movie = data.results;
    
    createMovies(movie, relatedMoviesContainer);
}