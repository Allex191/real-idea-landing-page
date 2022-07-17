"use strict";
import { toogleBurger } from "./burgerMenu.js";

const header = document.querySelector(".header");
const headerHeight = header.getBoundingClientRect().height;
const hero = document.querySelector(".hero");
const heroHeight = hero.getBoundingClientRect().height;
const features = document.getElementById("features");
const lazyImages = document.querySelectorAll("[data-src]");
const sections = document.querySelectorAll("section");
const bulb = document.querySelector(".hero__bulb-svg");

const smoothScroolBulb = () => {
  bulb.addEventListener("click", (e) => {
    e.preventDefault;

    const featuresCoords = features.getBoundingClientRect();
    console.log(featuresCoords);
    window.scrollTo({
      top: featuresCoords.top - headerHeight + window.scrollY,
      behavior: "smooth",
    });
  });
};

const smoothScroolNavLinks = function () {
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
  const teamMiniImages = document.querySelectorAll(".team__slider-miniimg");
  const sliderLeftBtn = teamSlider.querySelector(".team__slider-btn-left");
  const sliderRightBtn = teamSlider.querySelector(".team__slider-btn-right");

  const maxSlides = teamMainImages.length - 1;
  let currentImage = 0;

  const translateImages = function (nextOrPrev) {
    if (nextOrPrev === "next") {
      currentImage++;
    } else if (nextOrPrev === "prev") {
      currentImage--;
    }
    teamMainImages.forEach((img, i) => {
      img.style.transform = `translateX(${100 * (i - currentImage)}%)`;
    });
  };

  const checkNextImage = function (nextOrPrev, index) {
    // if (nextOrPrev === "next" && currentImage === maxSlides - 1) {
    //   currentImage = -1;
    // }
    if (nextOrPrev === "next" && currentImage === maxSlides) {
      currentImage = 0;
      currentImage--;
    }
    if (nextOrPrev === "prev" && currentImage === 0) {
      currentImage = maxSlides;
      currentImage++;
    }
  };

  const setDefaultPosition = function () {
    translateImages();
    // if(teamMiniImages.classList.contains("team__slider-miniimg--hidden"))
  };
  setDefaultPosition();

  const clickMainImgOrBtns = function (e) {
    if (
      e.target.classList.contains("team__slider-img") ||
      e.target.classList.contains("team__slider-btn-right")
    ) {
      checkNextImage("next");
      translateImages("next");
    }
    if (e.target.classList.contains("team__slider-btn-left")) {
      checkNextImage("prev");
      translateImages("prev");
    }
  };

  const clickMiniImages = function () {
    if (e.target.classList.contains("team__slider-miniimage")) {
    }
  };

  const rotateImages = function (e) {
    let index = this;
    clickMainImgOrBtns(e);
    // clickMiniImages();
  };

  sliderLeftBtn.addEventListener("click", rotateImages);
  sliderRightBtn.addEventListener("click", rotateImages);
  teamMiniImages.forEach((image) =>
    image.addEventListener("click", rotateImages)
  );
  teamMainImages.forEach((image) =>
    image.addEventListener("click", rotateImages)
  );
};

const init = function () {
  smoothScroolBulb();
  // smoothScroolNavLinks();
  stickyNav();
  lazyLoad();
  slider();
  toogleBurger();
};
init();
