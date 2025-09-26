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

// Downloads Chart
const downloadsChartCanvas = document.getElementById('downloads-chart');
if (downloadsChartCanvas) {
    const ctx = downloadsChartCanvas.getContext('2d');
    const downloadsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
            datasets: [{
                label: 'Downloads',
                data: [30, 45, 20, 60, 35],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
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

// Logout functionality
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Clear any session/local storage items related to authentication
        localStorage.removeItem('theme'); // Example: clear theme preference on logout
        sessionStorage.removeItem('isAdmin'); // Clear the admin flag if it was used

        // Redirect to the home page or login page
        window.location.href = '/'; // Redirect to the root of the website
    });
}