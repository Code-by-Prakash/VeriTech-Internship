document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.content-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const title = item.querySelector('p').textContent;
            const poster = item.querySelector('img').src;
            const description = 'This is a placeholder description for the movie.'; // Add more dynamic description as needed

            const movieDetails = { id, title, poster, description };
            localStorage.setItem('movieDetails', JSON.stringify(movieDetails));

            window.location.href = 'details.html';
        });
    });

    document.getElementById('search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('.content-item').forEach(item => {
            const title = item.querySelector('p').innerText.toLowerCase();
            item.style.display = title.includes(query) ? 'block' : 'none';
        });
    });
});
