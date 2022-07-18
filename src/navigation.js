window.addEventListener('DOMContentLoaded', navigator, false);//carga el contenido de la página
window.addEventListener('hashchange', navigator, false);//escucha la petición

function navigator() {
    console.log({location});
    
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        detailsPage()
    }else if(location.hash.startsWith('#categories')){
        categoriesPage();
    }else{
        homePage();
    }
}

function refresh() {
    location.reload();
}

function homePage() {
    console.log('Home');
    getTrendingMoviesPreview();
    getMoviesGenrePreview();
}

function trendsPage() {
    console.log('trends');
    
}

function detailsPage() {
    console.log('detallitos');
}

function searchPage() {
    console.log('busqueda');
}

function categoriesPage() {
    console.log('categorias');
}
