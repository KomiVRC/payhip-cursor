// === Graveyard Cursor Script for Payhip ===
// Author: You!
// Custom upside-down cross cursor + spooky red glowing trail

(function(){
  // Skip on touch devices like phones/tablets
  if (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) return;

  // Inject custom styles
  const style = document.createElement('style');
  style.innerHTML = `
    /* Hide native cursor, show default on inputs/buttons */
    body { cursor: none !important; }
    a, button, input, textarea, select { cursor: auto !important; }

    /* Main cursor */
    .custom-cursor {
      position: fixed;
      left: 0; top: 0;
      width: 36px; height: 36px;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.05s linear;
    }

    /* Red glowing trailing dots */
    .cursor-follower {
      position: fixed;
      left: 0; top: 0;
      width: 10px; height: 10px;
      background: rgba(180,0,0,0.8);
      box-shadow: 0 0 10px rgba(255,0,0,0.7);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 999998;
      opacity: 0.9;
      transition: opacity 0.5s ease-out;
    }
  `;
  document.head.appendChild(style);

  // === Create the upside-down cross SVG ===
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
      <!-- Upside-down black cross -->
      <rect x="28" y="8" width="8" height="48" fill="#000000"/>
      <rect x="16" y="36" width="32" height="8" fill="#000000"/>
    </svg>
  `;
  document.body.appendChild(cursor);

  // === Red trailing dots ===
  const trailCount = 6;
  const trails = [];
  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-follower';
    document.body.appendChild(dot);
    trails.push({el: dot, x: window.innerWidth / 2, y: window.innerHeight / 2});
  }

  // Track mouse movement
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Animate the trail to follow smoothly
  function animate() {
    let tx = mouseX, ty = mouseY;
    trails.forEach((t, i) => {
      t.x += (tx - t.x) * (0.2 + i * 0.05);
      t.y += (ty - t.y) * (0.2 + i * 0.05);
      t.el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
      t.el.style.opacity = (1 - i * 0.15).toString();
      tx = t.x;
      ty = t.y;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();