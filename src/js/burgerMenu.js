const toogleBurger = () => {
  toggleButton.addEventListener("click", function () {
    menu.classList.toggle("toggle");
    menuList.classList.toggle("toggle");
    window.addEventListener("click", (e) => {
      if (menuList.classList.contains("toggle")) {
        if (
          !menu.contains(e.target) ||
          e.target.classList.contains("list-link--menu")
        ) {
          menuList.classList.remove("toggle");
          menu.classList.remove("toggle");
        }
      }
    });
  });
};

toogleBurger();
