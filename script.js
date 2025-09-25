// Futuristic: stars canvas + interactions + i18n
(function(){
  // Starfield
  const c = document.getElementById('stars');
  if (c) {
    const ctx = c.getContext('2d');
    let w, h, stars;
    function resize(){ w = c.width = innerWidth; h = c.height = innerHeight; stars = Array.from({length:120},()=>({x:Math.random()*w,y:Math.random()*h,s:Math.random()*1.5+0.2}))}
    function draw(){ ctx.clearRect(0,0,w,h); ctx.fillStyle = 'rgba(255,255,255,.8)'; for(const st of stars){ ctx.globalAlpha = 0.3 + Math.random()*0.7; ctx.beginPath(); ctx.arc(st.x, st.y, st.s, 0, Math.PI*2); ctx.fill(); } requestAnimationFrame(draw); }
    addEventListener('resize', resize); resize(); draw();
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
      toggle.setAttribute('aria-expanded', nav.classList.contains('show'));
    });
  }

  // Year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // Cards -> dialogs
  document.querySelectorAll('.card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const dlg = document.getElementById(card.getAttribute('data-modal'));
      if (dlg) dlg.showModal();
    });
  });
  document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog')?.close?.()));

  // Gallery lightbox
  const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.glink').forEach(el => el.addEventListener('click', () => { const src = el.getAttribute('data-img'); if (src && lb && lbImg){ lbImg.src = src; lb.showModal(); } }));
  addEventListener('keydown', e => { if (e.key === 'Escape' && lb?.open) lb.close(); });

  // i18n
  const dict = {
    en:{ "nav.sites":"Dive Sites","nav.gallery":"Gallery","nav.contact":"Book Now","hero.title":"Diving from another planet.","hero.cta1":"Explore Dive Sites","hero.cta2":"Plan Your Dive","section.sites":"Dive Sites","section.gallery":"Gallery","section.contact":"Book Your Dive"},
    ru:{ "nav.sites":"Места для дайвинга","nav.gallery":"Галерея","nav.contact":"Бронировать","hero.title":"Дайвинг из другого мира.","hero.cta1":"Смотреть локации","hero.cta2":"Планировать погружение","section.sites":"Места для дайвинга","section.gallery":"Галерея","section.contact":"Забронировать погружение"},
    de:{ "nav.sites":"Tauchplätze","nav.gallery":"Galerie","nav.contact":"Jetzt buchen","hero.title":"Tauchen wie aus einer anderen Welt.","hero.cta1":"Tauchplätze ansehen","hero.cta2":"Tauchgang planen","section.sites":"Tauchplätze","section.gallery":"Galerie","section.contact":"Tauchgang buchen"}
  };
  const lang = document.querySelector('.lang');
  function setLang(code){ document.documentElement.lang = code; const t = dict[code] || dict.en; document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); if (t[k]) el.textContent = t[k]; }); }
  if (lang){ lang.addEventListener('click', e => { const b = e.target.closest('button[data-lang]'); if (!b) return; lang.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x===b?'true':'false')); setLang(b.getAttribute('data-lang')); }); }
  setLang('en');
})();