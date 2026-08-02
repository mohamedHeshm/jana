/* ==========================================================================
   HAPPY BIRTHDAY WEBSITE — VANILLA JS
   Sections: Config | Loader | Stars/Particles | Cursor | Start/Intro/Typewriter
   Music (WebAudio synth, replace with <audio src> for real file) | Countdown
   Cake | Fireworks | Confetti | Sparkles | Gallery/Lightbox | Timeline
   Letter typewriter | Theme | Scroll progress / back-to-top | Parallax
   ========================================================================== */

(() => {
  'use strict';

  /* ---------------- CONFIG ---------------- */
  const CONFIG = {
    name: 'Nour',
    birthDate: '2000-08-02T09:00:00', // change to real birth date/time
    galleryImages: [
      { src: 'https://picsum.photos/seed/bday1/600/450', cap: 'Sweet memory #1' },
      { src: 'https://picsum.photos/seed/bday2/600/450', cap: 'Sweet memory #2' },
      { src: 'https://picsum.photos/seed/bday3/600/450', cap: 'Sweet memory #3' },
      { src: 'https://picsum.photos/seed/bday4/600/450', cap: 'Sweet memory #4' },
      { src: 'https://picsum.photos/seed/bday5/600/450', cap: 'Sweet memory #5' },
      { src: 'https://picsum.photos/seed/bday6/600/450', cap: 'Sweet memory #6' }
    ],
    timeline: [
      { year: '2018', icon: '🎓', title: 'A New Beginning', desc: 'Started a new chapter full of dreams.' },
      { year: '2020', icon: '🌍', title: 'New Horizons', desc: 'Explored the world and made unforgettable memories.' },
      { year: '2022', icon: '💼', title: 'Big Achievement', desc: 'Reached a milestone to be proud of.' },
      { year: '2024', icon: '💜', title: 'Growing Stronger', desc: 'Surrounded by love and lifelong friends.' },
      { year: '2026', icon: '🎂', title: 'Today', desc: 'Celebrating another beautiful year of life!' }
    ]
  };

  /* ---------------- UTIL ---------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const rand = (min, max) => Math.random() * (max - min) + min;

  /* =========================================================
     LOADER
  ========================================================= */
  window.addEventListener('load', () => {
    setTimeout(() => $('#loader').classList.add('hide'), 900);
  });

  /* =========================================================
     TYPEWRITER for intro name
  ========================================================= */
  function typewriter(el, text, speed = 110, cb) {
    el.textContent = '';
    let i = 0;
    (function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if (cb) cb();
    })();
  }
  const introNameEl = $('#introName');
  typewriter(introNameEl, introNameEl.dataset.text, 130);
  $('#heroName').textContent = CONFIG.name;

  /* =========================================================
     STARS BACKGROUND CANVAS
  ========================================================= */
  const starsCanvas = $('#starsCanvas');
  const starsCtx = starsCanvas.getContext('2d');
  let stars = [];

  function resizeCanvas(canvas) {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  function initStars() {
    resizeCanvas(starsCanvas);
    const count = Math.floor((window.innerWidth * window.innerHeight) / 6000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 1.6 * devicePixelRatio,
      s: rand(0.05, 0.3) * devicePixelRatio,
      a: Math.random()
    }));
  }

  function drawStars() {
    starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    starsCtx.fillStyle = '#fff';
    stars.forEach((s) => {
      s.y += s.s;
      if (s.y > starsCanvas.height) s.y = 0;
      s.a += rand(-0.02, 0.02);
      starsCtx.globalAlpha = Math.max(0.2, Math.min(1, s.a));
      starsCtx.beginPath();
      starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starsCtx.fill();
    });
    starsCtx.globalAlpha = 1;
    requestAnimationFrame(drawStars);
  }

  /* =========================================================
     FLOATING PARTICLES (hearts + balloons drifting)
  ========================================================= */
  const particlesCanvas = $('#particlesCanvas');
  const pCtx = particlesCanvas.getContext('2d');
  let particles = [];
  const EMOJIS = ['🎈', '💜', '✨', '🎉', '💫'];

  function initParticles() {
    resizeCanvas(particlesCanvas);
    particles = Array.from({ length: 18 }, () => spawnParticle());
  }
  function spawnParticle() {
    return {
      x: Math.random() * particlesCanvas.width,
      y: particlesCanvas.height + Math.random() * particlesCanvas.height,
      size: rand(16, 34) * devicePixelRatio,
      speed: rand(0.3, 1) * devicePixelRatio,
      drift: rand(-0.3, 0.3),
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      rot: rand(0, 360)
    };
  }
  function drawParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach((p, i) => {
      p.y -= p.speed;
      p.x += p.drift;
      p.rot += 0.2;
      if (p.y < -40) particles[i] = spawnParticle();
      pCtx.save();
      pCtx.translate(p.x, p.y);
      pCtx.font = `${p.size}px serif`;
      pCtx.globalAlpha = 0.85;
      pCtx.fillText(p.emoji, 0, 0);
      pCtx.restore();
    });
    requestAnimationFrame(drawParticles);
  }

  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */
  const cursorDot = $('#cursorDot');
  const cursorRing = $('#cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    spawnSparkle(mouseX, mouseY);
  });
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  /* =========================================================
     SPARKLE TRAIL (canvas)
  ========================================================= */
  const sparkleCanvas = $('#sparkleCanvas');
  const sCtx = sparkleCanvas.getContext('2d');
  let sparkles = [];
  function spawnSparkle(x, y) {
    if (Math.random() > 0.5) return;
    sparkles.push({
      x: x * devicePixelRatio, y: y * devicePixelRatio,
      r: rand(1, 3) * devicePixelRatio, life: 1,
      color: [ '#3ee8ff', '#a855f7', '#ff5fc4', '#ffd479' ][Math.floor(rand(0,4))]
    });
  }
  function drawSparkles() {
    sCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
    sparkles.forEach((s, i) => {
      s.life -= 0.03;
      s.y -= 0.4;
      if (s.life <= 0) { sparkles.splice(i, 1); return; }
      sCtx.globalAlpha = s.life;
      sCtx.fillStyle = s.color;
      sCtx.beginPath();
      sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      sCtx.fill();
    });
    sCtx.globalAlpha = 1;
    requestAnimationFrame(drawSparkles);
  }

  /* =========================================================
     FIREWORKS
  ========================================================= */
  const fwCanvas = $('#fireworksCanvas');
  const fwCtx = fwCanvas.getContext('2d');
  let fireworkParticles = [];
  const FW_COLORS = ['#3ee8ff', '#a855f7', '#ff5fc4', '#ffd479', '#ffffff'];

  function launchFirework(x, y) {
    const count = 60;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = rand(2, 6) * devicePixelRatio;
      fireworkParticles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: FW_COLORS[Math.floor(rand(0, FW_COLORS.length))]
      });
    }
  }
  function fireworksLoop() {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    fireworkParticles.forEach((p, i) => {
      p.vy += 0.03 * devicePixelRatio;
      p.x += p.vx; p.y += p.vy;
      p.life -= 0.012;
      if (p.life <= 0) { fireworkParticles.splice(i, 1); return; }
      fwCtx.globalAlpha = p.life;
      fwCtx.fillStyle = p.color;
      fwCtx.beginPath();
      fwCtx.arc(p.x, p.y, 2.5 * devicePixelRatio, 0, Math.PI * 2);
      fwCtx.fill();
    });
    fwCtx.globalAlpha = 1;
    requestAnimationFrame(fireworksLoop);
  }
  let fwInterval = null;
  function startFireworksShow(duration = 4000) {
    launchFirework(rand(0.2,0.8)*fwCanvas.width, rand(0.2,0.5)*fwCanvas.height);
    fwInterval = setInterval(() => {
      launchFirework(rand(0.15,0.85) * fwCanvas.width, rand(0.15,0.55) * fwCanvas.height);
    }, 500);
    setTimeout(() => clearInterval(fwInterval), duration);
  }

  /* =========================================================
     CONFETTI
  ========================================================= */
  const confettiCanvas = $('#confettiCanvas');
  const cfCtx = confettiCanvas.getContext('2d');
  let confettiPieces = [];
  const CF_COLORS = ['#3ee8ff', '#a855f7', '#ff5fc4', '#ffd479'];

  function burstConfetti(count = 150) {
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: rand(0, confettiCanvas.width),
        y: -20,
        w: rand(4, 9) * devicePixelRatio,
        h: rand(8, 16) * devicePixelRatio,
        vy: rand(2, 5) * devicePixelRatio,
        vx: rand(-1.5, 1.5) * devicePixelRatio,
        rot: rand(0, 360),
        vr: rand(-6, 6),
        color: CF_COLORS[Math.floor(rand(0, CF_COLORS.length))],
        life: 1
      });
    }
  }
  function confettiLoop() {
    cfCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach((p, i) => {
      p.y += p.vy; p.x += p.vx; p.rot += p.vr;
      if (p.y > confettiCanvas.height + 20) { confettiPieces.splice(i, 1); return; }
      cfCtx.save();
      cfCtx.translate(p.x, p.y);
      cfCtx.rotate((p.rot * Math.PI) / 180);
      cfCtx.fillStyle = p.color;
      cfCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cfCtx.restore();
    });
    requestAnimationFrame(confettiLoop);
  }

  /* Resize handling for all canvases */
  function resizeAll() {
    [starsCanvas, particlesCanvas, fwCanvas, confettiCanvas, sparkleCanvas].forEach(resizeCanvas);
    initStars();
    initParticles();
  }
  window.addEventListener('resize', resizeAll);

  /* =========================================================
     MUSIC — synthesized birthday tune via Web Audio API
     (Replace with: audioEl.src = 'assets/music.mp3'; for real file)
  ========================================================= */
  const audioEl = $('#bgMusic');
  let audioCtx = null, musicNodes = [], musicPlaying = false, musicTimeouts = [];
  const NOTES = { C4:261.6,D4:293.7,E4:329.6,F4:349.2,G4:392.0,A4:440.0,B4:493.9,C5:523.3 };
  // Simple "Happy Birthday" melody (relative durations in ms)
  const MELODY = [
    ['G4',300],['G4',200],['A4',500],['G4',500],['C5',500],['B4',900],
    ['G4',300],['G4',200],['A4',500],['G4',500],['D5',500],['C5',900],
  ];
  const NOTES_EXT = Object.assign({}, NOTES, { D5: 587.3 });

  function playTone(freq, duration, startTime, gainVal = 0.15) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.03);
    gain.gain.linearRampToValueAtTime(0, startTime + duration / 1000);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration / 1000 + 0.05);
    musicNodes.push(osc);
  }

  function scheduleMelody(speedMultiplier = 1) {
    if (!audioCtx) return;
    let t = audioCtx.currentTime + 0.1;
    MELODY.forEach(([note, dur]) => {
      const d = dur / speedMultiplier;
      playTone(NOTES_EXT[note], d, t);
      t += d / 1000;
    });
    const totalMs = MELODY.reduce((a, [, d]) => a + d, 0) / speedMultiplier + 300;
    const id = setTimeout(() => { if (musicPlaying) scheduleMelody(speedMultiplier); }, totalMs);
    musicTimeouts.push(id);
  }

  function clearMusicTimers() {
    musicTimeouts.forEach(clearTimeout);
    musicTimeouts = [];
  }

  function startMusic(speedMultiplier = 1) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    musicPlaying = true;
    clearMusicTimers();
    scheduleMelody(speedMultiplier);
    $('#playPauseBtn').textContent = '⏸';
    localStorage.setItem('bday_music_playing', '1');
  }
  function stopMusic() {
    musicPlaying = false;
    clearMusicTimers();
    $('#playPauseBtn').textContent = '▶';
    localStorage.setItem('bday_music_playing', '0');
  }

  $('#playPauseBtn').addEventListener('click', () => {
    if (musicPlaying) stopMusic(); else startMusic(cakeBlown ? 1.8 : 1);
  });
  $('#volumeSlider').addEventListener('input', (e) => {
    audioEl.volume = e.target.value; // reserved for real <audio> playback
    localStorage.setItem('bday_music_vol', e.target.value);
  });

  /* =========================================================
     START CELEBRATION
  ========================================================= */
  $('#startBtn').addEventListener('click', () => {
    $('#startOverlay').classList.add('hide');
    $('#mainContent').hidden = false;
    resizeAll();
    drawStars(); drawParticles(); drawSparkles(); confettiLoop(); fireworksLoop();
    startMusic();
    burstConfetti(120);
    startFireworksShow(3000);
  }, { once: true });

  /* =========================================================
     COUNTDOWN / AGE
  ========================================================= */
  function updateCountdown() {
    const birth = new Date(CONFIG.birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    let hours = now.getHours() - birth.getHours();
    let minutes = now.getMinutes() - birth.getMinutes();
    let seconds = now.getSeconds() - birth.getSeconds();
    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonth; months--;
    }
    if (months < 0) { months += 12; years--; }

    $('#cAge').textContent = years;
    $('#cYears').textContent = years;
    $('#cMonths').textContent = months;
    $('#cDays').textContent = days;
    $('#cHours').textContent = hours;
    $('#cMinutes').textContent = minutes;
    $('#cSeconds').textContent = seconds;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* =========================================================
     CAKE — BLOW CANDLES
  ========================================================= */
  let cakeBlown = false;
  $('#blowBtn').addEventListener('click', () => {
    if (cakeBlown) return;
    cakeBlown = true;
    $('#cakeEl').classList.add('blown');
    burstConfetti(200);
    startFireworksShow(5000);
    if (musicPlaying) { stopMusic(); startMusic(1.8); }
    $('#blowBtn').textContent = '🎉 Wish Made!';
    $('#blowBtn').disabled = true;
  });

  /* =========================================================
     GALLERY + LIGHTBOX
  ========================================================= */
  const galleryGrid = $('#galleryGrid');
  CONFIG.galleryImages.forEach((img) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.innerHTML = `
      <img src="${img.src}" alt="${img.cap}" loading="lazy">
      <div class="gallery-cap">${img.cap}</div>
    `;
    item.addEventListener('click', () => openLightbox(img.src, img.cap));
    galleryGrid.appendChild(item);
  });

  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.hidden = false;
  }
  $('#lightboxClose').addEventListener('click', () => lightbox.hidden = true);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.hidden = true; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.hidden = true; });

  /* =========================================================
     TIMELINE
  ========================================================= */
  const timelineList = $('#timelineList');
  CONFIG.timeline.forEach((t) => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-icon">${t.icon}</div>
      <div class="tl-card">
        <span class="tl-year">${t.year}</span>
        <h3 class="tl-title">${t.title}</h3>
        <p class="tl-desc">${t.desc}</p>
      </div>
    `;
    timelineList.appendChild(item);
  });

  /* =========================================================
     LETTER TYPEWRITER (triggers on scroll into view)
  ========================================================= */
  const letterEl = $('#letterText');
  const letterFull = letterEl.dataset.full;
  let letterTyped = false;

  /* =========================================================
     INTERSECTION OBSERVER — reveal animations
  ========================================================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target === letterEl && !letterTyped) {
          letterTyped = true;
          typewriter(letterEl, letterFull, 22);
        }
      }
    });
  }, { threshold: 0.2 });

  document.addEventListener('DOMContentLoaded', () => {
    $$('.gallery-item, .tl-card').forEach((el) => observer.observe(el));
    observer.observe(letterEl);
  });
  // In case DOMContentLoaded already fired (script is deferred), also run immediately
  $$('.gallery-item, .tl-card').forEach((el) => observer.observe(el));
  observer.observe(letterEl);

  /* =========================================================
     THEME TOGGLE
  ========================================================= */
  const themeToggle = $('#themeToggle');
  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    localStorage.setItem('bday_theme', theme);
  }
  themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(current);
  });
  applyTheme(localStorage.getItem('bday_theme') || 'dark');

  /* =========================================================
     SCROLL PROGRESS + BACK TO TOP + PARALLAX
  ========================================================= */
  const scrollProgress = $('#scrollProgress');
  const backToTop = $('#backToTop');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
    backToTop.classList.toggle('show', scrollTop > 500);

    $$('.parallax-layer').forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0.2;
      layer.style.transform = `translateY(${scrollTop * speed * -0.15}px)`;
    });
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* =========================================================
     INITIAL SETUP
  ========================================================= */
  resizeAll();
})();
