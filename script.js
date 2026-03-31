document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Check for saved theme preference or default to system preference
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "light") {
        document.documentElement.setAttribute("data-theme", "light");
    } else if (currentTheme == "dark") {
        // Dark is default, no attribute needed
    } else if (!prefersDarkScheme.matches) {
        document.documentElement.setAttribute("data-theme", "light");
    }

    // Toggle theme on click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            let theme = "dark";
            if (document.documentElement.getAttribute("data-theme") == "light") {
                document.documentElement.removeAttribute("data-theme");
            } else {
                document.documentElement.setAttribute("data-theme", "light");
                theme = "light";
            }
            localStorage.setItem("theme", theme);
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (basic implementation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            // Note: Full mobile menu requires a bit more CSS for the dropdown state,
            // this is a placeholder that you can expand.
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(15, 15, 26, 0.95)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
        });
    }

    // Dynamic mouse glow effect (Optional extra polish)
    const glowBox = document.querySelector('.glow-box');
    if (glowBox) {
        glowBox.addEventListener('mousemove', (e) => {
            const rect = glowBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            const xRotate = ((y / rect.height) - 0.5) * -20;
            const yRotate = ((x / rect.width) - 0.5) * 20;

            glowBox.style.transform = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
        });

        glowBox.addEventListener('mouseleave', () => {
            glowBox.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }
});
