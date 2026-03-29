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

// ── Dark Mode Toggle ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const htmlElement = document.documentElement;
  const body = document.body;

  // Check for saved dark mode preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkMode = savedTheme === 'dark' || (savedTheme === null && prefersDark);

  // Apply saved theme on page load
  if (isDarkMode) {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  }

  // Toggle dark mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const isCurrentlyDark = body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isCurrentlyDark ? 'dark' : 'light');
      updateThemeIcon(isCurrentlyDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (themeIcon) {
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
  }
});
