document.addEventListener('DOMContentLoaded', () => {
    const movieDetails = JSON.parse(localStorage.getItem('movieDetails'));

    if (movieDetails) {
        document.getElementById('movie-title').textContent = movieDetails.title;
        document.getElementById('movie-poster').src = movieDetails.poster;
        document.getElementById('movie-description').textContent = movieDetails.description;
    } else {
        document.getElementById('movie-title').textContent = 'No movie selected';
        document.getElementById('movie-description').textContent = '';
    }
});
