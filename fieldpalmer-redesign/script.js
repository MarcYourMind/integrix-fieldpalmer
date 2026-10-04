const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('mobile-open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('.faq button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
});

const modeButtons = document.querySelectorAll('[data-property-mode]');
const searchInput = document.querySelector('#property-location');
let propertyMode = 'sales';
modeButtons.forEach(btn => btn.addEventListener('click', () => {
  modeButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  propertyMode = btn.dataset.propertyMode;
}));
const propertySearch = document.querySelector('#property-search');
if (propertySearch) {
  propertySearch.addEventListener('submit', e => {
    e.preventDefault();
    const base = propertyMode === 'lettings' ? 'https://www.fieldpalmer.com/properties/index?channel=lettings' : 'https://www.fieldpalmer.com/properties/index?channel=sales';
    window.location.href = base;
  });
}

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(enquiryForm);
    const office = data.get('office') || 'general';
    const emailMap = {
      bitterne:'bitterne@fieldpalmer.com',
      shirley:'shirley@fieldpalmer.com',
      woolston:'woolston@fieldpalmer.com',
      lettings:'lettings@fieldpalmer.com',
      block:'blockmanagement@fieldpalmer.com',
      general:'bitterne@fieldpalmer.com'
    };
    const subject = encodeURIComponent(`Website enquiry from ${data.get('name') || 'a customer'}`);
    const body = encodeURIComponent(`Name: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\nPhone: ${data.get('phone') || ''}\n\n${data.get('message') || ''}`);
    const notice = document.querySelector('#form-notice');
    if (notice) notice.classList.add('show');
    setTimeout(() => { window.location.href = `mailto:${emailMap[office]}?subject=${subject}&body=${body}`; }, 450);
  });
}
