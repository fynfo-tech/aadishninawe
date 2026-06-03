
const isMobile = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;

const nameTarget = document.getElementById('typedName');
const fullName = 'Aadish Ninawe';
let nameIndex = 0;

function typeName() {
  if (!nameTarget) return;

  if (nameIndex <= fullName.length) {
    nameTarget.textContent = fullName.slice(0, nameIndex);
    nameIndex++;
    setTimeout(typeName, isMobile ? 80 : 110);
  }
}
window.addEventListener('load', typeName);

const yearTarget = document.getElementById('year');
if (yearTarget) yearTarget.textContent = new Date().getFullYear();

const progressBar = document.getElementById('progressBar');
let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (!progressBar || scrollTicking) return;

  scrollTicking = true;
  requestAnimationFrame(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
    scrollTicking = false;
  });
}, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: isMobile ? 0.08 : 0.18 });

revealElements.forEach(el => observer.observe(el));

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove('active');
    }
  });
}

/*
  Desktop keeps premium effects.
  Mobile skips heavy effects that cause lag:
  cursor glow, 3D tilt, magnetic movement, and particles.
*/
if (!isMobile) {
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    window.addEventListener('pointermove', (event) => {
      cursorGlow.animate(
        { left: `${event.clientX}px`, top: `${event.clientY}px` },
        { duration: 500, fill: 'forwards' }
      );
    }, { passive: true });
  }

  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 12;
      const rotateX = ((y / rect.height) - 0.5) * -12;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  const magneticItems = document.querySelectorAll('.magnetic');
  magneticItems.forEach(item => {
    item.addEventListener('mousemove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0, 0)';
    });
  });

  const particleLayer = document.getElementById('particleLayer');
  const particleCount = 26;
  if (particleLayer) {
    for (let i = 0; i < particleCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'particle';
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.animationDuration = `${8 + Math.random() * 12}s`;
      dot.style.animationDelay = `${Math.random() * 10}s`;
      dot.style.opacity = `${0.25 + Math.random() * 0.55}`;
      particleLayer.appendChild(dot);
    }
  }
}
