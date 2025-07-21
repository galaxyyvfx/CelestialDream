const imgs = document.querySelectorAll(".carousel img");
let current = 0;

function updateCarousel() {
  imgs.forEach((img, i) => {
    img.classList.remove("active", "prev", "next");
  });

  imgs[current].classList.add("active");

  const prevIndex = (current - 1 + imgs.length) % imgs.length;
  const nextIndex = (current + 1) % imgs.length;

  imgs[prevIndex].classList.add("prev");
  imgs[nextIndex].classList.add("next");
}

// move to next image
function nextImage() {
  current = (current + 1) % imgs.length;
  updateCarousel();
}

// initial state
updateCarousel();

// autoplay
setInterval(nextImage, 3000);
