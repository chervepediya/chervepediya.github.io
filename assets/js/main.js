document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');

    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.classList.add('theme-transition');
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);

            setTimeout(function() {
                document.documentElement.classList.remove('theme-transition');
            }, 50);
        });
    }

    // Scroll to top button
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    if (scrollToTopButton) {
        // Hide button initially
        scrollToTopButton.style.display = 'none';

        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const offsetToShowButton = 100;

            if (scrollPosition > offsetToShowButton) {
                scrollToTopButton.style.display = 'block';
            } else {
                scrollToTopButton.style.display = 'none';
            }
        });

        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Search functionality
    const searchForm = document.querySelector('form.search');
    const searchInput = document.querySelector('form.search input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();

            if (query) {
                window.location.href = '/search?q=' + encodeURIComponent(query);
            }
        });
    }

    // Set current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav.menu ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (currentPath === linkPath ||
            (linkPath !== '/' && currentPath.startsWith(linkPath)) ||
            (currentPath === '/' && linkPath === '/')) {
            link.classList.add('current-page');
        }
    });
});
