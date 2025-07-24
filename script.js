// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.onclick = () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? "🌞" : "🌙";
};

const nav = document.querySelector('header nav');
const navToggle = document.getElementById('nav-toggle');

if (nav && navToggle) {
  navToggle.addEventListener('click', function() {
    nav.classList.toggle('open');
    // Switch between hamburger (☰) and close (✖)
    navToggle.innerHTML = nav.classList.contains('open') ? '&times;' : '&#9776;';
  });

  // Optional: Close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.innerHTML = '&#9776;';
      }
    });
  });
}


// Typing animated roles in hero section
const roles = [
  "Fullstack Developer",
  "Front End Developer",
  "Backend Developer",
  "Python Developer"
];
let roleIndex = 0, charIndex = 0, typing = true;

function typeRole() {
  const roleElement = document.getElementById('dynamic-role');
  if (!roleElement) return;
  if (typing) {
    if (charIndex <= roles[roleIndex].length) {
      roleElement.textContent = "I am " + roles[roleIndex].slice(0, charIndex);
      charIndex++;
      setTimeout(typeRole, 80);
    } else {
      typing = false;
      setTimeout(typeRole, 1200);
    }
  } else {
    if (charIndex > 0) {
      roleElement.textContent = "I am " + roles[roleIndex].slice(0, charIndex - 1);
      charIndex--;
      setTimeout(typeRole, 33);
    } else {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 460);
    }
  }
}
window.addEventListener('DOMContentLoaded', typeRole);

// Bounce arrow smooth scroll
document.querySelector('.down-arrow').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Animated section reveal on scroll (replay on every view)
function revealOnScroll() {
  document.querySelectorAll('section, .project').forEach(el => {
    const windowHeight = window.innerHeight;
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
      if (!el.classList.contains('visible')) {
        el.classList.remove('visible'); // remove if already present
        void el.offsetWidth; // reflow to restart animation
        el.classList.add('visible');
      }
    } else {
      if (el.classList.contains('visible')) el.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Projects dynamic rendering
const projects = [
  {
    title: "Amazon Clone",
    img: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
    desc: "An Amazon clone built with modern web technologies, replicating the core functionalities of the Amazon e-commerce platform. This project is designed for educational purposes, demonstrating how to build a scalable, responsive, and dynamic e-commerce application.",
    tech: "HTML, CSS, JavaScript",
    link: "https://ravulavishnuvardhan.github.io/Amazon-Clone/"
  },
  {
    title: "Ichiraku Ramen Website",
    img: "https://ravulavishnuvardhan.github.io/Ichiraku_Ramen/Ramen_Bowl.gif",
    desc: "Designed a fictional restaurant site themed on Naruto's anime universe. Built responsive menu pages, gallery sections, and contact forms. Emphasized aesthetic/anime-inspired UI/UX.",
    tech: "HTML, CSS, JavaScript",
    link: "https://ravulavishnuvardhan.github.io/Ichiraku_Ramen/"
  }
];

const gallery = document.querySelector('.project-gallery');
if (gallery) {
  projects.forEach(proj => {
    const div = document.createElement('div');
    div.className = "project";
    div.innerHTML = `
      <img src="${proj.img}" alt="${proj.title}">
      <h3>${proj.title}</h3>
      <p>${proj.desc}</p>
      <span><b>Technologies:</b> ${proj.tech}</span>
      ${proj.link !== "#" ? `<a href="${proj.link}" target="_blank">View Project</a>` : ''}
    `;
    gallery.appendChild(div);
  });
}

// Skills rendering & animated bar
const skills = [
  {name: "HTML", level: 90},
  {name: "CSS", level: 85},
  {name: "JavaScript", level: 80},
  {name: "ReactJS", level: 80},
  {name: "Bootstrap", level: 90},
  {name: "Python", level: 85},
  {name: "Django", level: 80},
  {name: "SQL", level: 85},
  {name: "MySQL", level: 85}
];

const skillsBar = document.querySelector('.skills-bar');
if (skillsBar) {
  skills.forEach(skill => {
    const skillDiv = document.createElement('div');
    skillDiv.className = "skill";
    skillDiv.innerHTML = `
      <span>${skill.name}</span>
      <div class="skill-bar"><div class="skill-bar-fill"></div></div>
      <span>${skill.level}%</span>
    `;
    skillsBar.appendChild(skillDiv);
  });
}

// Animate skills when skills section enters view
function animateSkills() {
  const skillsSection = document.querySelector('#skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
  document.querySelectorAll('.skill-bar-fill').forEach((el, i) => {
    el.style.width = inView ? (skills[i].level + '%') : '0%';
  });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Contact Form client-side feedback
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');
if (contactForm && formResult) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formResult.textContent = "Thank you for contacting me! I will respond soon.";
    contactForm.reset();
  });
}
