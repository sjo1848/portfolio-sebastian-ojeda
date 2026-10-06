const hero = document.querySelector<HTMLElement>('#hero');

if (hero) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const render = () => {
    frame = 0;
    const distance = Math.min(window.innerHeight * 0.3, 260);
    const progress = reducedMotion.matches ? 0 : Math.max(0, Math.min(1, window.scrollY / distance));
    hero.style.setProperty('--hero-wipe', `${(progress * 100).toFixed(2)}%`);
    hero.style.setProperty('--hero-rule-stop', `${(24 + progress * 76).toFixed(2)}%`);
  };

  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(render);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  reducedMotion.addEventListener('change', schedule);
  render();
}
