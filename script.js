const phrases = [
  "Machine Learning Engineer",
  "Backend Developer",
  "Database Enthusiast",
  "Always Learning New Things!",
];

const typingText = document.getElementById("typingText");
const yearEl = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const type = () => {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typingText.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1400);
      return;
    }
  } else {
    typingText.textContent = current.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, isDeleting ? 45 : 85);
};

type();
yearEl.textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach((el) => observer.observe(el));

const toggleTheme = () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "🌙" : "✨";
  localStorage.setItem("theme", isLight ? "light" : "dark");
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", toggleTheme);
