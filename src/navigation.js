searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value.trim()
})

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
})

arrowBtn.addEventListener('click', () => {
    /* REGRESAR A LA HISTORIA ANTERIOR */
    /* location.hash = window.history.back(); */
    /* history.back() */
    /* POR SI EL USUARIO INGRESA DESDE UNA URL QUE NO SEA HOME Y QUIERE TIRAR PARA ATRÁS SERÁ ENVIADO AL HOME DE LA PÁGINA Y NO A LA PÁGINA ANTERIOR QUE ESTABA*/
    if (window.domain !== 'localhost') {
        location.hash = '#home';
    } else {
        history.back()
    }
})

window.addEventListener('DOMContentLoaded', navigator, false);//carga el contenido de la página
window.addEventListener('hashchange', navigator, false);//escucha la petición

function navigator() {
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        detailsPage()
    } else if (location.hash.startsWith('#categories=')) {
        categoriesPage();
    } else {
        homePage();
    }

    /* Para cargar una página desde su inicio cada vez que cambia el hash */
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 

}

function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getMoviesGenrePreview();
}

function trendsPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();

}

function detailsPage() {
    headerSection.classList.add('header-container--long');
    /* headerSection.style.background = ''; */
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split("=");
    getMovieById(movieId)
}

function searchPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // [#search, platzi]
    const [_, query] = location.hash.split('=');
    headerCategoryTitle.innerHTML = 'Has buscado: ' + query;
    getMoviesBySearch(query);
}

function categoriesPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    /* ['#category', 'id-name'] */
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    const categoryNameReplace = categoryName.replace('%20', ' ');
    headerCategoryTitle.innerHTML = categoryNameReplace;

    getMoviesByCategory(categoryId);
}
