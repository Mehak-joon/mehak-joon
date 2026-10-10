/**
 * Mehak Joon Portfolio - Interactive JavaScript
 * Features:
 *  - Theme Toggle (Dark / Light Mode with localStorage persistence)
 *  - Responsive Navigation & Mobile Menu Drawer
 *  - Active Section Link Highlight on Scroll
 *  - Contact Form Client-side Validation (Email format & required checks)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Dark / Light Theme Toggle
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Check saved preference or default to light
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ==========================================
  // 2. Responsive Mobile Navigation
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 3. Active Nav Link on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // ==========================================
  // 4. Contact Form Validation
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Email format validator regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  function setFieldError(input, errorElement, message) {
    const wrapper = input.closest('.input-wrapper');
    if (wrapper) {
      wrapper.classList.add('input-error');
      wrapper.classList.remove('input-success');
    }
    if (errorElement) {
      errorElement.textContent = message;
    }
    return false;
  }

  function clearFieldError(input, errorElement) {
    const wrapper = input.closest('.input-wrapper');
    if (wrapper) {
      wrapper.classList.remove('input-error');
      wrapper.classList.add('input-success');
    }
    if (errorElement) {
      errorElement.textContent = '';
    }
    return true;
  }

  // Validate Name
  function validateName() {
    const val = nameInput.value.trim();
    if (!val) {
      return setFieldError(nameInput, nameError, 'Name is required.');
    }
    if (val.length < 2) {
      return setFieldError(nameInput, nameError, 'Name must be at least 2 characters.');
    }
    return clearFieldError(nameInput, nameError);
  }

  // Validate Email
  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      return setFieldError(emailInput, emailError, 'Email address is required.');
    }
    if (!emailRegex.test(val)) {
      return setFieldError(emailInput, emailError, 'Please enter a valid email address (e.g. name@domain.com).');
    }
    return clearFieldError(emailInput, emailError);
  }

  // Validate Subject
  function validateSubject() {
    const val = subjectInput.value.trim();
    if (!val) {
      return setFieldError(subjectInput, subjectError, 'Subject is required.');
    }
    if (val.length < 3) {
      return setFieldError(subjectInput, subjectError, 'Subject must be at least 3 characters.');
    }
    return clearFieldError(subjectInput, subjectError);
  }

  // Validate Message
  function validateMessage() {
    const val = messageInput.value.trim();
    if (!val) {
      return setFieldError(messageInput, messageError, 'Message cannot be empty.');
    }
    if (val.length < 10) {
      return setFieldError(messageInput, messageError, 'Message must be at least 10 characters long.');
    }
    return clearFieldError(messageInput, messageError);
  }

  // Real-time blur and input event validation
  if (nameInput) {
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => {
      if (nameInput.closest('.input-wrapper').classList.contains('input-error')) {
        validateName();
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.closest('.input-wrapper').classList.contains('input-error')) {
        validateEmail();
      }
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', validateSubject);
    subjectInput.addEventListener('input', () => {
      if (subjectInput.closest('.input-wrapper').classList.contains('input-error')) {
        validateSubject();
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
      if (messageInput.closest('.input-wrapper').classList.contains('input-error')) {
        validateMessage();
      }
    });
  }

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        // Show error alert
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please fix the errors highlighted above before submitting.';
          formAlert.classList.remove('hidden');
        }

        // Focus first invalid field
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isSubjectValid) subjectInput.focus();
        else if (!isMessageValid) messageInput.focus();

        return;
      }

      // If all valid, simulate submission
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      submitBtn.disabled = true;
      if (btnText) btnText.classList.add('hidden');
      if (btnSpinner) btnSpinner.classList.remove('hidden');

      setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText) btnText.classList.remove('hidden');
        if (btnSpinner) btnSpinner.classList.add('hidden');

        // Show success alert
        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${nameInput.value.trim()}! Your message has been sent successfully. Mehak will get back to you soon.`;
          formAlert.classList.remove('hidden');
        }

        // Reset form fields
        contactForm.reset();
        document.querySelectorAll('.input-wrapper').forEach(wrapper => {
          wrapper.classList.remove('input-success');
          wrapper.classList.remove('input-error');
        });

        // Hide alert after 6 seconds
        setTimeout(() => {
          if (formAlert) formAlert.classList.add('hidden');
        }, 6000);
      }, 1000);
    });
  }
});
