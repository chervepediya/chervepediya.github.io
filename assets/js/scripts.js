AOS.init({
    duration: 800,
    once: true
});

const scrollTopBtn = document.getElementById('scroll-top');
const scrollBottomBtn = document.getElementById('scroll-bottom');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const images = document.querySelectorAll('.post img');

// Анимация кнопок
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
});

// Функция для встраивания Telegram-постов
function embedTelegramPosts() {
    const postParagraphs = document.querySelectorAll('.post p');
    postParagraphs.forEach(paragraph => {
        const links = paragraph.getElementsByTagName('a');
        for (let i = links.length - 1; i >= 0; i--) {  // Обратный цикл, чтобы не ломать DOM
            const href = links[i].getAttribute('href');
            const telegramRegex = /^https:\/\/t\.me\/([a-zA-Z0-9_]+)\/(\d+)$/;
            const match = href && href.match(telegramRegex);
            if (match) {
                console.log('Found Telegram link:', href);  // Для отладки
                const channel = match[1];
                const postId = match[2];
                const widget = document.createElement('div');
                widget.innerHTML = `<script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post="${channel}/${postId}" data-width="100%"></script>`;
                links[i].parentNode.replaceChild(widget, links[i]);
            }
        }
    });
}

// Выполняем встраивание после полной загрузки страницы
window.addEventListener('load', () => {
    embedTelegramPosts();
});