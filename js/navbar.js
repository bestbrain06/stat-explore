// ==========================================
// MOBILE NAVIGATION FUNCTIONALITY
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-links a");

// Check if navbar exists on the page

if (menuToggle && navMenu) {
  // Open and close mobile menu

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu after selecting a link

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside

  document.addEventListener("click", (event) => {
    const clickedInsideNavbar = event.target.closest(".navbar");

    if (!clickedInsideNavbar) {
      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when window becomes desktop size

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}
