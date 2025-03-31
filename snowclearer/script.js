
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        question.classList.toggle('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

gsap.registerPlugin(ScrollTrigger);

gsap.from('.benefit-item', {
    scrollTrigger: {
        trigger: '.benefits',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1
});

gsap.from('.product-card', {
    scrollTrigger: {
        trigger: '.products',
        start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1
});

function initializeSliders() {
    document.querySelectorAll('.product-slider').forEach(slider => {
        const dots = slider.nextElementSibling.children;
        const images = [...slider.children];
        let currentIndex = 0;

        const hammer = new Hammer(slider);

        function showSlide(index) {
            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;

            currentIndex = index;

            images.forEach(img => img.classList.remove('active'));
            images[currentIndex].classList.add('active');

            [...dots].forEach(d => d.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        hammer.on('swipeleft swiperight', function (e) {
            if (e.type === 'swipeleft') {
                showSlide(currentIndex + 1);
            } else {
                showSlide(currentIndex - 1);
            }
        });

        [...dots].forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeSliders);

document.querySelectorAll('img').forEach(img => {
    img.onerror = function () {
        this.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
    };
});
