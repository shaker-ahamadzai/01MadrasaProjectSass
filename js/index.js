try {
  var map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map).bindPopup("Our location.").openPopup();
} catch (error) {
  console.log(error.message);
}

const header = document.querySelector(".header");
const scrollBtn = document.querySelector(".btn-scroll-top");

const slides = document.querySelectorAll(".slide");
const leftBtn = document.querySelector(".btn-left");
const rightBtn = document.querySelector(".btn-right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;

// setInterval(function () {
//   curSlide++;
//   console.log("hello world");
// }, 2000);

const gotToSlide = function (sNum) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - sNum) * 110}%)`;
  });
};

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="dot" data-slide="${i}"></div>`
    );
  });
};

const activateDot = function (sNum) {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot--active"));

  document
    .querySelector(`.dot[data-slide="${sNum}"]`)
    .classList.add("dot--active");
};

gotToSlide(curSlide);
createDots();
activateDot(curSlide);

const nextSlide = () => {
  if (curSlide < slides.length - 1) {
    curSlide++;
  } else {
    curSlide = 0;
  }
  gotToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = () => {
  if (curSlide > 0) {
    curSlide--;
  } else {
    curSlide = slides.length - 1;
  }
  gotToSlide(curSlide);
  activateDot(curSlide);
};

// auto move slide
// setInterval(nextSlide, 10000);

rightBtn.addEventListener("click", nextSlide);
leftBtn.addEventListener("click", prevSlide);

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    // const slide = e.target.dataset.slide;
    // This is destructuring
    const { slide } = e.target.dataset;
    gotToSlide(slide);
    activateDot(slide);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });
};
const obsOps = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(obsCallback, obsOps);

observer.observe(header);
