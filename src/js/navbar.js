// navbar.js

(function() {
  const navbarParent = document.getElementById("js-navbar").parentElement;
  //   const navbarParent = document.body;
  const button = document.getElementById("js-toggle-btn");
  const menu = document.getElementById("js-menu");
  const links = [...menu.querySelectorAll("a")];
  const controls = [button, menu];

  function toggleMenu(evt) {
    const TOGGLE = "js-toggle-menu";
    let isToggle = navbarParent.classList.contains(TOGGLE);
    navbarParent.classList.toggle(TOGGLE, !isToggle);
    button.setAttribute("aria-expanded", !isToggle);
    button.setAttribute("aria-label", isToggle ? "Open Menu" : "Close Menu");
  }

  controls.forEach(el => el.addEventListener("click", toggleMenu));
})();
