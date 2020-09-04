"use-strict";

(() => {
  // variables
  const menuToggle = document.getElementById("menu-toggle");
  const rightNav = document.getElementById("right-nav");

  // toggleMenu() - toggles the attributes of rightNav to either match menuToggle or to revert back to it's default, dependent on current state.
  const toggleMenu = () => {
    rightNav.classList.toggle("menu-toggle");
  }

  // Event Listeners
  menuToggle.addEventListener("click", toggleMenu);
})()
