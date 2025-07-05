const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let isAnimating = false;

// 1. Get original slides and add class
const originalSlides = Array.from(track.children);
originalSlides.forEach((slide) => slide.classList.add("slide"));

// 2. Clone last 2 and first 2 slides
const clonesBefore = originalSlides
  .slice(-2)
  .map((s) => {
    const clone = s.cloneNode(true);
    clone.classList.add("clone", "slide");
    return clone;
  })
  .reverse(); // reverse for correct order

const clonesAfter = originalSlides.slice(0, 2).map((s) => {
  const clone = s.cloneNode(true);
  clone.classList.add("clone", "slide");
  return clone;
});

// 3. Insert clones
clonesBefore.forEach((c) => track.insertBefore(c, track.firstChild));
clonesAfter.forEach((c) => track.appendChild(c));

// 4. Setup
let slides = Array.from(track.children);
let currentIndex = 2; // Start at first real slide
let slideWidth = slides[0].offsetWidth;

function getOffset() {
  return slideWidth * currentIndex;
}

function setPosition(noTransition = false) {
  slideWidth = slides[0].offsetWidth;
  track.style.transition = noTransition ? "none" : "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${getOffset()}px)`;
}

setPosition(true);
window.addEventListener("resize", () => setPosition(true));

// 5. Navigation
function goToSlide(index) {
  if (isAnimating) return;
  currentIndex = index;
  isAnimating = true;
  setPosition(false);
}

nextBtn.addEventListener("click", () => {
  goToSlide(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
  goToSlide(currentIndex - 1);
});

// 6. Looping behavior
track.addEventListener("transitionend", () => {
  const total = originalSlides.length;
  console.log(currentIndex);
  if (currentIndex >= total + 1) {
    currentIndex = 1;
    setPosition(true);
  } else if (currentIndex <= 1) {
    currentIndex = total + 1;
    setPosition(true);
  }

  isAnimating = false;
});
