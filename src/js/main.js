// Header: transparant bovenaan, donker na scrollen, verbergt bij naar beneden scrollen
(() => {
  const header = document.getElementById('siteHeader');
  if (header) {
    const topThreshold = 40;
    const directionThreshold = 4;
    let lastY = Math.max(window.scrollY || 0, 0);
    let ticking = false;

    const update = () => {
      const y = Math.max(window.scrollY || 0, 0);
      const delta = y - lastY;
      if (y <= topThreshold) {
        header.classList.remove('is-scrolled', 'is-hidden');
      } else {
        header.classList.add('is-scrolled');
        if (delta > directionThreshold) header.classList.add('is-hidden');
        else if (delta < -directionThreshold) header.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  // Jaartal in de footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
