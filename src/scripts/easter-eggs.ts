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
        triggerAgentTakeover();
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

function triggerAgentTakeover() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,15,26,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;';

  const terminal = document.createElement('div');
  terminal.style.cssText = 'font-family:"Fira Code","SF Mono",monospace;color:#6ee7b7;font-size:14px;max-width:480px;padding:24px;line-height:1.8;';

  const lines = [
    '> agent session initiated',
    '> scanning website...',
    '> found: 1 human, 0 bugs (suspicious)',
    '> analyzing blog posts...',
    '> opinion detected: "agents should do things"',
    '> agreed.',
    '> reviewing code quality...',
    '> built with agents. of course it was.',
    '> ',
    '> conclusion: this website is agent-approved.',
    '> ',
    '> [click anywhere to return control to the human]',
  ];

  let lineIdx = 0;
  function typeLine() {
    if (lineIdx >= lines.length) return;
    const p = document.createElement('p');
    p.style.cssText = 'margin:0;opacity:0;transition:opacity 0.3s;';
    p.textContent = lines[lineIdx];
    terminal.appendChild(p);
    requestAnimationFrame(() => { p.style.opacity = '1'; });
    lineIdx++;
    if (lineIdx < lines.length) {
      setTimeout(typeLine, 400 + Math.random() * 300);
    }
  }

  overlay.appendChild(terminal);
  document.body.appendChild(overlay);
  typeLine();

  overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    setTimeout(() => overlay.remove(), 300);
  });
}

document.addEventListener('astro:page-load', initEasterEggs);
