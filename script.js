document.addEventListener('DOMContentLoaded', () => {
    // Function to load CSS files dynamically
    function loadCSS(filename) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = filename;
        document.head.appendChild(link);
    }

    // Load component CSS files
    loadCSS('components/header.css');
    loadCSS('components/footer.css');

    // Fetch and insert header
    fetch('components/header.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('.navbar').innerHTML = html;
            // Re-initialize any JS that depends on the header content, e.g., mobile menu toggle, theme toggle
            initializeHeaderJS();
        });

    // Fetch and insert footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('footer').innerHTML = html;
        });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.product, .about-container, .skills-grid, .contact-form');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Typing effect for creations page
    const codeBox = document.querySelector('.running-code-box');
    if (codeBox) {
        const codeLines = codeBox.querySelectorAll('span');
        let lineIndex = 0;

        function typeLine() {
            if (lineIndex < codeLines.length) {
                const line = codeLines[lineIndex];
                const text = line.textContent;
                line.textContent = '';
                line.style.display = 'block';
                let charIndex = 0;

                function typeChar() {
                    if (charIndex < text.length) {
                        line.textContent += text.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, 50); // Adjust typing speed here
                    } else {
                        lineIndex++;
                        setTimeout(typeLine, 200); // Adjust delay between lines here
                    }
                }
                typeChar();
            }
        }

        codeLines.forEach(line => line.style.display = 'none');
        typeLine();
    }

    // Placeholder products (for index and creations pages)
    if (document.getElementById('product-grid')) {
        const products = [
            { name: 'Placeholder Creation 1', image: 'images/placeholder.png', description: 'A custom-built solution designed with a personal touch to solve a unique challenge.' },
            { name: 'Placeholder Creation 2', image: 'images/placeholder.png', description: 'This project showcases my dedication to clean code and intuitive user experiences.' },
            // { name: 'Placeholder Creation 3', image: 'images/placeholder.png', description: 'From initial idea to final deployment, this creation was a one-person passion project.' },
            // { name: 'Placeholder Creation 4', image: 'images/placeholder.png', description: 'Leveraging modern tech to build something unique, entirely from my own workshop.' },
            // { name: 'Placeholder Creation 5', image: 'images/placeholder.png', description: 'Another example of bespoke software development with a focus on quality.' },
            // { name: 'Placeholder Creation 6', image: 'images/placeholder.png', description: 'Built to scale and perform, this project was a rewarding challenge.' }
        ];

        const productGrid = document.getElementById('product-grid');
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;

            const productContent = document.createElement('div');
            productContent.className = 'product-content';

            const productName = document.createElement('h2');
            productName.textContent = product.name;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            productContent.appendChild(productName);
            productContent.appendChild(productDescription);
            productDiv.appendChild(productImage);
            productDiv.appendChild(productContent);

            productGrid.appendChild(productDiv);
            observer.observe(productDiv);
        });
    }

    // Handle Google Form submission for contact page
    const googleForm = document.getElementById('google-form');
    if (googleForm) {
        googleForm.addEventListener('submit', e => {
            e.preventDefault();
            const submitButton = googleForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const formActionURL = 'https://docs.google.com/forms/d/e/1FAIpQLSfhU3dmwbPer0St7M4B4X0hmrCBfQUINvY3dZd4AiTLRJjYXA/formResponse';
            const formData = new FormData(googleForm);

            fetch(formActionURL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors', // This is required to avoid CORS errors when submitting to Google Forms
            })
            .then(() => {
                // The button doesn't need to be re-enabled since the form is hidden on success.
                const successMessage = document.getElementById('form-success-message');
                googleForm.style.display = 'none'; // Hide the form
                if (successMessage) {
                    successMessage.style.display = 'block'; // Show the success message
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }
});

function initializeHeaderJS() {
    // Active page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav a:not(.btn)');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-theme') {
        body.classList.add('dark-theme');
    }

    if (themeToggle) { // Check if themeToggle exists after header is loaded
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            let theme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light';
            localStorage.setItem('theme', theme);
        });
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('navbar-nav');

    if (menuToggle && navList) { // Check if elements exist after header is loaded
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) { // Check if navbar exists
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}