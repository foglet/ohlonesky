
document.addEventListener("DOMContentLoaded", () => {
  const textBlocks = document.querySelectorAll("[data-fade-scroll]");
  const bgFaders = document.querySelectorAll("[data-bg-fade]");

  // Text fade-out observer
  const textObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.intersectionRatio < 0.5) {
          el.classList.add("opacity-0", "-translate-y-6");
          el.classList.remove("opacity-100", "translate-y-0");
        } else {
          el.classList.remove("opacity-0", "-translate-y-6");
          el.classList.add("opacity-100", "translate-y-0");
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-25% 0px 0px 0px"
    }
  );

  textBlocks.forEach(el => textObserver.observe(el));

  // Background fade-in observer
  const bgObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("opacity-100");
          el.classList.remove("opacity-0");
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  bgFaders.forEach(el => bgObserver.observe(el));
});
