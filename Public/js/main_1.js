// ── Word Counter ──────────────────────────────────────────
const textarea = document.getElementById('content');
const wordCountEl = document.getElementById('word-count');
const readTimeEl = document.getElementById('read-time');

function updateWordCount() {
  if (!textarea || !wordCountEl) return;
  const text = textarea.value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 200));
  wordCountEl.textContent = words.toLocaleString();
  readTimeEl.textContent = readTime;
}

if (textarea) {
  textarea.addEventListener('input', updateWordCount);
  updateWordCount(); // initialize on edit page
}

// ── Delete Confirmation ───────────────────────────────────
function confirmDelete(e) {
  const confirmed = window.confirm(
    'Delete this post? This cannot be undone.'
  );
  if (!confirmed) e.preventDefault();
  return confirmed;
}

// ── Subtle entrance animations for post cards ─────────────
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.post-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });
});
