// Shared behavior for every page on the site:
// mobile menu, footer year, and the contact-form "thank you" message.

document.addEventListener("DOMContentLoaded", function () {
  // ---------- Footer year (updates itself every January) ----------
  document.querySelectorAll(".current-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Mobile hamburger menu ----------
  var hamburger = document.querySelector(".hamburger");
  var menu = document.getElementById("popoutMenu");

  function setMenu(open) {
    if (!hamburger || !menu) return;
    hamburger.classList.toggle("open", open);
    menu.classList.toggle("show", open);
    hamburger.setAttribute("aria-expanded", String(open));
  }

  if (hamburger && menu) {
    hamburger.addEventListener("click", function (event) {
      event.stopPropagation();
      setMenu(!menu.classList.contains("show"));
    });
    // Tapping anywhere else (or on a menu link) closes the menu
    document.addEventListener("click", function (event) {
      if (!menu.classList.contains("show")) return;
      if (!menu.contains(event.target) || event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });
  }

  // ---------- Contact page: show "thank you" after the form is sent ----------
  var formSuccess = document.getElementById("formSuccess");
  if (formSuccess && new URLSearchParams(window.location.search).has("submitted")) {
    formSuccess.style.display = "block";
  }
});
