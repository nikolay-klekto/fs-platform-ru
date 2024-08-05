const dropdownMenu = document.querySelector(".nav__menu-dropdown__container");
dropdownMenu.addEventListener("click", toggleDropdownMenuOpen);

function toggleDropdownMenuOpen() {
  const menuDropdown = document.querySelector(".nav__menu");
  menuDropdown.classList.toggle("dropdown-menu_open");
  document.body.style.overflow =
    document.body.style.overflow === "hidden" ? "" : "hidden";
}

const navItems = document.querySelectorAll(".nav__menu-list__item");
navItems.forEach((navItem) =>
  navItem.addEventListener("click", disableDropdownMenuOpen)
);

function disableDropdownMenuOpen() {
  const menuDropdown = document.querySelector(".nav__menu");
  menuDropdown.classList.remove("dropdown-menu_open");
  document.body.style.overflow = "";
}
