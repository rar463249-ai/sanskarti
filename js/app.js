/* ==========================================================================
   SANSKRITI'S 15TH BIRTHDAY MOONLIT DIGITAL EXPERIENCE - HANDICRAFT LOVER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. PRELOADER
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar');
  
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      setTimeout(() => {
        preloader.classList.add('loaded');
        startTypewriter();
      }, 400);
    }
    loaderBar.style.width = `${progress}%`;
  }, 100);

  // 2. CANVAS: STARRY SKY, SHOOTING STARS & FIREFLIES
  const bgCanvas = document.getElementById('bg-canvas');
  const ctx = bgCanvas.getContext('2d');

  let width = (bgCanvas.width = window.innerWidth);
  let height = (bgCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = bgCanvas.width = window.innerWidth;
    height = bgCanvas.height = window.innerHeight;
  });

  const stars = [];
  const starCount = Math.floor((width * height) / 4500);

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.01 + 0.003,
      growing: Math.random() > 0.5
    });
  }

  const shootingStars = [];
  function createShootingStar() {
    shootingStars.push({
      x: Math.random() * width,
      y: Math.random() * (height * 0.4),
      length: Math.random() * 80 + 40,
      speed: Math.random() * 10 + 6,
      angle: Math.PI / 4,
      alpha: 1
    });
  }

  setInterval(() => {
    if (Math.random() > 0.4) createShootingStar();
  }, 4000);

  const mouse = { x: width / 2, y: height / 2 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const fireflies = [];
  for (let i = 0; i < 25; i++) {
    fireflies.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random()
    });
  }

  function renderBgCanvas() {
    ctx.clearRect(0, 0, width, height);

    for (let star of stars) {
      if (star.growing) {
        star.alpha += star.speed;
        if (star.alpha >= 1) star.growing = false;
      } else {
        star.alpha -= star.speed;
        if (star.alpha <= 0.2) star.growing = true;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#FFFFFF';
      ctx.fill();
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.alpha -= 0.015;

      if (ss.alpha <= 0) {
        shootingStars.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.length, ss.y - Math.sin(ss.angle) * ss.length);
      const gradient = ctx.createLinearGradient(
        ss.x, ss.y,
        ss.x - Math.cos(ss.angle) * ss.length,
        ss.y - Math.sin(ss.angle) * ss.length
      );
      gradient.addColorStop(0, `rgba(255, 215, 0, ${ss.alpha})`);
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    for (let f of fireflies) {
      const dx = mouse.x - f.x;
      const dy = mouse.y - f.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 200) {
        f.vx += (dx / dist) * 0.02;
        f.vy += (dy / dist) * 0.02;
      }

      f.x += f.vx;
      f.y += f.vy;

      f.vx *= 0.98;
      f.vy *= 0.98;

      if (f.x < 0) f.x = width;
      if (f.x > width) f.x = 0;
      if (f.y < 0) f.y = height;
      if (f.y > height) f.y = 0;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${0.4 + Math.sin(Date.now() * 0.003 + f.x) * 0.4})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#EC4899';
      ctx.fill();
    }

    requestAnimationFrame(renderBgCanvas);
  }
  renderBgCanvas();

  // 3. TYPEWRITER ANIMATION
  const typewriterElement = document.getElementById('typewriter-text');
  const roles = ['Coder 💻', 'Dancer 💃', 'Handicraft Lover 🎨', 'Dreamer ✨', 'Multitalented 🌟', 'Best Friend 💙'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function startTypewriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(startTypewriter, typeSpeed);
  }

  // 4. GLOBAL BACKGROUND SONG ENGINE ("MAIN RAHOON YA NA RAHOON")
  const bgAudio = new Audio('assets/audio/main_rahoon_ya_na_rahoon.m4a');
  bgAudio.loop = true;

  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioStatusText = document.getElementById('audio-status-text');
  const vinylRecord = document.getElementById('vinyl-record');
  const favSongAudio = document.getElementById('fav-song-audio');
  const beginJourneyBtn = document.querySelector('a[href="#about"]');

  let isPlayingSong = false;

  function playMainSong() {
    bgAudio.play().then(() => {
      isPlayingSong = true;
      if (audioBtn) audioBtn.classList.add('playing');
      if (audioStatusText) audioStatusText.textContent = "Playing";
      if (vinylRecord) vinylRecord.classList.add('spinning');
    }).catch(err => {
      console.warn("Autoplay blocked by browser until user click:", err);
    });
  }

  function pauseMainSong() {
    bgAudio.pause();
    isPlayingSong = false;
    if (audioBtn) audioBtn.classList.remove('playing');
    if (audioStatusText) audioStatusText.textContent = "Music";
    if (vinylRecord) vinylRecord.classList.remove('spinning');
  }

  function toggleMainSong() {
    if (isPlayingSong) {
      pauseMainSong();
    } else {
      playMainSong();
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', toggleMainSong);
  }

  if (beginJourneyBtn) {
    beginJourneyBtn.addEventListener('click', () => {
      if (!isPlayingSong) playMainSong();
    });
  }

  if (favSongAudio) {
    favSongAudio.addEventListener('play', () => {
      if (!isPlayingSong) {
        isPlayingSong = true;
        if (audioBtn) audioBtn.classList.add('playing');
        if (audioStatusText) audioStatusText.textContent = "Playing";
        if (vinylRecord) vinylRecord.classList.add('spinning');
      }
    });
    favSongAudio.addEventListener('pause', () => {
      if (audioBtn) audioBtn.classList.remove('playing');
      if (audioStatusText) audioStatusText.textContent = "Music";
      if (vinylRecord) vinylRecord.classList.remove('spinning');
    });
  }

  // 5. STARLIGHT BALLOON GARDEN MEMORIES
  const balloonGarden = document.getElementById('balloon-garden');
  const memoryPopModal = document.getElementById('memory-pop-modal');
  const memoryPopImg = document.getElementById('memory-pop-img');
  const memoryPopCaption = document.getElementById('memory-pop-caption');
  const memoryPopPraise = document.getElementById('memory-pop-praise');
  const memoryPopClose = document.getElementById('memory-pop-close');

  const memoriesList = [
    {
      img: 'assets/images/sanskriti_white_top.jpg',
      caption: 'Serene Night & Green Foliage 🌙🌿',
      praise: 'Your presence brings the serene calm of a peaceful starry night. Simply beautiful!'
    },
    {
      img: 'assets/images/sanskriti_pink_dress.jpg',
      caption: 'Blushing Roses & Elegance 🌹✨',
      praise: 'Elegance, poise, and grace shine through you like a blooming rose in starlight.'
    },
    {
      img: 'assets/images/sanskriti_yellow_event.jpg',
      caption: "Stealing the Groom's Shoe! 👟💍",
      praise: 'Never lose that mischievous, fun-loving spark! You bring joy and laughter to everyone.'
    },
    {
      img: 'assets/images/sanskriti_yellow_candid.jpg',
      caption: 'Spontaneous Party Dancing 💃💛',
      praise: 'Your energy and passion are contagious! Dance like the entire universe is watching.'
    },
    {
      img: 'assets/images/sanskriti_yellow_drapes.jpg',
      caption: 'Festive Drapes & Bright Smiles 🎨☀️',
      praise: 'Your smile is brighter than any festive lamp. Keep shining your light!'
    },
    {
      img: 'assets/images/sanskriti_calf.jpg',
      caption: 'Cheek-to-Cheek with the Calf 🐮🤎',
      praise: 'Your gentle, compassionate heart is one of your most beautiful traits.'
    },
    {
      img: 'assets/images/sanskriti_puppy.jpg',
      caption: 'Fluffy Puppy Companions 🐶🍃',
      praise: 'Kind, loving, and friendly to all creatures. You make the world a warmer place.'
    },
    {
      img: 'assets/images/sanskriti_school.jpg',
      caption: 'School Medal & Heritage Statue 🏛️🏅',
      praise: 'A brilliant mind who achieves greatness in everything she sets out to do!'
    },
    {
      img: 'assets/images/sanskriti_portrait.jpg',
      caption: 'Lazy Afternoons & Soft Smiles 🌸',
      praise: 'A beautiful soul inside and out, bringing joy into our lives with just a smile.'
    },
    {
      img: 'assets/images/sanskriti_childhood.jpg',
      caption: 'Little Baby Shivani Sleeping 👶💤',
      praise: 'From a sweet sleeping baby to a multitalented superstar, your journey is magical!'
    }
  ];

  const balloonColors = [
    '#EC4899', // Pink
    '#A855F7', // Purple
    '#F59E0B', // Gold
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#F43F5E', // Rose
    '#F472B6'  // Light Pink
  ];

  // Synthesize Balloon Burst Sound
  function playPopSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.warn("Pop audio context blocked/failed:", e);
    }
  }

  // Exploding Particle Burst Effect
  function createPopParticles(x, y, color) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'burst-particle';
      particle.style.background = color;
      particle.style.boxShadow = `0 0 10px ${color}`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Set random translation directions for explosion
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 85 + 40;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;

      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);

      balloonGarden.appendChild(particle);

      // Clean up particle
      setTimeout(() => particle.remove(), 600);
    }
  }

  // Create Floating Balloons in the Garden
  // Create Floating Balloons in the Garden
  let poppedCount = 0;
  const poppedCountElement = document.getElementById('balloons-popped-count');
  const resetGardenBtn = document.getElementById('reset-garden-btn');

  function createBalloons() {
    if (!balloonGarden) return;
    
    // Clear only old balloon and particle elements, leaving counter and reset button intact
    const existingBalloons = balloonGarden.querySelectorAll('.floating-balloon, .burst-particle');
    existingBalloons.forEach(el => el.remove());

    poppedCount = 0;
    if (poppedCountElement) poppedCountElement.textContent = poppedCount;
    if (resetGardenBtn) resetGardenBtn.style.display = 'none';

    memoriesList.forEach((mem, idx) => {
      const balloon = document.createElement('div');
      balloon.className = 'floating-balloon';

      const color = balloonColors[idx % balloonColors.length];
      balloon.style.backgroundColor = color;
      balloon.style.color = color; // Used for inline currentColor border-triangle reference
      balloon.style.boxShadow = `inset -8px -8px 20px rgba(0,0,0,0.45), 0 10px 30px rgba(${hexToRgb(color)}, 0.45)`;

      // Distribute randomly in container, leaving top clear for counter
      const posX = Math.random() * 82 + 8; // between 8% and 90%
      const posY = Math.random() * 45 + 30; // between 30% and 75%
      balloon.style.left = `${posX}%`;
      balloon.style.top = `${posY}%`;

      // Vary floating speeds
      const duration = Math.random() * 4 + 5; // 5s to 9s
      const delay = Math.random() * -6; // random starting offset
      balloon.style.animationDuration = `${duration}s`;
      balloon.style.animationDelay = `${delay}s`;

      // Add String
      const string = document.createElement('div');
      string.className = 'balloon-string';
      balloon.appendChild(string);

      // Pop interaction
      balloon.addEventListener('click', (e) => {
        playPopSound();

        // Get coordinates relative to balloon garden container
        const rect = balloonGarden.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        createPopParticles(clickX, clickY, color);

        // Remove balloon immediately from garden (no auto-reappear)
        balloon.remove();

        poppedCount++;
        if (poppedCountElement) poppedCountElement.textContent = poppedCount;

        // Show reset button when all 10 are popped
        if (poppedCount === memoriesList.length) {
          setTimeout(() => {
            if (resetGardenBtn) resetGardenBtn.style.display = 'block';
          }, 800);
        }

        // Trigger memory modal after short delay
        setTimeout(() => {
          memoryPopImg.src = mem.img;
          memoryPopCaption.textContent = mem.caption;
          memoryPopPraise.textContent = mem.praise;
          memoryPopModal.classList.add('active');
        }, 250);
      });

      balloonGarden.appendChild(balloon);
    });
  }

  // Helper to convert hex to rgb
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255,255,255';
  }

  // Initialize Balloons
  createBalloons();

  // Reset Garden event listener
  if (resetGardenBtn) {
    resetGardenBtn.addEventListener('click', () => {
      createBalloons();
    });
  }

  // Close Memory Modal Handlers
  if (memoryPopClose) {
    memoryPopClose.addEventListener('click', () => {
      memoryPopModal.classList.remove('active');
    });
  }

  if (memoryPopModal) {
    memoryPopModal.addEventListener('click', (e) => {
      if (e.target === memoryPopModal) {
        memoryPopModal.classList.remove('active');
      }
    });
  }



  // 6. TALENT CARDS (INCLUDES HANDICRAFT LOVER)
  const talentCards = document.querySelectorAll('.talent-card');
  const talentMessages = {
    coder: "Compiling Sanskriti's Code... Status: 100% Bug-Free Magic! 💻✨",
    dancer: "Executing Rhythm Routine... Status: Flawless Grace! 💃🎶",
    handicraft: "Creating Handmade Masterpieces... Status: 100% Artistic Genius & Handicraft Lover! 🎨✨",
    health: "Checking Vitality Status... Status: Radiant Energy & Health! 🍎💚",
    multitalented: "Analyzing All Skills... Status: Infinite Talents Unlocked! ⭐👑"
  };

  talentCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-talent');
      alert(talentMessages[type] || "Supercharged Talent! ⭐");
    });
  });

  // 7. QUOTES CAROUSEL
  const quotesList = [
    "She carried a universe inside her.",
    "Stars shine because darkness exists.",
    "Keep dancing, keep dreaming, and keep surprising the world.",
    "Some friendships arrive quietly and become unforgettable.",
    "May your future be brighter than the stars above.",
    "Never stop being the wonderful person you already are."
  ];

  let currentQuoteIndex = 0;
  const quoteTextElement = document.getElementById('quote-text-element');
  const quoteIndexIndicator = document.getElementById('quote-index-indicator');
  const prevQuoteBtn = document.getElementById('prev-quote-btn');
  const nextQuoteBtn = document.getElementById('next-quote-btn');

  function updateQuote(index) {
    quoteTextElement.style.opacity = 0;
    setTimeout(() => {
      quoteTextElement.textContent = quotesList[index];
      quoteIndexIndicator.textContent = `${index + 1} / ${quotesList.length}`;
      quoteTextElement.style.opacity = 1;
    }, 250);
  }

  prevQuoteBtn.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex - 1 + quotesList.length) % quotesList.length;
    updateQuote(currentQuoteIndex);
  });

  nextQuoteBtn.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotesList.length;
    updateQuote(currentQuoteIndex);
  });

  // 8. FUN CORNER: STARLIGHT FORTUNE CRYSTAL ORB
  const orbTrigger = document.getElementById('crystal-orb-trigger');
  const consultOrbBtn = document.getElementById('consult-orb-btn');
  const fortuneTextBox = document.getElementById('fortune-text-box');

  const starlightFortunes = [
    "🔮 The stars predict: You will master every dance routine effortlessly!",
    "✨ Starlight prophecy: Your next code project will run perfectly on trial 1!",
    "🎨 Starlight prophecy: Your handicraft creations will win hearts everywhere!",
    "👑 Best friend decree: Sanskriti is officially declared the most awesome 15-year-old on earth!",
    "💖 Celestial fortune: Endless laughter and success will follow you all year!"
  ];

  function castFortune() {
    fortuneTextBox.style.opacity = 0;
    setTimeout(() => {
      const fortune = starlightFortunes[Math.floor(Math.random() * starlightFortunes.length)];
      fortuneTextBox.textContent = fortune;
      fortuneTextBox.style.opacity = 1;
    }, 300);
  }

  if (orbTrigger && consultOrbBtn) {
    orbTrigger.addEventListener('click', castFortune);
    consultOrbBtn.addEventListener('click', castFortune);
  }

  const popEmojis = document.querySelectorAll('.pop-emoji');
  popEmojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      emoji.style.transform = 'scale(1.5) rotate(20deg)';
      setTimeout(() => emoji.style.transform = 'scale(1)', 300);
    });
  });

  // 9. WISHES LANTERN CANVAS
  const lanternCanvas = document.getElementById('lantern-canvas');
  const lctx = lanternCanvas.getContext('2d');
  const lanternBox = lanternCanvas.parentElement;

  let lWidth = (lanternCanvas.width = lanternBox.clientWidth);
  let lHeight = (lanternCanvas.height = lanternBox.clientHeight);

  const lanterns = [];
  function createLantern(customText = null) {
    lanterns.push({
      x: Math.random() * (lWidth - 60) + 30,
      y: lHeight + 40,
      vy: Math.random() * 0.8 + 0.5,
      swing: Math.random() * 0.02 + 0.01,
      swingCount: Math.random() * 10,
      text: customText,
      alpha: 1
    });
  }

  for (let i = 0; i < 6; i++) {
    createLantern();
  }

  setInterval(() => {
    if (lanterns.length < 10) createLantern();
  }, 3000);

  function renderLanterns() {
    lctx.clearRect(0, 0, lWidth, lHeight);

    for (let i = lanterns.length - 1; i >= 0; i--) {
      const lan = lanterns[i];
      lan.y -= lan.vy;
      lan.swingCount += lan.swing;
      lan.x += Math.sin(lan.swingCount) * 0.4;

      if (lan.y < -50) {
        lanterns.splice(i, 1);
        continue;
      }

      lctx.save();
      lctx.translate(lan.x, lan.y);

      lctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
      lctx.shadowBlur = 20;
      lctx.shadowColor = '#F59E0B';
      lctx.beginPath();
      lctx.roundRect(-15, -20, 30, 40, 6);
      lctx.fill();

      lctx.fillStyle = '#FFFFFF';
      lctx.beginPath();
      lctx.arc(0, 5, 6, 0, Math.PI * 2);
      lctx.fill();

      if (lan.text) {
        lctx.fillStyle = '#FFFFFF';
        lctx.font = '12px Plus Jakarta Sans';
        lctx.textAlign = 'center';
        lctx.fillText(lan.text, 0, -28);
      }

      lctx.restore();
    }

    requestAnimationFrame(renderLanterns);
  }
  renderLanterns();

  const customWishInput = document.getElementById('custom-wish-input');
  const launchLanternBtn = document.getElementById('launch-lantern-btn');

  launchLanternBtn.addEventListener('click', () => {
    const text = customWishInput.value.trim();
    if (text) {
      createLantern(text);
      customWishInput.value = '';
      alert("🏮 Your wish lantern has been released into the starlit sky!");
    }
  });

  // 10. SECRET STAR MESSAGES
  const secretMessages = {
    '1': "Thank you for being my best friend. 💙",
    '2': "The best memories are still waiting. 🌟",
    '3': "You make ordinary days special. ✨",
    '4': "Stay exactly the way you are. 💫",
    '5': "This website is only a small reminder of how amazing you are. 🌙"
  };

  const secretStarNodes = document.querySelectorAll('.secret-star-node');
  const foundCounterText = document.getElementById('secret-counter-text');
  const starsFoundCountNavbar = document.getElementById('stars-found-count');
  const secretModal = document.getElementById('secret-modal');
  const secretModalMsg = document.getElementById('secret-modal-msg');
  const secretModalClose = document.getElementById('secret-modal-close');
  const secretCounterBtn = document.getElementById('secret-counter-btn');

  const foundStars = new Set();

  secretStarNodes.forEach(node => {
    node.addEventListener('click', () => {
      const id = node.getAttribute('data-id');
      foundStars.add(id);
      node.classList.add('found');

      const count = foundStars.size;
      foundCounterText.textContent = count;
      starsFoundCountNavbar.textContent = count;

      secretModalMsg.textContent = secretMessages[id];
      secretModal.classList.add('active');
    });
  });

  secretModalClose.addEventListener('click', () => {
    secretModal.classList.remove('active');
  });

  secretCounterBtn.addEventListener('click', () => {
    alert(`⭐ Secret Stars Discovered: ${foundStars.size} / 5\nKeep searching the starlit sky!`);
  });

  // 11. FINAL BIRTHDAY CELEBRATION & FIREWORKS
  const confettiCanvas = document.getElementById('confetti-canvas');
  const cctx = confettiCanvas.getContext('2d');
  let cWidth = (confettiCanvas.width = window.innerWidth);
  let cHeight = (confettiCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    cWidth = confettiCanvas.width = window.innerWidth;
    cHeight = confettiCanvas.height = window.innerHeight;
  });

  const confettiParticles = [];
  const confettiColors = ['#EC4899', '#A855F7', '#F59E0B', '#38BDF8', '#FFFFFF'];

  function spawnConfetti() {
    for (let i = 0; i < 150; i++) {
      confettiParticles.push({
        x: Math.random() * cWidth,
        y: Math.random() * cHeight - cHeight,
        size: Math.random() * 8 + 4,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10
      });
    }
  }

  function renderConfetti() {
    cctx.clearRect(0, 0, cWidth, cHeight);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot;

      if (p.y > cHeight) {
        confettiParticles.splice(i, 1);
        continue;
      }

      cctx.save();
      cctx.translate(p.x, p.y);
      cctx.rotate((p.rotation * Math.PI) / 180);
      cctx.fillStyle = p.color;
      cctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      cctx.restore();
    }

    requestAnimationFrame(renderConfetti);
  }
  renderConfetti();

  const celebrationBtn = document.getElementById('trigger-celebration-btn');
  celebrationBtn.addEventListener('click', () => {
    spawnConfetti();
    alert("🎆 Happy 15th Birthday Sanskriti! May all your dreams shine brightly! 🌙✨");
  });

  // 12. NAVBAR SCROLL OBSERVER
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});






const playBtn = document.getElementById("playMusicBtn");
const popup = document.getElementById("music-popup");

playBtn.addEventListener("click", () => {

    playMainSong();      // Existing function

    popup.style.opacity = "0";

    setTimeout(() => {
        popup.style.display = "none";
    }, 500);

});
