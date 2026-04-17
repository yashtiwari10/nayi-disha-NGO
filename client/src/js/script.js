/* ===========================
   NAYI DISHA — script.js
   Webathon 2K26 | #WB303
=========================== */
 
// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
 
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
 
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
 
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
 
 
// ===== REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
 
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
 
revealEls.forEach((el, i) => {
  if (el.classList.contains('campaign-card') || el.classList.contains('impact-card')) {
    el.dataset.delay = (i % 4) * 120;
  }
  revealObserver.observe(el);
});
 
 
// ===== PROGRESS BARS =====
const progressFills = document.querySelectorAll('.progress-fill');
 
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
 
progressFills.forEach(el => progressObserver.observe(el));
 
 
// ===== COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  let current = 0;
 
  function update() {
    current += Math.ceil(target / 60);
    if (current >= target) current = target;
    el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
    if (current < target) requestAnimationFrame(update);
  }
 
  update();
}
 
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
 
document.querySelectorAll('.impact-num').forEach(el => counterObserver.observe(el));
 
 
// ===== AMOUNT SELECT =====
const amtBtns = document.querySelectorAll('.amt-btn');
const customAmt = document.getElementById('customAmt');
let selectedAmount = 1000;
 
amtBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amtBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedAmount = parseInt(btn.dataset.val);
    customAmt.value = '';
  });
});
 
customAmt.addEventListener('input', () => {
  amtBtns.forEach(b => b.classList.remove('active'));
  selectedAmount = parseInt(customAmt.value) || 0;
});
 
 
// ===== PAYMENT TOGGLE =====
const upiBtn = document.getElementById('upiBtn');
const cardBtn = document.getElementById('cardBtn');
const upiUI = document.getElementById('upiUI');
const cardUI = document.getElementById('cardUI');
 
upiBtn.onclick = () => {
  upiBtn.classList.add('active');
  cardBtn.classList.remove('active');
  upiUI.classList.remove('hidden');
  cardUI.classList.add('hidden');
};
 
cardBtn.onclick = () => {
  cardBtn.classList.add('active');
  upiBtn.classList.remove('active');
  cardUI.classList.remove('hidden');
  upiUI.classList.add('hidden');
};
 
 
// ===== HELPER FUNCTIONS =====
function setErr(id, msg) {
  document.getElementById(id).textContent = msg;
}
function clearErrs(...ids) {
  ids.forEach(id => document.getElementById(id).textContent = '');
}
 
 
// ===== DONATION FORM =====
document.getElementById('donateSub').addEventListener('click', async () => {
  const name     = document.getElementById('donorName').value.trim();
  const email    = document.getElementById('donorEmail').value.trim();
  const phone    = document.getElementById('donorPhone').value.trim();
  const campaign = document.getElementById('donorCampaign').value;
  const payment  = upiBtn.classList.contains('active') ? 'UPI' : 'Card';

  clearErrs('errName', 'errEmail', 'errPhone', 'errCampaign');
  let valid = true;

  if (!name)                                      { setErr('errName', 'Enter name'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('errEmail', 'Invalid email'); valid = false; }
  if (!/^\d{10}$/.test(phone))                    { setErr('errPhone', 'Invalid phone'); valid = false; }
  if (!campaign)                                  { setErr('errCampaign', 'Select campaign'); valid = false; }
  if (!valid) return;

  try {
    const res = await fetch('http://localhost:5000/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, campaign, amount: selectedAmount, payment })
    });
    const data = await res.json();
    if (data.success) {
      showModal(name, selectedAmount, campaign);
      document.getElementById('donateForm').reset();
      selectedAmount = 1000;
      amtBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('[data-val="1000"]').classList.add('active');
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Could not connect to server. Please try again.');
  }
});
 
 
// ===== VOLUNTEER FORM =====
document.getElementById('volSub').addEventListener('click', async () => {
  const name         = document.getElementById('volName').value.trim();
  const email        = document.getElementById('volEmail').value.trim();
  const phone        = document.getElementById('volPhone').value.trim();
  const city         = document.getElementById('volCity').value.trim();
  const skills       = [...document.querySelectorAll('input[name="skill"]:checked')].map(el => el.value);
  const availability = document.getElementById('volAvail').value;

  clearErrs('verrName', 'verrEmail', 'verrPhone', 'verrCity', 'verrSkill', 'verrAvail');
  let valid = true;

  if (!name)          { setErr('verrName', 'Enter name'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('verrEmail', 'Invalid email'); valid = false; }
  if (!/^\d{10}$/.test(phone)) { setErr('verrPhone', 'Enter valid 10-digit phone'); valid = false; }
  if (!city)          { setErr('verrCity', 'Enter city'); valid = false; }
  if (!skills.length) { setErr('verrSkill', 'Select at least one skill'); valid = false; }
  if (!availability)  { setErr('verrAvail', 'Select availability'); valid = false; }
  if (!valid) return;

  try {
    const res = await fetch('http://localhost:5000/api/volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, city, skills, availability })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('volForm').reset();
      const success = document.getElementById('volSuccess');
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 5000);
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Could not connect to server. Please try again.');
  }
});
 
 
// ===== MODAL =====
function showModal(name, amount, campaign) {
  document.getElementById('modalTitle').textContent = `Thank You, ${name}!`;
  document.getElementById('modalMsg').textContent = `₹${amount.toLocaleString('en-IN')} donated to "${campaign}". Thank you for making a difference! 🙏`;
  document.getElementById('modalOverlay').classList.remove('hidden');
}
 
function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
}
 
 
// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
 
 
// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--green)' : '';
  });
});
 
 
// ===== TYPING ANIMATION =====
const words = ['Better Futures', 'Stronger Communities', 'Lasting Change'];
let wi = 0, ci = 0, deleting = false;
function typeLoop() {
  const word = words[wi];
  document.getElementById('typedText').textContent = deleting
    ? word.substring(0, --ci) : word.substring(0, ++ci);
  if (!deleting && ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();