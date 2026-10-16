// Viral Game Studio - Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
  let players = 0;
  let clickPower = 1;
  let autoPower = 0;
  let hookCost = 20;
  let adCost = 100;
  let hypeLevel = 1;

  const playerEl = document.getElementById('player-count');
  const hypeEl = document.getElementById('hype-level');
  const rankEl = document.getElementById('global-rank');
  const tapBtn = document.getElementById('tap-btn');
  const tapEffects = document.getElementById('tap-effects');
  const upgradeHookBtn = document.getElementById('upgrade-hook-btn');
  const upgradeAdBtn = document.getElementById('upgrade-ad-btn');
  const hookCostEl = document.getElementById('hook-cost');
  const adCostEl = document.getElementById('ad-cost');

  function updateDisplay() {
    playerEl.textContent = players.toLocaleString();
    hypeEl.textContent = `${hypeLevel}x`;
    
    // Dynamic rank calculation
    if (players > 100000) rankEl.textContent = '#1 Trending 🔥';
    else if (players > 25000) rankEl.textContent = '#12 Top Charts';
    else if (players > 5000) rankEl.textContent = '#89 Rising';
    else if (players > 1000) rankEl.textContent = '#350';
    else if (players > 100) rankEl.textContent = '#2,400';
    else rankEl.textContent = '#10,000+';

    hookCostEl.textContent = hookCost;
    adCostEl.textContent = adCost;

    upgradeHookBtn.disabled = players < hookCost;
    upgradeAdBtn.disabled = players < adCost;
  }

  function spawnEffect(x, y, text) {
    const el = document.createElement('div');
    el.className = 'float-effect';
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    tapEffects.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 800);
  }

  tapBtn.addEventListener('click', (e) => {
    const gain = clickPower * hypeLevel;
    players += gain;

    const rect = tapBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - 20;
    const y = e.clientY - rect.top - 20;
    spawnEffect(x, y, `+${gain}`);

    // Increase hype temporarily
    if (Math.random() > 0.7) {
      hypeLevel = Math.min(hypeLevel + 1, 10);
      setTimeout(() => {
        hypeLevel = Math.max(1, hypeLevel - 1);
        updateDisplay();
      }, 3000);
    }

    updateDisplay();
  });

  upgradeHookBtn.addEventListener('click', () => {
    if (players >= hookCost) {
      players -= hookCost;
      clickPower += 5;
      hookCost = Math.floor(hookCost * 1.8);
      updateDisplay();
    }
  });

  upgradeAdBtn.addEventListener('click', () => {
    if (players >= adCost) {
      players -= adCost;
      autoPower += 10;
      adCost = Math.floor(adCost * 2.2);
      updateDisplay();
    }
  });

  // Auto loop (TikTok ads / Organic sharing)
  setInterval(() => {
    if (autoPower > 0) {
      players += autoPower;
      updateDisplay();
    }
  }, 1000);

  updateDisplay();
});
