// Make the slide index to 0
let currentSlide = 0;

// Select all elements with the class 'slider-img' and store them in the slides array
const slides = document.querySelectorAll('.slider-img');

// Function to display the slide at the specified index
function showSlide(index) {
    // If the index is less than 0, set the currentSlide to the last slide index
    if (index < 0) {
        currentSlide = slides.length - 1;
    } 
    // If the index is greater than or equal to the number of slides, set the currentSlide to the first slide index
    else if (index >= slides.length) {
        currentSlide = 0;
    } 
    //If not, set the currentSlide to the specified index
    else {
        currentSlide = index;
    }

    // Loop through each slide
    slides.forEach((slide, i) => {
        // If the index matches the currentSlide, display the slide
        if (i === currentSlide) {
            slide.style.display = 'block';
        } 
        // Otherwise, hide the slide
        else {
            slide.style.display = 'none';
        }
    });
}

// Function to change the slide by a specified amount
function changeSlide(n) {
    
    showSlide(currentSlide + n);
}

// Show the initial slide
showSlide(currentSlide);






