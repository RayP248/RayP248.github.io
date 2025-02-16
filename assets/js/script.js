document.addEventListener("DOMContentLoaded", initSmoothScroll);

function initSmoothScroll() {
  document.querySelectorAll("a.nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
