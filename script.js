document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Scroll Reveal Animation
    const sections = document.querySelectorAll('section, .projects-page');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.05,
    });

    sections.forEach(section => {
        section.classList.add('hidden');
        sectionObserver.observe(section);
    });

    // Animate project cards on projects page
    const cards = document.querySelectorAll('.project-card');
    if (cards.length) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 60);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.classList.add('hidden');
            cardObserver.observe(card);
        });
    }

    // Contact Modal Logic
    const contactBtn = document.getElementById('contactBtn');
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close-btn');

    if (contactBtn && modal && closeBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            // Small delay to allow display:flex to apply before adding show class for transition
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Match transition duration
        };

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Initialize VanillaTilt for 3D effects
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .cert-card"), {
            max: 12,
            speed: 500,
            glare: true,
            "max-glare": 0.2,
            scale: 1.05
        });
    }
});
