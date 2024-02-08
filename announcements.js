// index page announcements
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-img');

function showSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

showSlide(currentSlide);






