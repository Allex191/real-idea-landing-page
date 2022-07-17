const toggleButton = document.querySelector(".toggle-menu");
const menu = document.querySelector(".menu");
const menuList = document.querySelector(".menu__list");
const header = document.querySelector(".header");

export const toogleBurger = () => {
  toggleButton.addEventListener("click", function () {
    menu.classList.toggle("toggle");
    menuList.classList.toggle("toggle");
    header.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("list-link--menu") &&
        menuList.classList.contains("toggle")
      ) {
        menuList.classList.remove("toggle");
        menu.classList.remove("toggle");
      }
    });
  });
};
