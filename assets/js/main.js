/**
 * Aura Photography — Main JavaScript
 * Handles: dark mode, navbar scroll, form validation,
 * portfolio/blog filters, countdown timer
 */

(function () {
  'use strict';

  /* --- Dark Mode Toggle --- */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const THEME_KEY = 'aura-theme-v2';
  const LEGACY_THEME_KEY = 'aura-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    const legacy = localStorage.getItem(LEGACY_THEME_KEY);
    if (legacy === 'dark') {
      localStorage.setItem(THEME_KEY, legacy);
      return legacy;
    }
    return 'dark';
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = htmlEl.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* --- RTL Toggle --- */
  const rtlToggle = document.getElementById('rtlToggle');

  if (rtlToggle) {
    rtlToggle.addEventListener('click', function () {
      const isRtl = htmlEl.getAttribute('dir') === 'rtl';
      htmlEl.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
      htmlEl.setAttribute('lang', isRtl ? 'en' : 'ar');
      rtlToggle.setAttribute('aria-label', isRtl ? 'Switch to RTL layout' : 'Switch to LTR layout');
    });
  }

  /* --- Navbar Scroll Effect --- */
  const navbar = document.getElementById('mainNav');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-transparent');
    } else if (navbar.classList.contains('navbar-hero')) {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.add('navbar-transparent');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* --- Portfolio / Blog Filter Tabs --- */
  const filterContainers = document.querySelectorAll('[data-filter-group]');

  filterContainers.forEach(function (container) {
    const buttons = container.querySelectorAll('.filter-btn');
    const targetSelector = container.getAttribute('data-filter-target');
    const items = document.querySelectorAll(targetSelector);

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        items.forEach(function (item) {
          const category = item.getAttribute('data-category');
          const isPlaceholder = item.getAttribute('data-placeholder') === 'true';
          if ((filter === 'all' && !isPlaceholder) || category === filter) {
            item.style.display = '';
            item.removeAttribute('hidden');
          } else {
            item.style.display = 'none';
            item.setAttribute('hidden', '');
          }
        });
      });
    });
  });

  /* --- Clickable Blog Cards --- */
  document.querySelectorAll('.blog-card[data-href]').forEach(function (card) {
    const targetHref = card.getAttribute('data-href');
    if (!targetHref) return;

    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', function (event) {
      if (event.target.closest('a, button, input, textarea, select, label')) return;
      window.location.href = targetHref;
    });

    card.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      window.location.href = targetHref;
    });
  });

  /* --- Form Validation (Booking Enquiry) --- */
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      let isValid = true;

      const fields = bookingForm.querySelectorAll('[required]');
      fields.forEach(function (field) {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      const emailField = bookingForm.querySelector('[type="email"]');
      if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address.');
        isValid = false;
      }

      const phoneField = bookingForm.querySelector('[name="phone"]');
      if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
        showError(phoneField, 'Please enter a valid phone number.');
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
      }
    });

    bookingForm.querySelectorAll('[required], [type="email"], [name="phone"]').forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
        if (field.type === 'email' && field.value) {
          isValidEmail(field.value) ? clearError(field) : showError(field, 'Please enter a valid email address.');
        }
        if (field.name === 'phone' && field.value) {
          isValidPhone(field.value) ? clearError(field) : showError(field, 'Please enter a valid phone number.');
        }
      });

      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) {
          validateField(field);
        }
      });
    });
  }

  function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
      showError(field, 'This field is required.');
      return false;
    }
    clearError(field);
    return true;
  }

  function showError(field, message) {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    let feedback = field.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      field.parentElement.appendChild(feedback);
    }
    feedback.textContent = message;
  }

  function clearError(field) {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\-+()]{7,20}$/.test(phone);
  }

  /* --- Newsletter Form (client-side email check) --- */
  const newsletterForm = document.getElementById('newsletterForm');

  function isUnconfiguredEndpoint(url) {
    if (!url) return true;
    return /YOUR-DOMAIN|YOUR_USER_ID|YOUR_LIST_ID|#$/i.test(url);
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      const emailInput = newsletterForm.querySelector('[type="email"]');
      if (emailInput && !isValidEmail(emailInput.value)) {
        e.preventDefault();
        emailInput.classList.add('is-invalid');
        return;
      }

      // Guard against submitting to a subscribe endpoint/route that isn't
      // configured or reachable. Instead of letting the browser open a
      // blank/broken tab, send the visitor to the site's 404 page.
      const action = newsletterForm.getAttribute('action');
      if (isUnconfiguredEndpoint(action)) {
        e.preventDefault();
        const inPagesDir = /\/pages\/[^/]*$/.test(window.location.pathname);
        window.location.href = inPagesDir ? '404.html' : 'pages/404.html';
      }
    });
  }

  /* --- Countdown Timer (Coming Soon Page) --- */
  const countdownEl = document.getElementById('countdown');

  if (countdownEl) {
    const targetDate = new Date('2026-09-01T00:00:00').getTime();

    function updateCountdown() {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p class="h4">We\'re Live!</p>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownEl.innerHTML =
        '<div class="countdown-item"><span class="number">' + days + '</span><span class="label">Days</span></div>' +
        '<div class="countdown-item"><span class="number">' + hours + '</span><span class="label">Hours</span></div>' +
        '<div class="countdown-item"><span class="number">' + minutes + '</span><span class="label">Minutes</span></div>' +
        '<div class="countdown-item"><span class="number">' + seconds + '</span><span class="label">Seconds</span></div>';
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* --- Set active nav link based on current page --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* --- Shared Authentication Flow --- */
  const AUTH_SESSION_KEY = 'aura-auth-session';
  const USERS_KEY = 'aura-registered-users';
  const adminCreds = {
    email: 'admin@auraphotography.com',
    passwordHashes: [
      'sha256$356345f3ff7b96b31e9b5f218575b77d8b89b68f3738bab1a69e5f66c61399e6',
      'local$QXVyYUAxMjM='
    ],
    name: 'Admin',
    role: 'admin'
  };

  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function getRegisteredUsers() {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      return Array.isArray(users) ? users : [];
    } catch (error) {
      return [];
    }
  }

  function saveRegisteredUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function bytesToHex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
      return byte.toString(16).padStart(2, '0');
    }).join('');
  }

  async function createPasswordHash(password) {
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
      const data = new TextEncoder().encode(password);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return 'sha256$' + bytesToHex(digest);
    }
    return 'local$' + btoa(unescape(encodeURIComponent(password)));
  }

  async function passwordMatches(user, password) {
    if (!user) return false;
    if (user.passwordHash) return user.passwordHash === await createPasswordHash(password);
    return user.password === password;
  }

  function hasValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
  }

  function getCurrentSession() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY) || 'null');
    } catch (error) {
      return null;
    }
  }

  function setAuthSession(session) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  }

  function clearAuthSession() {
    localStorage.removeItem(AUTH_SESSION_KEY);
  }

  function showAuthMessage(message, type, targetId) {
    const messageBox = document.getElementById(targetId || 'loginMessage');
    if (!messageBox) return;
    messageBox.innerHTML = '<div class="alert alert-' + type + ' py-2 mb-0">' + message + '</div>';
  }

  function buildUserSession(user) {
    return {
      userId: user.userId || user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt || null,
      role: 'user'
    };
  }

  function getRegisteredUserByEmail(email) {
    const normalizedEmail = normalizeEmail(email);
    return getRegisteredUsers().find(function (user) {
      return normalizeEmail(user.email) === normalizedEmail;
    }) || null;
  }

  function formatJoinDate(dateValue) {
    if (!dateValue) return 'Recently joined';
    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) return 'Recently joined';
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function ensureAuthButton() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const navActions = navbar.querySelector('.navbar-auth, .nav-auth-links');
    if (!navActions) return;

    const session = getCurrentSession();

    const existingWrapper = navActions.querySelector('.auth-wrapper');
    if (existingWrapper) existingWrapper.remove();

    // Clean up any static auth links (register/login/dashboard/book now)
    navActions.querySelectorAll('a, button').forEach(function (el) {
      const txt = (el.textContent || '').trim().toLowerCase();
      if (txt === 'register' || txt === 'dashboard' || txt === 'login' || txt === 'logout' || txt === 'book now' || txt === 'book') el.remove();
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'auth-wrapper d-flex align-items-center';

    if (!session) {
      const loginLink = document.createElement('a');
      loginLink.href = 'login.html';
      loginLink.className = 'btn-login-modern auth-nav-btn ms-lg-2 d-inline-flex';
      loginLink.setAttribute('data-auth-link', 'true');
      loginLink.setAttribute('aria-label', 'Login to your account');
      loginLink.innerHTML = '<i class="fas fa-sign-in-alt" aria-hidden="true"></i><span>Login</span>';

      wrapper.appendChild(loginLink);
      navActions.appendChild(wrapper);
      return;
    }

    const displayName = session.name || 'User';
    const dashboardHref = session.role === 'admin' ? '../admin/dashboard.html' : 'dashboard.html';
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.innerHTML = `
      <button class="btn-aura btn-aura-outline auth-nav-btn ms-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fas fa-user-circle me-2" aria-hidden="true"></i><span class="auth-username">${displayName}</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="${dashboardHref}">Dashboard</a></li>
        <li><button class="dropdown-item" id="logoutBtn">Logout</button></li>
      </ul>
    `;

    wrapper.appendChild(dropdown);
    navActions.appendChild(wrapper);

    const logoutBtn = wrapper.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        clearAuthSession();
        window.location.href = 'login.html';
      });
    }
  }

  ensureAuthButton();

  function protectUserDashboard() {
    if (currentPage !== 'dashboard.html') return;
    const session = getCurrentSession();
    if (!session) {
      window.location.href = 'login.html';
      return;
    }
    if (session.role === 'admin') {
      window.location.href = '../admin/dashboard.html';
      return;
    }
    const nameTargets = document.querySelectorAll('[data-auth-name]');
    nameTargets.forEach(function (target) {
      target.textContent = session.name || 'User';
    });

    const initialTargets = document.querySelectorAll('[data-auth-initial]');
    initialTargets.forEach(function (target) {
      target.textContent = (session.name || 'User').trim().charAt(0).toUpperCase() || 'U';
    });

    const emailTargets = document.querySelectorAll('[data-auth-email]');
    emailTargets.forEach(function (target) {
      target.textContent = session.email || 'you@example.com';
    });

    const registeredUser = getRegisteredUserByEmail(session.email);
    const joinDate = formatJoinDate(session.createdAt || (registeredUser && registeredUser.createdAt));
    const joinDateTargets = document.querySelectorAll('[data-auth-join-date]');
    joinDateTargets.forEach(function (target) {
      target.textContent = joinDate;
    });
  }

  protectUserDashboard();

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const emailInput = document.getElementById('loginEmail');
      const passwordInput = document.getElementById('loginPassword');
      const email = (emailInput ? emailInput.value : '').trim();
      const password = passwordInput ? passwordInput.value : '';

      if (!email || !password) {
        showAuthMessage('Please enter both email and password.', 'danger');
        return;
      }

      if (!isValidEmail(email)) {
        showAuthMessage('Please enter a valid email address.', 'danger');
        return;
      }

      const normalizedEmail = normalizeEmail(email);
      const isAdmin = (normalizedEmail === adminCreds.email && adminCreds.passwordHashes.indexOf(await createPasswordHash(password)) !== -1);
      if (isAdmin) {
        setAuthSession({ userId: 'admin', email: adminCreds.email, name: adminCreds.name, role: adminCreds.role });
        showAuthMessage('Admin login successful. Redirecting to dashboard...', 'success');
        window.setTimeout(function () {
          window.location.href = '../admin/dashboard.html';
        }, 600);
        return;
      }

      const users = getRegisteredUsers();
      const user = users.find(function (item) {
        return normalizeEmail(item.email) === normalizedEmail;
      });

      if (!user || !await passwordMatches(user, password)) {
        clearAuthSession();
        showAuthMessage('Invalid email or password.', 'danger');
        return;
      }

      setAuthSession(buildUserSession(user));
      showAuthMessage('Login successful. Redirecting to dashboard...', 'success');
      window.setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 600);
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const nameInput = document.getElementById('registerName');
      const emailInput = document.getElementById('registerEmail');
      const passwordInput = document.getElementById('registerPassword');
      const name = (nameInput ? nameInput.value : '').trim();
      const email = (emailInput ? emailInput.value : '').trim();
      const password = passwordInput ? passwordInput.value : '';
      const normalizedEmail = normalizeEmail(email);

      if (!name || !email || !password) {
        showAuthMessage('Please complete all fields.', 'danger', 'registerMessage');
        return;
      }

      if (!isValidEmail(email)) {
        showAuthMessage('Please enter a valid email address.', 'danger', 'registerMessage');
        return;
      }

      if (normalizedEmail === adminCreds.email) {
        showAuthMessage('Email already exists.', 'danger', 'registerMessage');
        return;
      }

      if (!hasValidPassword(password)) {
        showAuthMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.', 'danger', 'registerMessage');
        return;
      }

      const users = getRegisteredUsers();
      const exists = users.some(function (user) {
        return normalizeEmail(user.email) === normalizedEmail;
      });

      if (exists) {
        showAuthMessage('Email already exists.', 'danger', 'registerMessage');
        return;
      }

      users.push({
        userId: 'user-' + Date.now(),
        name: name,
        email: normalizedEmail,
        passwordHash: await createPasswordHash(password),
        createdAt: new Date().toISOString(),
        role: 'user'
      });
      saveRegisteredUsers(users);
      showAuthMessage('Registration successful. Please log in.', 'success', 'registerMessage');
      registerForm.reset();
      window.setTimeout(function () {
        window.location.href = 'login.html';
      }, 800);
    });
  }

})();
