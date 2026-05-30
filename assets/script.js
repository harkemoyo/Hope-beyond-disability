// Sticky Navbar Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.navbar__toggle');
const navLinks = document.querySelector('.navbar__links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('navbar__links--active');
        mobileMenuBtn.classList.toggle('navbar__toggle--open');
    });

    // Handle Mobile Dropdown Toggle
    const dropdownToggles = document.querySelectorAll('.navbar__dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevent navigation on toggle
                const parentDropdown = toggle.closest('.navbar__dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.toggle('is-active');
                }
            }
        });
    });

    // Close mobile menu when a standard link or sub-dropdown item is clicked
    const links = document.querySelectorAll('.navbar__link:not(.navbar__dropdown-toggle), .navbar__dropdown-item');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('navbar__links--active');
            mobileMenuBtn.classList.remove('navbar__toggle--open');
        });
    });
}

// Video Player Overlay Play Trigger (Index page)
const videoBlock = document.querySelector('.video-block');
if (videoBlock) {
    const videoThumbnail = videoBlock.querySelector('.video-block__thumbnail');
    const videoOverlay = videoBlock.querySelector('.video-block__overlay');
    const videoIframe = videoBlock ? videoBlock.querySelector('.video-block__iframe') : null;

    if (videoThumbnail && videoOverlay && videoIframe) {
        videoBlock.addEventListener('click', () => {
            videoIframe.style.display = 'block';
            videoThumbnail.style.display = 'none';
            videoOverlay.style.display = 'none';
            // Setting src triggers autoplay
            const currentSrc = videoIframe.src;
            videoIframe.src = currentSrc;
        });
    }
}

// Pre-fill Subject field based on URL Search Parameters (Contact page)
document.addEventListener('DOMContentLoaded', () => {
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
        const urlParams = new URLSearchParams(window.location.search);
        const subjectParam = urlParams.get('subject');
        if (subjectParam) {
            for (let i = 0; i < subjectSelect.options.length; i++) {
                if (subjectSelect.options[i].value.toLowerCase() === subjectParam.toLowerCase()) {
                    subjectSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }
});

// FAQ Accordion Toggle JS (Contact page)
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('faq-item--active');
                    }
                });
                item.classList.toggle('faq-item--active');
            });
        }
    });
}
