console.log("Dashboard script loaded");

// Theme switcher
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark-theme') {
    body.classList.add('dark-theme');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        let theme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Active page link
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.navbar-nav a:not(.btn)');
navLinks.forEach(link => {
    if (link.getAttribute('href').endsWith(currentPage)) {
        link.classList.add('active');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('navbar-nav');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Visits Chart
const visitsChartCanvas = document.getElementById('visits-chart');
if (visitsChartCanvas) {
    const ctx = visitsChartCanvas.getContext('2d');
    const visitsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Page Visits',
                data: [12, 19, 3, 5, 2, 3, 9],
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
