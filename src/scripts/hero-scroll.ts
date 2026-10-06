const hero = document.querySelector<HTMLElement>('#hero');

if (hero) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wordSlot = hero.querySelector<HTMLElement>('[data-hero-word-slot]');
  const words = wordSlot ? [...wordSlot.querySelectorAll<HTMLElement>('[data-hero-word]')] : [];
  let frame = 0;
  let wordTimer = 0;
  let wordTransitionTimer = 0;
  let wordIndex = 0;
  let wordCycleStopped = false;

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

  const canonicalizeWordSlot = () => {
    window.clearTimeout(wordTimer);
    window.clearTimeout(wordTransitionTimer);
    wordTimer = 0;
    wordTransitionTimer = 0;
    wordCycleStopped = true;
    wordIndex = 0;
    if (!wordSlot || words.length === 0) return;
    delete wordSlot.dataset.cycleReady;
    wordSlot.dataset.currentWord = words[0]?.textContent?.trim() ?? '';
    words.forEach((word, index) => {
      word.dataset.state = index === 0 ? 'active' : 'idle';
    });
  };

  const startWordCycle = () => {
    if (!wordSlot || words.length < 2 || reducedMotion.matches) return;
    const order = [...words.keys()].slice(1).concat(0);
    let step = 0;
    wordSlot.dataset.cycleReady = 'true';

    const advance = () => {
      if (wordCycleStopped || reducedMotion.matches || step >= order.length) return;
      const nextIndex = order[step]!;
      const current = words[wordIndex]!;
      const next = words[nextIndex]!;
      current.dataset.state = 'out';
      next.dataset.state = 'enter';

      window.requestAnimationFrame(() => {
        if (wordCycleStopped || reducedMotion.matches) return;
        next.dataset.state = 'active';
        wordSlot.dataset.currentWord = next.textContent?.trim() ?? '';
      });

      wordTransitionTimer = window.setTimeout(() => {
        current.dataset.state = 'idle';
        wordIndex = nextIndex;
        step += 1;
        if (step < order.length) {
          wordTimer = window.setTimeout(advance, 2600);
        }
      }, 380);
    };

    wordTimer = window.setTimeout(advance, 2700);
  };

  const handleMotionPreference = () => {
    schedule();
    if (reducedMotion.matches) canonicalizeWordSlot();
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  reducedMotion.addEventListener('change', handleMotionPreference);
  render();
  startWordCycle();
}
