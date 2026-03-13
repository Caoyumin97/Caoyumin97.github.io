const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

function initEasterEggs() {
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        triggerConfetti();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  let clickCount = 0;
  let clickTimer: ReturnType<typeof setTimeout>;
  const logo = document.querySelector('.navbar-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

      if (clickCount >= 5) {
        e.preventDefault();
        const el = logo as HTMLElement;
        el.style.transition = 'transform 0.6s ease';
        el.style.transform = 'rotate(360deg)';
        setTimeout(() => { el.style.transform = ''; }, 700);
        clickCount = 0;
      }
    });
  }
}

function triggerConfetti() {
  const count = 60;
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const x = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const duration = Math.random() * 1.5 + 1.5;
    const colors = ['#a78bfa', '#6ee7b7', '#fbbf24', '#fb7185', '#7dd3fc'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    star.style.cssText = `
      position:absolute;top:-${size}px;left:${x}%;
      width:${size}px;height:${size}px;
      background:${color};border-radius:50%;
      animation:confetti-fall ${duration}s ${delay}s ease-in forwards;
      opacity:0.9;
    `;
    container.appendChild(star);
  }

  if (!document.querySelector('#confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => container.remove(), 3500);
}

document.addEventListener('astro:page-load', initEasterEggs);
