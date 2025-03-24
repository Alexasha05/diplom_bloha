document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('main').forEach(main => main.style.display = 'none');
        document.getElementById(targetId).style.display = 'block';
    });
});