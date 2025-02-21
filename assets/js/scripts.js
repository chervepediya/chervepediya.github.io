AOS.init({
    duration: 800,
    once: true
});

const scrollTopBtn = document.getElementById('scroll-top');
const scrollBottomBtn = document.getElementById('scroll-bottom');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const images = document.querySelectorAll('.post img');

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
});
