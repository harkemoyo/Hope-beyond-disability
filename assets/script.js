// Sticky Navbar Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
        });
    });
}

// Video Player Overlay Play Trigger (Index page)
const videoBlock = document.getElementById('videoBlock');
if (videoBlock) {
    const videoThumbnail = videoBlock.querySelector('.video-thumbnail');
    const videoOverlay = videoBlock.querySelector('.video-overlay');
    const videoIframe = document.getElementById('videoIframe');

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
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });
}
