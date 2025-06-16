// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Modal logic
function createModal(content) {
  const modalBg = document.createElement('div');
  modalBg.className = 'designo-modal-bg';
  modalBg.innerHTML = `<div class="designo-modal"><span class="modal-close">&times;</span>${content}</div>`;
  document.body.appendChild(modalBg);
  document.body.style.overflow = 'hidden';
  modalBg.querySelector('.modal-close').onclick = () => {
    modalBg.remove();
    document.body.style.overflow = '';
  };
  modalBg.onclick = (e) => {
    if (e.target === modalBg) {
      modalBg.remove();
      document.body.style.overflow = '';
    }
  };
}

// Service card modals
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    const title = card.querySelector('.service-title').textContent;
    const desc = card.querySelector('.service-desc').textContent;
    createModal(`<h3>${title}</h3><p>${desc}</p>`);
  });
});

// Portfolio modals
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const img = item.querySelector('img');
    const caption = item.querySelector('span').textContent;
    createModal(`<img src="${img.src}" alt="${caption}" style="width:100%;border-radius:12px;margin-bottom:1rem;"><h3>${caption}</h3>`);
  });
});

// Contact form success message
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    createModal('<h3>Thank you!</h3><p>Your message has been sent. We will get back to you soon.</p>');
    contactForm.reset();
  });
}

// Modal styles
const modalStyle = document.createElement('style');
modalStyle.innerHTML = `
.designo-modal-bg {
  position: fixed; top:0; left:0; right:0; bottom:0;
  background: rgba(30,22,15,0.55); z-index: 9999;
  display: flex; align-items: center; justify-content: center;
}
.designo-modal {
  background: #fff; color: #1e160f; border-radius: 18px;
  max-width: 90vw; min-width: 280px; max-height: 90vh; overflow-y: auto;
  box-shadow: 0 8px 40px rgba(30,22,15,0.18);
  padding: 2.2rem 2rem 1.7rem 2rem; position: relative;
  font-family: 'Inter', sans-serif;
  text-align: center;
}
.designo-modal h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 1rem; }
.designo-modal p { font-size: 1.08rem; }
.modal-close {
  position: absolute; top: 1rem; right: 1.3rem; font-size: 2rem; color: #e0cba8; cursor: pointer; font-weight: bold;
}
@media (max-width: 700px) {
  .designo-modal { padding: 1.2rem 0.7rem 1.2rem 0.7rem; }
}
`;
document.head.appendChild(modalStyle);

// Add animation to feature cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
}); 