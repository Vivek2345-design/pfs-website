// Year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Newsletter mock
(() => {
  const form = document.getElementById('newsletterForm');
  const msg = document.getElementById('newsletterMsg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = "Thanks for joining! Stay tuned for updates.";
      form.reset();
    });
  }
})();

// Coaching form mock
(() => {
  const form = document.getElementById('coachingForm');
  const msg = document.getElementById('coachingMsg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = "Thanks! We’ll contact you within 24–48 hours.";
      form.reset();
    });
  }
})();

// Corporate form mock (if present)
(() => {
  const form = document.getElementById('corporateForm');
  const msg = document.getElementById('corporateMsg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = "Inquiry received. Our team will reach out shortly.";
      form.reset();
    });
  }
})();
