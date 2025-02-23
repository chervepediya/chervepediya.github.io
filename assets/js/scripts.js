AOS.init({
    duration: 800,
    once: true
});

const scrollTopBtn = document.getElementById('scroll-top');
const scrollBottomBtn = document.getElementById('scroll-bottom');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const images = document.querySelectorAll('.post img');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

// Анимация кнопок прокрутки
gsap.from(".scroll-btn", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out",
    delay: 1
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollBottomBtn.addEventListener('click', () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// Плавная прокрутка для якорей
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                mobileMenu.classList.remove('active'); // Закрываем меню на мобильных
            }
        }
    });
});

// Модальное окно
images.forEach(img => {
    img.addEventListener('click', () => {
        modalImage.src = img.src;
        imageModal.style.display = 'flex';
        modalImage.classList.add('animate__animated', 'animate__zoomIn');
    });
});

imageModal.addEventListener('click', () => {
    modalImage.classList.remove('animate__zoomIn');
    modalImage.classList.add('animate__zoomOut');
    setTimeout(() => {
        imageModal.style.display = 'none';
        modalImage.classList.remove('animate__zoomOut');
    }, 300);
});

// Подчёркивание постов и "Обо мне"
document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const img = post.querySelector('.post-image img');
        const text = post.querySelector('p');
        let underlineWidth;

        if (img && text) {
            underlineWidth = Math.max(img.offsetWidth, text.offsetWidth);
        } else if (img) {
            underlineWidth = img.offsetWidth;
        } else if (text) {
            underlineWidth = text.offsetWidth;
        }

        if (underlineWidth) {
            post.style.setProperty('--underline-width', `${underlineWidth}px`);
        }
    });

    const about = document.querySelector('.about');
    const aboutText = about.querySelector('p');
    if (aboutText) {
        const textWidth = aboutText.offsetWidth;
        about.style.setProperty('--underline-width', `${textWidth}px`);
    }

    // Инициализация Masonry для всех .image-grid
    const grids = document.querySelectorAll('.image-grid');
    grids.forEach(grid => {
        const msnry = new Masonry(grid, {
            itemSelector: '.image-item',
            columnWidth: '.grid-sizer',
            gutter: 10
        });
        imagesLoaded(grid, () => {
            msnry.layout();
        });
    });
});

// Управление выдвижным меню
menuToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        gsap.to(".mobile-menu", { x: "-100%", duration: 0.3, ease: "power2.in" });
        mobileMenu.classList.remove('active');
    } else {
        mobileMenu.classList.add('active');
        gsap.fromTo(".mobile-menu", { x: "-100%" }, { x: 0, duration: 0.3, ease: "power2.out" });
    }
});