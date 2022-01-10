"use strict";
//fix hero bulb press scroll

const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const features = document.getElementById("features");
const headerHeight = header.getBoundingClientRect().height;
const lazyImages = document.querySelectorAll("[data-src]");
const sections = document.querySelectorAll("section");

const smoothScrool = function () {
  header.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("list-link--menu")) {
      e.preventDefault();
      const id = document.querySelector(`${e.target.getAttribute("href")}`);
      id.scrollIntoView({
        behaviour: "smooth",
      });
      window.scroll(
        0,
        id.getBoundingClientRect().top - headerHeight + window.scrollY
      );
    }
  });
};

const stickyNav = function () {
  const createStickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      header.classList.add("header__sticky");
    } else {
      header.classList.remove("header__sticky");
    }
  };
  const headerObserver = new IntersectionObserver(createStickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight * 3.5}px`,
  });
  headerObserver.observe(hero);
};

const lazyLoad = function () {
  const createLazyLoading = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  };
  const lazyObserver = new IntersectionObserver(createLazyLoading, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
  });
  lazyImages.forEach((img) => lazyObserver.observe(img));
};

const slider = function () {
  const teamSlider = document.querySelector(".team__slider");
  const teamMainImages = document.querySelectorAll(".team__slider-img");
  const teamMiniImages = document.querySelectorAll(".team__slider-miniimage");
  const sliderLeftBtn = teamSlider.querySelector(".team__slider-btn-left");
  const sliderRightBtn = teamSlider.querySelector(".team__slider-btn-right");

  const maxSlides = teamMainImages.length;
  let currentImage = 0;
  let firstTime = true;

  const translateImage = function (nextOrPrev) {
    if (nextOrPrev === "next") {
      currentImage++;
    } else if (nextOrPrev === "prev") {
      currentImage--;
    }
    teamMainImages.forEach((img, i) => {
      img.style.transform = `translateX(${100 * (i - currentImage)}%)`;
    });
  };

  const defaultPosition = function () {
    if (firstTime) {
      translateImage();
      firstTime = false;
    }
  };

  const checkNextImage = function (nextOrPrev, index) {
    console.log(currentImage);
    if (nextOrPrev === "next" && currentImage === maxSlides - 1) {
      currentImage = -1;
    }
    if (nextOrPrev === "prev" && currentImage === 0) {
      currentImage = maxSlides;
    }
  };

  const rotateImages = function (e) {
    let index = this;
    if (
      e.target.classList.contains("team__slider-img") ||
      e.target.classList.contains("team__slider-btn-right")
    ) {
      checkNextImage("next");
      translateImage("next");
    }
    if (e.target.classList.contains("team__slider-btn-left")) {
      checkNextImage("prev");
      translateImage("prev");
    }
  };

  defaultPosition();

  sliderLeftBtn.addEventListener("click", rotateImages);
  sliderRightBtn.addEventListener("click", rotateImages);
  teamMiniImages.forEach((image, i) =>
    image.addEventListener("click", rotateImages)
  );
  teamMainImages.forEach((image, i) =>
    image.addEventListener("click", rotateImages.bind(i))
  );
};

const init = function () {
  smoothScrool();
  stickyNav();
  lazyLoad();
  slider();
};
init();
