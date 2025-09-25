// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', nav.classList.contains('show'));
  });
}
// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Clickable cards -> open dialogs
document.querySelectorAll('.card[data-modal]').forEach(card => {
  card.addEventListener('click', (e) => {
    const id = card.getAttribute('data-modal');
    const dlg = document.getElementById(id);
    if (dlg) dlg.showModal();
  });
  card.querySelectorAll('button').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    const id = card.getAttribute('data-modal');
    const dlg = document.getElementById(id);
    if (dlg) dlg.showModal();
  }));
});

// Close dialog buttons
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('dialog')?.close?.());
});

// Simple lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.glink').forEach(el => {
  el.addEventListener('click', () => {
    const src = el.getAttribute('data-img');
    if (lightbox && lightboxImg && src) {
      lightboxImg.src = src; lightbox.showModal();
    }
  });
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox?.open) lightbox.close(); });
