const slider = document.getElementById('slider-container');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

document.getElementById('prev').addEventListener('click', () => {
  // Navigate to the previous slide
  currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
  updateSlider();
});

document.getElementById('next').addEventListener('click', () => {
  // Navigate to the next slide
  currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
  updateSlider();
});

function updateSlider() {
  // Slide the container to show the current slide
  slider.style.transform = `translateX(-${currentIndex * 25}%)`;
}
