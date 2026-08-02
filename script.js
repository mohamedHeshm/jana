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
    name: 'جنى',
    birthDate: '2008-08-05T09:00:00', // تاريخ الميلاد
    galleryImages: [
      { src: 'https://picsum.photos/seed/bday1/600/450', cap: 'لحظة لا تُنسى' },
      { src: 'https://picsum.photos/seed/bday2/600/450', cap: 'ابتسامة تُخلّد' },
      { src: 'https://picsum.photos/seed/bday3/600/450', cap: 'دفء لا يوصف' },
      { src: 'https://picsum.photos/seed/bday4/600/450', cap: 'أثر يبقى في القلب' },
      { src: 'https://picsum.photos/seed/bday5/600/450', cap: 'بريق عينيكِ' },
      { src: 'https://picsum.photos/seed/bday6/600/450', cap: 'أجمل الذكريات' }
    ],
    timeline: [
      { year: '2018', icon: '🎓', title: 'بداية جديدة', desc: 'بداية فصلٍ مليء بالأحلام.' },
      { year: '2020', icon: '🌍', title: 'آفاق جديدة', desc: 'استكشاف العالم وذكريات لا تُنسى.' },
      { year: '2022', icon: '💼', title: 'إنجاز كبير', desc: 'محطة تستحق الفخر.' },
      { year: '2024', icon: '💜', title: 'أقوى من أي وقت', desc: 'محاطة بالحب وأصدقاء أوفياء.' },
      { year: '2026', icon: '🎂', title: 'اليوم', desc: 'نحتفل بعامٍ آخر جميل من العمر!' }
    ],
    cinematicLines: [
      '✨ في مكانٍ ما...',
      'بين ملايين النجوم...',
      'وُلدت روحٌ استثنائية...',
      'اليوم...',
      'الكون كله يحتفل بكِ...',
      'جنى'
    ],
    memoryBook: [
      { img: 'https://picsum.photos/seed/book1/500/280', title: 'يوم أن التقينا', date: '2015', text: 'ذكرى بدأت بها كل الحكاية.' },
      { img: 'https://picsum.photos/seed/book2/500/280', title: 'ضحكات لا تنتهي', date: '2019', text: 'فرحٌ لا يصنعه إلا الأصدقاء.' },
      { img: 'https://picsum.photos/seed/book3/500/280', title: 'رحلات معًا', date: '2022', text: 'كل رحلة تزداد جمالًا بوجودكِ.' },
      { img: 'https://picsum.photos/seed/book4/500/280', title: 'نحتفل اليوم', date: '2026', text: 'وها نحن هنا، نحتفل بكِ.' }
    ],
    reasons: [
      { icon: '💫', text: 'ابتسامتكِ تُنير كل مكان.' },
      { icon: '🌸', text: 'اهتمامكِ يفوق كل خيال.' },
      { icon: '🎨', text: 'إبداعكِ يُلهم من حولكِ.' },
      { icon: '🤍', text: 'تجعلين من حولكِ يشعرون بصدق الاهتمام.' },
      { icon: '🔥', text: 'قوتكِ في أصعب الأوقات مذهلة.' },
      { icon: '🌙', text: 'كونكِ على طبيعتكِ أجمل هدية.' }
    ],
    quotes: [
      'أنتِ تستحقين الكون كله.',
      'ابقَي مبتسمة دائمًا.',
      'اليوم لكِ وحدكِ.',
      'لا تتوقفي عن الحلم أبدًا.'
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
  $('#heroName').textContent = CONFIG.name;

  /* =========================================================
     CINEMATIC INTRO SEQUENCE
  ========================================================= */
  function runCinematicIntro() {
    const cineEl = $('#cinematicIntro');
    const lineEl = $('#cineLine');
    const lines = CONFIG.cinematicLines;
    let idx = 0;
    let stopped = false;

    function showNext() {
      if (stopped) return;
      if (idx >= lines.length) { finishIntro(); return; }
      lineEl.textContent = lines[idx];
      lineEl.classList.remove('out');
      requestAnimationFrame(() => lineEl.classList.add('show'));
      const holdTime = idx === lines.length - 1 ? 1800 : 1600;
      setTimeout(() => {
        if (stopped) return;
        lineEl.classList.remove('show');
        lineEl.classList.add('out');
        setTimeout(() => { idx++; showNext(); }, 700);
      }, holdTime);
    }
    function finishIntro() {
      cineEl.classList.add('hide');
      typewriter(introNameEl, introNameEl.dataset.text, 130);
      $('#startOverlay').hidden = false;
      setTimeout(() => cineEl.setAttribute('hidden',''), 1000);
    }
    $('#skipIntro').addEventListener('click', () => { stopped = true; finishIntro(); });
    showNext();
  }
  runCinematicIntro();

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
     NEBULA / AURORA BACKGROUND
  ========================================================= */
  const nebulaCanvas = $('#nebulaCanvas');
  const nebCtx = nebulaCanvas.getContext('2d');
  let nebT = 0;
  const NEBULA_COLORS = ['#3ee8ff', '#a855f7', '#ff5fc4'];
  function drawNebula() {
    nebT += 0.003;
    nebCtx.clearRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
    NEBULA_COLORS.forEach((color, i) => {
      const cx = nebulaCanvas.width * (0.25 + i * 0.28) + Math.sin(nebT + i) * 80 * devicePixelRatio;
      const cy = nebulaCanvas.height * 0.4 + Math.cos(nebT * 0.8 + i) * 60 * devicePixelRatio;
      const r = Math.min(nebulaCanvas.width, nebulaCanvas.height) * 0.35;
      const grad = nebCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, color + '33');
      grad.addColorStop(1, 'transparent');
      nebCtx.fillStyle = grad;
      nebCtx.fillRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
    });
    requestAnimationFrame(drawNebula);
  }

  /* =========================================================
     SHOOTING STARS (clickable)
  ========================================================= */
  const shootCanvas = $('#shootingStarCanvas');
  const shootCtx = shootCanvas.getContext('2d');
  let shootingStars = [];
  function spawnShootingStar() {
    const startX = rand(0.1, 0.9) * shootCanvas.width;
    shootingStars.push({
      x: startX, y: -20,
      vx: rand(-1.5, -0.8) * devicePixelRatio, vy: rand(2.5, 4) * devicePixelRatio,
      len: rand(60, 120) * devicePixelRatio, life: 1, clicked: false
    });
  }
  function drawShootingStars() {
    shootCtx.clearRect(0, 0, shootCanvas.width, shootCanvas.height);
    shootingStars.forEach((s, i) => {
      s.x += s.vx; s.y += s.vy; s.life -= 0.008;
      if (s.life <= 0 || s.y > shootCanvas.height + 50) { shootingStars.splice(i, 1); return; }
      shootCtx.save();
      shootCtx.globalAlpha = s.life;
      const grad = shootCtx.createLinearGradient(s.x, s.y, s.x - s.vx * 20, s.y - s.vy * 20);
      grad.addColorStop(0, '#fff'); grad.addColorStop(1, 'transparent');
      shootCtx.strokeStyle = grad; shootCtx.lineWidth = 2 * devicePixelRatio;
      shootCtx.beginPath(); shootCtx.moveTo(s.x, s.y);
      shootCtx.lineTo(s.x - s.vx * 20, s.y - s.vy * 20); shootCtx.stroke();
      shootCtx.restore();
    });
    requestAnimationFrame(drawShootingStars);
  }
  setInterval(() => { if (Math.random() < 0.7) spawnShootingStar(); }, 5000);
  document.addEventListener('click', (e) => {
    if (!shootingStars.length) return;
    const cx = e.clientX * devicePixelRatio;
    const cy = e.clientY * devicePixelRatio;
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      if (Math.hypot(s.x - cx, s.y - cy) < 60 * devicePixelRatio) {
        showFloatingQuote('أمنيتكِ ستتحقق.');
        launchFirework(s.x, s.y);
        shootingStars.splice(i, 1);
        break;
      }
    }
  });

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

  // Hover glow on interactive elements + gallery heart-explosion + magnetic pull
  document.addEventListener('mouseover', (e) => {
    const btn = e.target.closest('button, a, .gift-box, .flip-card, .balloon');
    if (btn) { cursorDot.classList.add('hover-btn'); cursorRing.classList.add('hover-btn'); }
    if (e.target.closest('.gallery-item')) spawnHeartBurst(mouseX, mouseY);
  });
  document.addEventListener('mouseout', (e) => {
    const btn = e.target.closest('button, a, .gift-box, .flip-card, .balloon');
    if (btn) { cursorDot.classList.remove('hover-btn'); cursorRing.classList.remove('hover-btn'); }
  });
  document.addEventListener('mousemove', (e) => {
    const mag = e.target.closest('.btn-glow, .btn-start');
    if (mag) {
      const r = mag.getBoundingClientRect();
      const relX = (e.clientX - (r.left + r.width / 2)) * 0.15;
      const relY = (e.clientY - (r.top + r.height / 2)) * 0.15;
      mag.style.transform = `translate(${relX}px, ${relY}px)`;
    }
  });
  document.addEventListener('mouseout', (e) => {
    const mag = e.target.closest('.btn-glow, .btn-start');
    if (mag) mag.style.transform = '';
  });
  document.addEventListener('click', (e) => {
    createClickRipple(e.clientX, e.clientY);
  });
  const heroParallax = $('#heroParallax');
  window.addEventListener('mousemove', (e) => {
    if (window.scrollY > window.innerHeight) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 20;
    const ny = (e.clientY / window.innerHeight - 0.5) * 20;
    heroParallax.style.setProperty('--mx', nx + 'px');
    heroParallax.style.setProperty('--my', ny + 'px');
    heroParallax.style.translate = `${nx}px ${ny}px`;
  });
  function createClickRipple(x, y) {
    const r = document.createElement('div');
    r.className = 'click-ripple';
    r.style.left = x + 'px'; r.style.top = y + 'px';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 750);
  }
  function spawnHeartBurst(x, y) {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnSparkle(x + rand(-20,20), y + rand(-20,20)), i * 30);
    }
  }

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
    [starsCanvas, nebulaCanvas, particlesCanvas, fwCanvas, confettiCanvas, sparkleCanvas, shootCanvas, wishCanvas].forEach(resizeCanvas);
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
    $('#vinyl').classList.add('spin');
    $('#eq').classList.add('active');
    localStorage.setItem('bday_music_playing', '1');
  }
  function stopMusic() {
    musicPlaying = false;
    clearMusicTimers();
    $('#playPauseBtn').textContent = '▶';
    $('#vinyl').classList.remove('spin');
    $('#eq').classList.remove('active');
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
    drawStars(); drawNebula(); drawParticles(); drawSparkles(); confettiLoop(); fireworksLoop(); drawShootingStars();
    startMusic();
    burstConfetti(120);
    startFireworksShow(3000);
    startFloatingQuoteCycle();
    startBalloons();
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

    const totalMs = now - birth;
    $('#emoDays').dataset.target = Math.floor(totalMs / 86400000);
    $('#emoHours').dataset.target = Math.floor(totalMs / 3600000);
    $('#emoMinutes').dataset.target = Math.floor(totalMs / 60000);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* -------- Animated count-up for emotional numbers (once visible) -------- */
  function animateCountUp(el, duration = 1600) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  /* =========================================================
     NEXT BIRTHDAY FINAL COUNTDOWN
  ========================================================= */
  function updateNextBirthday() {
    const birth = new Date(CONFIG.birthDate);
    const now = new Date();
    let next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes(), birth.getSeconds());
    if (next <= now) next.setFullYear(next.getFullYear() + 1);
    const diff = next - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    $('#nbDays').textContent = d;
    $('#nbHours').textContent = h;
    $('#nbMinutes').textContent = m;
    $('#nbSeconds').textContent = s;
  }
  updateNextBirthday();
  setInterval(updateNextBirthday, 1000);

  /* =========================================================
     MAKE A WISH
  ========================================================= */
  const wishCanvas = $('#wishCanvas');
  const wishCtx = wishCanvas.getContext('2d');
  let wishStars = [];
  function sendWish() {
    const input = $('#wishInput');
    const text = input.value.trim();
    if (!text) return;
    const startX = window.innerWidth / 2 * devicePixelRatio;
    const startY = window.innerHeight * 0.7 * devicePixelRatio;
    wishStars.push({
      x: startX, y: startY, vx: rand(-0.4, 0.4), vy: -rand(2, 3.4) * devicePixelRatio,
      life: 1, text
    });
    input.value = '';
    showFloatingQuote('أمنيتكِ طارت إلى النجوم ✨');
  }
  function drawWishStars() {
    wishCtx.clearRect(0, 0, wishCanvas.width, wishCanvas.height);
    wishStars.forEach((w, i) => {
      w.x += w.vx; w.y += w.vy; w.life -= 0.006;
      if (Math.random() > 0.6) spawnSparkle(w.x / devicePixelRatio, w.y / devicePixelRatio);
      if (w.life <= 0) { wishStars.splice(i, 1); return; }
      wishCtx.save();
      wishCtx.globalAlpha = w.life;
      wishCtx.fillStyle = '#ffd479';
      wishCtx.shadowColor = '#ffd479'; wishCtx.shadowBlur = 20;
      wishCtx.beginPath();
      wishCtx.arc(w.x, w.y, 5 * devicePixelRatio, 0, Math.PI * 2);
      wishCtx.fill();
      wishCtx.restore();
    });
    requestAnimationFrame(drawWishStars);
  }
  drawWishStars();
  $('#sendWishBtn').addEventListener('click', sendWish);
  $('#wishInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') sendWish(); });

  /* =========================================================
     FLOATING QUOTES (periodic)
  ========================================================= */
  const floatingQuoteEl = $('#floatingQuote');
  let quoteTimer = null;
  function showFloatingQuote(text) {
    floatingQuoteEl.textContent = text;
    floatingQuoteEl.classList.add('show');
    setTimeout(() => floatingQuoteEl.classList.remove('show'), 3200);
  }
  function startFloatingQuoteCycle() {
    if (quoteTimer) return;
    let qi = 0;
    quoteTimer = setInterval(() => {
      showFloatingQuote(CONFIG.quotes[qi % CONFIG.quotes.length]);
      qi++;
    }, 9000);
  }

  /* =========================================================
     MEMORY BOOK
  ========================================================= */
  const bookPageEl = $('#bookPage');
  let bookIdx = 0;
  function renderBookPage() {
    const p = CONFIG.memoryBook[bookIdx];
    bookPageEl.classList.add('flip-out');
    setTimeout(() => {
      bookPageEl.innerHTML = `
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <span class="book-date">${p.date}</span>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
      `;
      bookPageEl.classList.remove('flip-out');
    }, 300);
  }
  renderBookPage();
  $('#bookPrev').addEventListener('click', () => {
    bookIdx = (bookIdx - 1 + CONFIG.memoryBook.length) % CONFIG.memoryBook.length;
    renderBookPage();
  });
  $('#bookNext').addEventListener('click', () => {
    bookIdx = (bookIdx + 1) % CONFIG.memoryBook.length;
    renderBookPage();
  });

  /* =========================================================
     REASONS WE LOVE YOU — FLIP CARDS
  ========================================================= */
  const flipGrid = $('#flipGrid');
  CONFIG.reasons.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front"><div class="flip-icon">${r.icon}</div><span>اضغطي لتكتشفي</span></div>
        <div class="flip-back">${r.text}</div>
      </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    flipGrid.appendChild(card);
  });

  /* =========================================================
     GIFT BOX
  ========================================================= */
  const giftBox = $('#giftBox');
  giftBox.addEventListener('click', () => {
    if (giftBox.classList.contains('opened')) return;
    giftBox.classList.add('opened');
    $('#giftMessage').hidden = false;
    burstConfetti(90);
    const r = giftBox.getBoundingClientRect();
    for (let i = 0; i < 12; i++) {
      setTimeout(() => spawnSparkle(r.left + r.width / 2 + rand(-40,40), r.top + rand(-20,20)), i * 40);
    }
  });

  /* =========================================================
     CLICKABLE FLOATING BALLOONS
  ========================================================= */
  const BALLOON_COLORS = ['#ff5fc4', '#a855f7', '#3ee8ff', '#ffd479'];
  function spawnBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const color = BALLOON_COLORS[Math.floor(rand(0, BALLOON_COLORS.length))];
    const left = rand(5, 90);
    const duration = rand(9, 16);
    Object.assign(balloon.style, {
      position: 'fixed', left: left + 'vw', bottom: '-80px', width: '46px', height: '58px',
      background: `radial-gradient(circle at 30% 30%, ${color}, #00000055)`,
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      boxShadow: `0 0 18px ${color}`, zIndex: 200, cursor: 'pointer',
      transition: `transform ${duration}s linear, bottom ${duration}s linear`
    });
    document.body.appendChild(balloon);
    requestAnimationFrame(() => {
      balloon.style.bottom = '110vh';
      balloon.style.transform = `translateX(${rand(-40, 40)}px)`;
    });
    function pop() {
      const r = balloon.getBoundingClientRect();
      burstConfetti(50);
      for (let i = 0; i < 8; i++) setTimeout(() => spawnSparkle(r.left + rand(-10,10), r.top + rand(-10,10)), i * 25);
      playPopSound();
      balloon.remove();
    }
    balloon.addEventListener('click', pop);
    setTimeout(() => { if (balloon.parentNode) balloon.remove(); }, duration * 1000 + 500);
  }
  function playPopSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
      o.type = 'triangle'; o.frequency.setValueAtTime(500, audioCtx.currentTime);
      o.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15);
      g.gain.setValueAtTime(0.2, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      o.connect(g).connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + 0.16);
    } catch (e) {}
  }
  let balloonInterval = null;
  function startBalloons() {
    if (balloonInterval) return;
    balloonInterval = setInterval(spawnBalloon, 4000);
  }

  /* =========================================================
     REPLAY CELEBRATION
  ========================================================= */
  $('#replayBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    cakeBlown = false;
    $('#cakeEl').classList.remove('blown');
    $('#blowBtn').textContent = 'أطفئي الشموع 🕯️';
    $('#blowBtn').disabled = false;
    giftBox.classList.remove('opened');
    $('#giftMessage').hidden = true;
    document.body.classList.remove('secret-mode');
    $$('.flip-card').forEach((c) => c.classList.remove('flipped'));
    burstConfetti(150);
    startFireworksShow(3000);
  });

  /* =========================================================
     CAKE — COUNTDOWN + BLOW CANDLES (button or microphone)
  ========================================================= */
  let cakeBlown = false;
  let cakeClickCount = 0;

  function actuallyBlowCandles() {
    if (cakeBlown) return;
    cakeBlown = true;
    $('#cakeEl').classList.add('blown');
    burstConfetti(220);
    startFireworksShow(5500);
    if (musicPlaying) { stopMusic(); startMusic(1.8); }
    $('#blowBtn').textContent = '🎉 تحققت الأمنية!';
    $('#blowBtn').disabled = true;
    $('#micHint').textContent = '🎉 عيد ميلاد سعيد يا ' + CONFIG.name + ' 🎉';
    stopMicListening();
  }

  function runCakeCountdown(cb) {
    const el = $('#cakeCountdown');
    el.hidden = false;
    const steps = ['3', '2', '1', 'تمنّي أمنية...'];
    let i = 0;
    (function next() {
      if (i >= steps.length) { el.hidden = true; cb(); return; }
      el.textContent = steps[i];
      el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
      i++;
      setTimeout(next, 800);
    })();
  }

  $('#blowBtn').addEventListener('click', () => {
    if (cakeBlown) return;
    $('#blowBtn').disabled = true;
    runCakeCountdown(() => { $('#blowBtn').disabled = false; actuallyBlowCandles(); });
  });

  // Microphone-based blowing (optional, graceful fallback)
  let micStream = null, micRafId = null;
  function stopMicListening() {
    if (micRafId) cancelAnimationFrame(micRafId);
    if (micStream) micStream.getTracks().forEach((t) => t.stop());
  }
  async function initMicBlow() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const source = ctx.createMediaStreamSource(micStream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      $('#micHint').textContent = '🎤 انفخي في الميكروفون لتُطفئي الشموع!';
      (function check() {
        if (cakeBlown) return;
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > 55) { actuallyBlowCandles(); return; }
        micRafId = requestAnimationFrame(check);
      })();
    } catch (err) {
      $('#micHint').textContent = '🎤 انفخي في الميكروفون، أو اضغطي الزر';
    }
  }
  // Attempt mic access lazily once cake section is near viewport
  const cakeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !cakeBlown) {
        initMicBlow();
        cakeSectionObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  cakeSectionObserver.observe($('#cake'));

  /* -------- Secret Mode: click cake 5x, or type N O U R -------- */
  function unlockSecretMode() {
    if (document.body.classList.contains('secret-mode')) return;
    document.body.classList.add('secret-mode');
    $('#secretBanner').hidden = false;
    burstConfetti(260);
    startFireworksShow(6000);
    setTimeout(() => $('#secretBanner').hidden = true, 4000);
  }
  $('#cakeEl').addEventListener('click', () => {
    cakeClickCount++;
    if (cakeClickCount >= 5) { unlockSecretMode(); cakeClickCount = 0; }
  });
  const secretSeq = ['ج', 'ن', 'ى'];
  const secretSeqAlt = ['J', 'a', 'n', 'a']; // fallback for English keyboards
  let secretBuffer = [];
  document.addEventListener('keydown', (e) => {
    secretBuffer.push(e.key.toLowerCase());
    secretBuffer = secretBuffer.slice(-secretSeqAlt.length);
    const joined = secretBuffer.join('');
    if (joined === secretSeq.join('') || joined.endsWith(secretSeqAlt.join(''))) unlockSecretMode();
  });

  /* =========================================================
     GALLERY + LIGHTBOX
  ========================================================= */
  const galleryGrid = $('#galleryGrid');
  CONFIG.galleryImages.forEach((img, idx) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.innerHTML = `
      <img src="${img.src}" alt="${img.cap}" loading="lazy">
      <div class="gallery-cap">${img.cap}</div>
    `;
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('mousemove', (e) => {
      const r = item.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -12;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
      item.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    item.addEventListener('mouseleave', () => { item.style.transform = ''; });
    galleryGrid.appendChild(item);
  });

  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  let lbIndex = 0;
  function openLightbox(index) {
    lbIndex = index;
    const img = CONFIG.galleryImages[lbIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.cap;
    lightbox.hidden = false;
  }
  function lbNav(dir) {
    lbIndex = (lbIndex + dir + CONFIG.galleryImages.length) % CONFIG.galleryImages.length;
    const img = CONFIG.galleryImages[lbIndex];
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = img.src; lightboxImg.alt = img.cap;
      lightboxImg.style.opacity = 1;
    }, 150);
  }
  $('#lightboxClose').addEventListener('click', () => lightbox.hidden = true);
  $('#lightboxPrev').addEventListener('click', () => lbNav(-1));
  $('#lightboxNext').addEventListener('click', () => lbNav(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.hidden = true; });
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') lightbox.hidden = true;
    if (e.key === 'ArrowRight') lbNav(1);
    if (e.key === 'ArrowLeft') lbNav(-1);
  });
  // Swipe support
  let lbTouchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { lbTouchStartX = e.changedTouches[0].clientX; });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - lbTouchStartX;
    if (Math.abs(dx) > 40) lbNav(dx < 0 ? 1 : -1);
  });

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
  let emoCounted = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target === letterEl && !letterTyped) {
          letterTyped = true;
          typewriter(letterEl, letterFull, 22);
        }
        if (entry.target.id === 'countdown' && !emoCounted) {
          emoCounted = true;
          [$('#emoDays'), $('#emoHours'), $('#emoMinutes')].forEach((el) => animateCountUp(el));
        }
      }
    });
  }, { threshold: 0.2 });

  function observeRevealTargets() {
    $$('.gallery-item, .tl-card, .reveal-section, .reveal, .emo-card, .count-card').forEach((el) => observer.observe(el));
    observer.observe(letterEl);
  }
  document.addEventListener('DOMContentLoaded', observeRevealTargets);
  observeRevealTargets();

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