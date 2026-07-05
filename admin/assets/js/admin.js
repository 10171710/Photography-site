(function () {
  'use strict';

  /* --- LocalStorage Image & Database Migration --- */
  (function () {
    const keys = [
      'aura-admin-settings',
      'aura-admin-portfolio',
      'aura-admin-services',
      'aura-admin-testimonials',
      'aura-admin-team',
      'aura-admin-blog'
    ];
    try {
      const portVal = localStorage.getItem('aura-admin-portfolio');
      if (portVal) {
        const portArr = JSON.parse(portVal);
        if (Array.isArray(portArr) && portArr.length < 10) {
          localStorage.removeItem('aura-admin-portfolio');
        }
      }
    } catch(e) {}
    try {
      const blogVal = localStorage.getItem('aura-admin-blog');
      if (blogVal) {
        const blogArr = JSON.parse(blogVal);
        if (Array.isArray(blogArr) && blogArr.length < 3) {
          localStorage.removeItem('aura-admin-blog');
        }
      }
    } catch(e) {}
    try {
      const servicesVal = localStorage.getItem('aura-admin-services');
      if (servicesVal) {
        const servicesArr = JSON.parse(servicesVal);
        if (Array.isArray(servicesArr)) {
          const needsMigration = servicesArr.length < 6 || servicesArr.some(function (item) { return !item.image; });
          if (needsMigration) {
            localStorage.removeItem('aura-admin-services');
          }
        }
      }
    } catch (e) {}

    keys.forEach(function (key) {
      try {
        let val = localStorage.getItem(key);
        if (val) {
          let updated = false;
          if (val.indexOf('family1.jpg') !== -1) {
            val = val.replace(/family1\.jpg/g, 'family1_revised.jpg');
            updated = true;
          }
          if (val.indexOf('family5.jpg') !== -1) {
            val = val.replace(/family5\.jpg/g, 'family5_revised.jpg');
            updated = true;
          }
          if (val.indexOf('outdoor2.jpg') !== -1) {
            val = val.replace(/outdoor2\.jpg/g, 'outdoor2_revised.jpg');
            updated = true;
          }
          if (val.indexOf('outdoor4.jpg') !== -1) {
            val = val.replace(/outdoor4\.jpg/g, 'outdoor4_revised.jpg');
            updated = true;
          }
          if (updated) {
            localStorage.setItem(key, val);
          }
        }
      } catch (e) {}
    });
  })();

  const STORAGE_KEYS = {
    auth: 'aura-auth-session',
    settings: 'aura-admin-settings',
    bookings: 'aura-admin-bookings',
    customers: 'aura-admin-customers',
    portfolio: 'aura-admin-portfolio',
    gallery: 'aura-admin-gallery',
    services: 'aura-admin-services',
    testimonials: 'aura-admin-testimonials',
    team: 'aura-admin-team',
    blog: 'aura-admin-blog',
    messages: 'aura-admin-messages',
    users: 'aura-admin-users',
    profile: 'aura-admin-profile'
  };

  const adminCreds = {
    email: 'admin@auraphotography.com',
    passwordHashes: [
      'sha256$356345f3ff7b96b31e9b5f218575b77d8b89b68f3738bab1a69e5f66c61399e6',
      'local$QXVyYUAxMjM='
    ],
    name: 'Admin',
    role: 'admin'
  };

  const sampleData = {
    bookings: [
      { id: 1, customer: 'Ava Thompson', email: 'ava@example.com', service: 'Wedding Photography', date: '2026-07-14', status: 'Confirmed', amount: 2800, note: 'Garden venue' },
      { id: 2, customer: 'Noah Carter', email: 'noah@example.com', service: 'Family Portraits', date: '2026-07-18', status: 'Pending', amount: 350, note: 'Central Park' },
      { id: 3, customer: 'Mina Brooks', email: 'mina@example.com', service: 'Corporate Headshots', date: '2026-07-20', status: 'Completed', amount: 250, note: 'Studio session' }
    ],
    customers: [
      { id: 1, name: 'Ava Thompson', email: 'ava@example.com', phone: '+1 555 0101', plan: 'Wedding', status: 'VIP' },
      { id: 2, name: 'Noah Carter', email: 'noah@example.com', phone: '+1 555 0102', plan: 'Family', status: 'New' }
    ],
    portfolio: [
      { id: 1, title: 'Golden Hour Family', category: 'family', image: '../assets/images/portfolio/family/family1_revised.jpg', description: 'Golden hour family portraits' },
      { id: 2, title: 'Studio Family Session', category: 'family', image: '../assets/images/portfolio/family/family2.jpg', description: 'Warm studio family portrait' },
      { id: 3, title: 'Cozy Family Moment', category: 'family', image: '../assets/images/portfolio/family/family3.jpg', description: 'Cozy indoor family session' },
      { id: 4, title: 'Family Outdoors', category: 'family', image: '../assets/images/portfolio/family/family4.jpg', description: 'Family portrait in nature' },
      { id: 5, title: 'Beachside Family', category: 'family', image: '../assets/images/portfolio/family/family5_revised.jpg', description: 'Relaxed beach family portrait' },
      { id: 6, title: 'Newborn in Basket', category: 'newborn', image: '../assets/images/portfolio/newborn/newborn1.jpg', description: 'Newborn baby in soft basket' },
      { id: 7, title: 'Parents with Newborn', category: 'newborn', image: '../assets/images/portfolio/newborn/newborn2.jpg', description: 'Newborn cuddled by parents' },
      { id: 8, title: 'Quiet Newborn Moment', category: 'newborn', image: '../assets/images/portfolio/newborn/newborn3.jpg', description: 'Soft newborn portrait' },
      { id: 9, title: 'Peaceful Newborn Session', category: 'newborn', image: '../assets/images/portfolio/newborn/newborn4.jpg', description: 'Peaceful newborn lifestyle portrait' },
      { id: 10, title: 'Dreamy Newborn Portrait', category: 'newborn', image: '../assets/images/portfolio/newborn/newborn5.jpg', description: 'Dreamy newborn details' },
      { id: 11, title: 'Executive Portrait', category: 'corporate', image: '../assets/images/portfolio/corporate/corporate1.jpg', description: 'Corporate branding portrait' },
      { id: 12, title: 'Office Headshot', category: 'corporate', image: '../assets/images/portfolio/corporate/corporate2.jpg', description: 'Professional office portrait' },
      { id: 13, title: 'Brand Story Session', category: 'corporate', image: '../assets/images/portfolio/corporate/corporate3.jpg', description: 'Brand storytelling session' },
      { id: 14, title: 'Creative Corporate Portrait', category: 'corporate', image: '../assets/images/portfolio/corporate/corporate4.jpg', description: 'Modern executive portrait' },
      { id: 15, title: 'Team Collaboration', category: 'corporate', image: '../assets/images/portfolio/corporate/corporate5.jpg', description: 'Collaborative corporate session' },
      { id: 16, title: 'Elegant Wedding Couple', category: 'weddings', image: '../assets/images/portfolio/weddings/wedding1.jpg', description: 'Elegant wedding portrait' },
      { id: 17, title: 'Romantic Wedding Portrait', category: 'weddings', image: '../assets/images/portfolio/weddings/wedding2.jpg', description: 'Romantic wedding capture' },
      { id: 18, title: 'Wedding Details', category: 'weddings', image: '../assets/images/portfolio/weddings/wedding3.jpg', description: 'Wedding day details' },
      { id: 19, title: 'Sunset Wedding Portrait', category: 'weddings', image: '../assets/images/portfolio/weddings/wedding4.jpg', description: 'Sunset wedding couple' },
      { id: 20, title: 'Bride and Groom Moment', category: 'weddings', image: '../assets/images/portfolio/weddings/wedding5.jpg', description: 'Bride and groom portrait' },
      { id: 21, title: 'Event Lighting Capture', category: 'events', image: '../assets/images/portfolio/events/event1.jpg', description: 'Live event lighting' },
      { id: 22, title: 'Corporate Gala', category: 'events', image: '../assets/images/portfolio/events/event2.jpg', description: 'Corporate gala coverage' },
      { id: 23, title: 'Gallery Opening', category: 'events', image: '../assets/images/portfolio/events/event3.jpg', description: 'Art gallery event' },
      { id: 24, title: 'Celebration Moment', category: 'events', image: '../assets/images/portfolio/events/event4.jpg', description: 'Festive event capture' },
      { id: 25, title: 'Outdoor Concert', category: 'events', image: '../assets/images/portfolio/events/event5.jpg', description: 'Outdoor concert event' },
      { id: 26, title: 'Outdoor Adventure Portrait', category: 'outdoor', image: '../assets/images/portfolio/outdoor/outdoor1.jpg', description: 'Outdoor adventure portrait' },
      { id: 27, title: 'Sunset Outdoor Portrait', category: 'outdoor', image: '../assets/images/portfolio/outdoor/outdoor2_revised.jpg', description: 'Sunset outdoor portrait' },
      { id: 28, title: 'Fresh Outdoor Portrait', category: 'outdoor', image: '../assets/images/portfolio/outdoor/outdoor3.jpg', description: 'Fresh outdoor portrait' },
      { id: 29, title: 'Mountain Portrait', category: 'outdoor', image: '../assets/images/portfolio/outdoor/outdoor4_revised.jpg', description: 'Mountain outdoor portrait' },
      { id: 30, title: 'Wild Meadow Session', category: 'outdoor', image: '../assets/images/portfolio/outdoor/outdoor5.jpg', description: 'Wild meadow outdoor shoot' }
    ],
    gallery: [
      { id: 1, title: 'Studio Glow', category: 'Portraits', image: '../assets/images/portfolio/outdoor/outdoor1.jpg' },
      { id: 2, title: 'Event Lights', category: 'Events', image: '../assets/images/portfolio/events/event2.jpg' }
    ],
    services: [
      { id: 1, title: 'Family Portraits', icon: 'fa-users', price: 350, image: '../assets/images/portfolio/family/family1_revised.jpg', description: 'Timeless family portraits that capture genuine connection and joy.' },
      { id: 2, title: 'Newborn Sessions', icon: 'fa-baby', price: 450, image: '../assets/images/portfolio/newborn/newborn1.jpg', description: 'Gentle, safe sessions preserving the earliest days of life.' },
      { id: 3, title: 'Corporate Headshots', icon: 'fa-briefcase', price: 250, image: '../assets/images/portfolio/corporate/corporate1.jpg', description: 'Polished headshots and brand imagery for professionals.' },
      { id: 4, title: 'Wedding Photography', icon: 'fa-ring', price: 2800, image: '../assets/images/portfolio/weddings/wedding1.jpg', description: 'Full-day coverage of your celebration with editorial-quality storytelling.' },
      { id: 5, title: 'Event Coverage', icon: 'fa-calendar-check', price: 500, image: '../assets/images/portfolio/events/event1.jpg', description: 'Discreet event photography for parties, corporate gatherings, and celebrations.' },
      { id: 6, title: 'Outdoor Portraits', icon: 'fa-tree', price: 300, image: '../assets/images/portfolio/outdoor/outdoor1.jpg', description: 'Natural light sessions in parks, beaches, and urban landscapes.' }
    ],
    testimonials: [
      { id: 1, author: 'Sara & Daniel', rating: 5, quote: 'Beautifully captured, utterly timeless.' },
      { id: 2, author: 'Lina Brooks', rating: 5, quote: 'The team made us feel at ease instantly.' }
    ],
    team: [
      { id: 1, name: 'Elena Vasquez', role: 'Lead Photographer', social: '@elena' },
      { id: 2, name: 'Mason Reed', role: 'Studio Assistant', social: '@mason' }
    ],
    blog: [
      { id: 1, title: '5 Camera Settings Every Portrait Photographer Should Know', category: 'Tips', tags: 'portrait,gear', featured: '../assets/images/portfolio/outdoor/outdoor3.jpg' },
      { id: 2, title: 'A Day in the Life: Wedding Coverage at Central Park', category: 'Behind the Scenes', tags: 'wedding,story', featured: '../assets/images/portfolio/weddings/wedding4.jpg' },
      { id: 3, title: 'The Mitchell Family: A Golden Hour Session Story', category: 'Client Stories', tags: 'family,beach', featured: '../assets/images/portfolio/family/family5_revised.jpg' },
      { id: 4, title: 'Preparing for Your Newborn Session: A Parent\'s Guide', category: 'Tips', tags: 'newborn,guide', featured: '../assets/images/portfolio/newborn/newborn5.jpg' },
      { id: 5, title: 'Our Editing Process: From Raw to Gallery', category: 'Behind the Scenes', tags: 'editing,workflow', featured: '../assets/images/portfolio/corporate/corporate4.jpg' },
      { id: 6, title: 'How Professional Headshots Transformed a Startup\'s Brand', category: 'Client Stories', tags: 'corporate,headshot', featured: '../assets/images/portfolio/corporate/corporate5.jpg' }
    ],
    messages: [
      { id: 1, name: 'Ava Thompson', email: 'ava@example.com', subject: 'Wedding Inquiry', message: 'Looking for wedding coverage in July.', read: false, date: '2026-06-28' },
      { id: 2, name: 'Marcus Lee', email: 'marcus@example.com', subject: 'Newborn Session', message: 'Would love to book a newborn session.', read: true, date: '2026-06-25' }
    ],
    users: [
      { id: 1, name: 'Mason Reed', email: 'mason@auraphotography.com', role: 'Editor', password: 'Editor@123' }
    ],
    profile: {
      name: 'Elena Vasquez',
      email: 'hello@auraphotography.com',
      phone: '+1 555 0110',
      bio: 'Lead photographer and creative director.',
      avatar: '../assets/images/elena-vasquez.jpg'
    },
    settings: {
      siteName: 'Aura Photography',
      contactEmail: 'hello@auraphotography.com',
      phone: '+1 (555) 012-3456',
      address: '42 Lens Avenue, Suite 200',
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      theme: 'light'
    }
  };

  function initStorage() {
    Object.entries(STORAGE_KEYS).forEach(function ([key, storageKey]) {
      if (!localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, JSON.stringify(sampleData[key]));
      }
    });
    const users = getItem(STORAGE_KEYS.users);
    if (Array.isArray(users)) {
      const filteredUsers = users.filter(function (user) {
        return String(user.email || '').toLowerCase() !== adminCreds.email;
      });
      if (filteredUsers.length !== users.length) {
        setItem(STORAGE_KEYS.users, filteredUsers);
      }
    }
  }

  function getItem(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (error) { return null; }
  }

  function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
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

  function showToast(message, type) {
    const existing = document.querySelector('.toast-container');
    if (existing) existing.remove();
    const wrapper = document.createElement('div');
    wrapper.className = 'toast-container position-fixed top-0 end-0 p-3';
    wrapper.innerHTML = '<div class="toast align-items-center text-bg-' + type + ' border-0 show" role="alert"><div class="d-flex"><div class="toast-body">' + message + '</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div>';
    document.body.appendChild(wrapper);
    window.setTimeout(function () { wrapper.remove(); }, 2600);
  }

  function showLoader(show) {
    let overlay = document.getElementById('admin-loader');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'admin-loader';
      overlay.className = 'loading-overlay';
      overlay.innerHTML = '<div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>';
      document.body.appendChild(overlay);
    }
    overlay.style.display = show ? 'grid' : 'none';
  }

  function getCurrentSession() {
    return getItem(STORAGE_KEYS.auth);
  }

  function requireAuth() {
    const session = getCurrentSession();
    if (!session) {
      window.location.href = '../pages/login.html';
      return false;
    }
    if (session.role !== 'admin') {
      window.location.href = '../pages/index.html';
      return false;
    }
    return true;
  }

  function bindLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem(STORAGE_KEYS.auth);
        window.location.href = '../pages/login.html';
      });
    }
  }

  function getStoredAdminTheme() {
    const stored = localStorage.getItem('aura-admin-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    const settings = getItem(STORAGE_KEYS.settings) || sampleData.settings;
    return settings.theme === 'dark' ? 'dark' : 'light';
  }

  function getStoredAdminDirection() {
    const stored = localStorage.getItem('aura-admin-rtl');
    if (stored === 'rtl' || stored === 'ltr') return stored;
    return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
  }

  function applyAdminPreferences() {
    const theme = getStoredAdminTheme();
    const direction = getStoredAdminDirection();
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', direction);
    document.body.setAttribute('dir', direction);

    const settings = getItem(STORAGE_KEYS.settings) || sampleData.settings;
    settings.theme = theme;
    setItem(STORAGE_KEYS.settings, settings);
  }

  function syncAdminPreferenceToggles() {
    const themeSwitch = document.getElementById('themeToggleSwitch');
    if (themeSwitch) {
      themeSwitch.checked = (document.documentElement.getAttribute('data-theme') || 'light') === 'dark';
    }

    const rtlSwitch = document.getElementById('rtlToggleSwitch');
    if (rtlSwitch) {
      rtlSwitch.checked = (document.documentElement.getAttribute('dir') || 'ltr') === 'rtl';
    }
  }

  function setAdminTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('aura-admin-theme', theme);

    const settings = getItem(STORAGE_KEYS.settings) || sampleData.settings;
    settings.theme = theme;
    setItem(STORAGE_KEYS.settings, settings);
    syncAdminPreferenceToggles();
  }

  function setAdminDirection(direction) {
    const normalized = direction === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', normalized);
    document.body.setAttribute('dir', normalized);
    localStorage.setItem('aura-admin-rtl', normalized);
    syncAdminPreferenceToggles();
  }

  function bindViewToggles() {
    const themeSwitch = document.getElementById('themeToggleSwitch');
    const rtlSwitch = document.getElementById('rtlToggleSwitch');

    if (themeSwitch) {
      themeSwitch.addEventListener('change', function () {
        setAdminTheme(themeSwitch.checked ? 'dark' : 'light');
      });
    }

    if (rtlSwitch) {
      rtlSwitch.addEventListener('change', function () {
        setAdminDirection(rtlSwitch.checked ? 'rtl' : 'ltr');
      });
    }

    syncAdminPreferenceToggles();
  }

 function bindSidebarToggle() {
  const toggle = document.getElementById("sidebarMenuToggle");
  const shell = document.querySelector(".admin-shell");

  if (!toggle || !shell) return;

  toggle.addEventListener("click", function () {
    shell.classList.toggle("is-sidebar-open");
  });

  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 992) {
      if (
        !e.target.closest(".admin-sidebar") &&
        !e.target.closest("#sidebarMenuToggle")
      ) {
        shell.classList.remove("is-sidebar-open");
      }
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      shell.classList.remove("is-sidebar-open");
    }
  });
}

  function renderLayout() {
    const sidebarRoot = document.getElementById('adminSidebarRoot');
    const topbarRoot = document.getElementById('adminTopbarRoot');
    const page = window.location.pathname.split('/').pop() || 'dashboard.html';

    if (sidebarRoot) {
      const groups = [
        {
          title: 'Overview',
          items: [
            { href: 'dashboard.html', icon: 'fa-chart-pie', label: 'Dashboard' },
            { href: 'bookings.html', icon: 'fa-calendar-check', label: 'Bookings' },
            { href: 'customers.html', icon: 'fa-users', label: 'Customers' }
          ]
        },
        {
          title: 'Studio content',
          items: [
            { href: 'portfolio.html', icon: 'fa-image', label: 'Portfolio' },
            { href: 'gallery.html', icon: 'fa-images', label: 'Gallery' },
            { href: 'services.html', icon: 'fa-camera', label: 'Services' },
            { href: 'testimonials.html', icon: 'fa-star', label: 'Testimonials' },
            { href: 'team.html', icon: 'fa-user-group', label: 'Team' },
            { href: 'blog.html', icon: 'fa-newspaper', label: 'Blog' }
          ]
        },
        {
          title: 'Communication',
          items: [
            { href: 'messages.html', icon: 'fa-envelope', label: 'Messages' }
          ]
        },
        {
          title: 'Account',
          items: [
            { href: 'users.html', icon: 'fa-user-shield', label: 'Users' },
            { href: 'settings.html', icon: 'fa-gear', label: 'Settings' },
            { href: 'profile.html', icon: 'fa-user', label: 'Profile' }
          ]
        }
      ];

      sidebarRoot.innerHTML = '<div class="sidebar-brand"><div class="brand-mark">A</div><div><div>AURA</div><small class="opacity-75">Admin Panel</small></div></div><div class="sidebar-nav">' + groups.map(function (group) {
        return '<div class="sidebar-section"><div class="sidebar-label">' + group.title + '</div>' + group.items.map(function (item) {
          const active = page === item.href ? 'active' : '';
          return '<a class="sidebar-link ' + active + '" href="' + item.href + '"><i class="fa-solid ' + item.icon + '"></i> ' + item.label + '</a>';
        }).join('') + '</div>';
      }).join('') + '</div><div class="sidebar-footer"><a class="sidebar-link" href="#" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></div>';
    }

    if (topbarRoot) {
      topbarRoot.innerHTML = '<div class="d-flex align-items-center gap-2"><button class="admin-sidebar-toggle" id="sidebarMenuToggle" type="button" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></button><div><h2 class="mb-1">' + (page === 'dashboard.html' ? 'Dashboard Overview' : page.replace('.html', '').replace(/^./, function (c) { return c.toUpperCase(); })) + '</h2><p class="text-muted mb-0">Manage your studio operations from one place.</p></div></div><div class="admin-topbar-actions"><label class="admin-toggle" for="rtlToggleSwitch"><span>RTL</span><input class="admin-toggle-input" type="checkbox" id="rtlToggleSwitch" /><span class="admin-toggle-slider"></span></label><label class="admin-toggle" for="themeToggleSwitch"><span>Dark</span><input class="admin-toggle-input" type="checkbox" id="themeToggleSwitch" /><span class="admin-toggle-slider"></span></label><div class="admin-profile-pill"><img src="../assets/images/elena-vasquez.jpg" alt="Admin" class="rounded-circle" width="36" height="36" /><div><div id="adminProfileName">Admin</div><small id="adminProfileRole">Administrator</small></div></div></div>';
    }
  }

  function populateProfile() {
    const profile = getItem(STORAGE_KEYS.profile) || sampleData.profile;
    const session = getCurrentSession();
    const display = document.getElementById('adminProfileName');
    if (display) display.textContent = (session && session.name) || profile.name || 'Admin';
    const role = document.getElementById('adminProfileRole');
    if (role) role.textContent = 'Administrator';
    const avatar = document.getElementById('adminProfileAvatar');
    if (avatar && profile.avatar) avatar.src = profile.avatar;
  }

  function renderDashboard() {
    const bookings = getItem(STORAGE_KEYS.bookings) || [];
    const customers = getItem(STORAGE_KEYS.customers) || [];
    const portfolio = getItem(STORAGE_KEYS.portfolio) || [];
    const services = getItem(STORAGE_KEYS.services) || [];
    const blog = getItem(STORAGE_KEYS.blog) || [];
    const messages = getItem(STORAGE_KEYS.messages) || [];

    const revenue = bookings.reduce(function (sum, booking) { return sum + Number(booking.amount || 0); }, 0);

    document.getElementById('statBookings').textContent = bookings.length;
    document.getElementById('statCustomers').textContent = customers.length;
    document.getElementById('statPortfolio').textContent = portfolio.length;
    document.getElementById('statServices').textContent = services.length;
    document.getElementById('statBlog').textContent = blog.length;
    document.getElementById('statMessages').textContent = messages.length;
    document.getElementById('statRevenue').textContent = '$' + revenue.toLocaleString();

    const bookingsTable = document.getElementById('recentBookingsList');
    if (bookingsTable) {
      bookingsTable.innerHTML = bookings.slice(0, 4).map(function (item) {
        return '<tr><td>' + item.customer + '</td><td>' + item.service + '</td><td>' + item.date + '</td><td><span class="badge badge-soft badge-' + item.status.toLowerCase() + '">' + item.status + '</span></td></tr>';
      }).join('');
    }

    const messagesList = document.getElementById('latestMessages');
    if (messagesList) {
      messagesList.innerHTML = messages.slice(0, 4).map(function (item) {
        return '<div class="list-item"><div class="d-flex justify-content-between"><strong>' + item.name + '</strong><span class="text-muted">' + item.date + '</span></div><p class="mb-0 small">' + item.subject + '</p></div>';
      }).join('');
    }

    if (window.Chart) {
      const ctx = document.getElementById('bookingChart');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Bookings',
              data: [3, 4, 5, 6, 7, 8],
              backgroundColor: ['#D4AF37', '#B8891D', '#D4AF37', '#B8891D', '#D4AF37', '#B8891D']
            }]
          },
          options: { responsive: true, plugins: { legend: { display: false } } }
        });
      }
    }
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getEntityConfig(pageKey) {
    const configs = {
      portfolio: {
        storeKey: STORAGE_KEYS.portfolio,
        singular: 'Portfolio item',
        successLabel: 'Portfolio item',
        buttonLabel: 'Add Portfolio Item',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'select', options: ['family', 'weddings', 'portraits', 'corporate', 'events', 'outdoor'], required: true },
          { key: 'image', label: 'Image URL', type: 'url', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true }
        ]
      },
      gallery: {
        storeKey: STORAGE_KEYS.gallery,
        singular: 'Gallery image',
        successLabel: 'Gallery image',
        buttonLabel: 'Add Gallery Image',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text', required: true },
          { key: 'image', label: 'Image URL', type: 'url', required: true }
        ]
      },
      customers: {
        storeKey: STORAGE_KEYS.customers,
        singular: 'Customer',
        successLabel: 'Customer',
        buttonLabel: 'Add Customer',
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'email', label: 'Email', type: 'email', required: true },
          { key: 'phone', label: 'Phone', type: 'text', required: true },
          { key: 'plan', label: 'Plan', type: 'text', required: true },
          { key: 'status', label: 'Status', type: 'text', required: true }
        ]
      },
      services: {
        storeKey: STORAGE_KEYS.services,
        singular: 'Service',
        successLabel: 'Service',
        buttonLabel: 'Add Service',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'icon', label: 'Icon Class', type: 'text', required: true },
          { key: 'price', label: 'Price', type: 'number', required: true },
          { key: 'image', label: 'Image URL', type: 'url', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true }
        ]
      },
      testimonials: {
        storeKey: STORAGE_KEYS.testimonials,
        singular: 'Testimonial',
        successLabel: 'Testimonial',
        buttonLabel: 'Add Testimonial',
        fields: [
          { key: 'author', label: 'Author', type: 'text', required: true },
          { key: 'rating', label: 'Rating', type: 'number', required: true },
          { key: 'quote', label: 'Quote', type: 'textarea', required: true }
        ]
      },
      team: {
        storeKey: STORAGE_KEYS.team,
        singular: 'Team member',
        successLabel: 'Team member',
        buttonLabel: 'Add Team Member',
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'role', label: 'Role', type: 'text', required: true },
          { key: 'social', label: 'Social Handle', type: 'text', required: true }
        ]
      },
      blog: {
        storeKey: STORAGE_KEYS.blog,
        singular: 'Blog post',
        successLabel: 'Blog post',
        buttonLabel: 'Add Blog Post',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text', required: true },
          { key: 'tags', label: 'Tags', type: 'text', required: true },
          { key: 'featured', label: 'Featured Image URL', type: 'url', required: true }
        ]
      },
      users: {
        storeKey: STORAGE_KEYS.users,
        singular: 'User',
        successLabel: 'User',
          
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'email', label: 'Email', type: 'email', required: true },
          { key: 'role', label: 'Role', type: 'text', required: true },
          { key: 'password', label: 'Password', type: 'password' }
        ]
      }
    };

    return configs[pageKey] || null;
  }

  function ensureEntityModal() {
    let modal = document.getElementById('entityModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'entityModal';
      modal.className = 'modal fade';
      modal.setAttribute('tabindex', '-1');
      modal.innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"><form id="entityModalForm"><div class="modal-header"><h5 class="modal-title" id="entityModalTitle">Add Item</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><input type="hidden" id="entityModalPage" name="pageKey" /><input type="hidden" id="entityModalItemId" name="itemId" /><div class="row g-3" id="entityModalFields"></div></div><div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn btn-outline-warning">Save</button></div></form></div></div>';
      document.body.appendChild(modal);
    }
    return modal;
  }

  function renderEntityForm(pageKey, item) {
    const config = getEntityConfig(pageKey);
    const fieldsContainer = document.getElementById('entityModalFields');
    const modalTitle = document.getElementById('entityModalTitle');
    const pageInput = document.getElementById('entityModalPage');
    const itemInput = document.getElementById('entityModalItemId');

    if (!config || !fieldsContainer || !modalTitle || !pageInput || !itemInput) return;

    pageInput.value = pageKey;
    itemInput.value = item ? item.id : '';
    modalTitle.textContent = item ? 'Edit ' + config.singular : 'Add ' + config.singular;

    fieldsContainer.innerHTML = config.fields.map(function (field) {
      const value = item && item[field.key] !== undefined ? item[field.key] : '';
      const isRequired = field.required ? 'required' : '';
      const id = 'entityField_' + field.key;
      const label = '<label class="form-label" for="' + id + '">' + field.label + '</label>';

      if (field.type === 'textarea') {
        return '<div class="col-md-12">' + label + '<textarea class="form-control" id="' + id + '" name="' + field.key + '" rows="4" ' + isRequired + '>' + escapeHtml(value) + '</textarea></div>';
      }

      if (field.type === 'select') {
        const options = (field.options || []).map(function (option) {
          const selected = value === option ? ' selected' : '';
          return '<option value="' + escapeHtml(option) + '"' + selected + '>' + escapeHtml(option) + '</option>';
        }).join('');
        return '<div class="col-md-6">' + label + '<select class="form-select" id="' + id + '" name="' + field.key + '" ' + isRequired + '>' + options + '</select></div>';
      }

      if (field.type === 'number') {
        return '<div class="col-md-6">' + label + '<input class="form-control" id="' + id + '" name="' + field.key + '" type="number" min="1" max="5" value="' + escapeHtml(value) + '" ' + isRequired + '/></div>';
      }

      if (field.type === 'url') {
        return '<div class="col-md-6">' + label + '<input class="form-control" id="' + id + '" name="' + field.key + '" type="url" value="' + escapeHtml(value) + '" ' + isRequired + '/></div>';
      }

      if (field.type === 'email') {
        return '<div class="col-md-6">' + label + '<input class="form-control" id="' + id + '" name="' + field.key + '" type="email" value="' + escapeHtml(value) + '" ' + isRequired + '/></div>';
      }

      if (field.type === 'password') {
        return '<div class="col-md-6">' + label + '<input class="form-control" id="' + id + '" name="' + field.key + '" type="password" value="' + escapeHtml(value) + '"/></div>';
      }

      return '<div class="col-md-6">' + label + '<input class="form-control" id="' + id + '" name="' + field.key + '" type="text" value="' + escapeHtml(value) + '" ' + isRequired + '/></div>';
    }).join('');
  }

  function openEntityModal(pageKey, item) {
    const modal = ensureEntityModal();
    renderEntityForm(pageKey, item);
    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  function saveEntityFromForm(event) {
    event.preventDefault();

    const form = document.getElementById('entityModalForm');
    if (!form) return;

    const pageKey = document.getElementById('entityModalPage').value;
    const itemId = document.getElementById('entityModalItemId').value;
    const config = getEntityConfig(pageKey);
    if (!config) return;

    const list = getItem(config.storeKey) || [];
    const payload = {};
    let missingField = false;

    config.fields.forEach(function (field) {
      const input = form.querySelector('[name="' + field.key + '"]');
      if (!input) return;

      let value = input.value;
      if (field.type === 'number') {
        value = Number(value || 0);
      } else {
        value = value.trim();
      }

      if (field.required && !value) {
        missingField = true;
      }

      payload[field.key] = value;
    });

    if (missingField) {
      showToast('Please fill in the required fields.', 'danger');
      return;
    }

    if (itemId) {
      const existing = list.find(function (item) { return String(item.id) === String(itemId); });
      if (existing && config.fields.some(function (field) { return field.key === 'password'; }) && !payload.password) {
        payload.password = existing.password;
      }

      const updated = list.map(function (item) {
        return String(item.id) === String(itemId) ? Object.assign({}, item, payload) : item;
      });
      setItem(config.storeKey, updated);
      showToast(config.singular + ' updated.', 'success');
    } else {
      const nextItem = Object.assign({}, payload, { id: Date.now() });
      setItem(config.storeKey, list.concat(nextItem));
      showToast(config.singular + ' added.', 'success');
    }

    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(document.getElementById('entityModal')).hide();
    }

    refreshAdminPage();
    renderDashboard();
  }

  function setupEntityPage(pageKey) {
    const config = getEntityConfig(pageKey);
    if (!config) return;

    const existingButton = document.querySelector('[data-open-editor="' + pageKey + '"]');
    if (existingButton) return;

    const containerIdMap = {
      portfolio: 'portfolioCards',
      gallery: 'galleryGrid',
      customers: 'customersTableBody',
      services: 'servicesList',
      testimonials: 'testimonialsList',
      team: 'teamList',
      blog: 'blogList',
      users: 'usersTableBody'
    };

    const container = document.getElementById(containerIdMap[pageKey]);
    if (!container) return;

    const bar = document.createElement('div');
    bar.className = 'admin-table-actions';
    bar.innerHTML = '<button type="button" class="btn btn-outline-warning btn-sm" data-open-editor="' + pageKey + '"><i class="fa-solid fa-plus"></i> ' + config.buttonLabel + '</button>';

    if (container.tagName === 'TBODY') {
      const tableWrapper = container.closest('.table-responsive') || container.parentNode;
      if (tableWrapper && tableWrapper.parentNode) {
        tableWrapper.parentNode.insertBefore(bar, tableWrapper);
        return;
      }
    }

    container.parentNode.insertBefore(bar, container);
  }

  function populateProfileForm() {
    const profile = getItem(STORAGE_KEYS.profile) || sampleData.profile;
    const fields = [
      ['profileName', profile.name],
      ['profileEmail', profile.email],
      ['profilePhone', profile.phone],
      ['profileAvatar', profile.avatar],
      ['profileBio', profile.bio]
    ];

    fields.forEach(function ([fieldId, value]) {
      const field = document.getElementById(fieldId);
      if (field) field.value = value || '';
    });
  }

  function refreshAdminPage() {
    const path = window.location.pathname.split('/').pop();
    if (path === 'dashboard.html') {
      renderDashboard();
    } else if (path === 'bookings.html') {
      renderBookings();
    } else if (path === 'customers.html') {
      renderCustomers();
    } else if (path === 'portfolio.html') {
      renderPortfolio();
    } else if (path === 'gallery.html') {
      renderGallery();
    } else if (path === 'services.html') {
      renderServices();
    } else if (path === 'testimonials.html') {
      renderTestimonials();
    } else if (path === 'team.html') {
      renderTeam();
    } else if (path === 'blog.html') {
      renderBlog();
    } else if (path === 'messages.html') {
      renderMessages();
    } else if (path === 'users.html') {
      renderUsers();
    } else if (path === 'settings.html') {
      renderSettings();
    } else if (path === 'profile.html') {
      populateProfile();
      populateProfileForm();
    }
  }

  function renderBookings() {
    const bookings = getItem(STORAGE_KEYS.bookings) || [];
    const tableBody = document.getElementById('bookingsTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = bookings.map(function (item) {
      return '<tr><td>' + item.customer + '</td><td>' + item.email + '</td><td>' + item.service + '</td><td>' + item.date + '</td><td><span class="badge badge-soft badge-' + item.status.toLowerCase() + '">' + item.status + '</span></td><td>$' + Number(item.amount || 0).toLocaleString() + '</td><td><button class="btn btn-sm btn-outline-secondary me-1" data-action="view-booking" data-id="' + item.id + '"><i class="fa-solid fa-eye"></i></button><button class="btn btn-sm btn-outline-warning me-1" data-action="edit-booking" data-id="' + item.id + '"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-booking" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></td></tr>';
    }).join('');
  }

  function openBookingModal(booking) {
    const form = document.getElementById('bookingModalForm');
    const modalTitle = document.getElementById('bookingModalLabel');
    const modal = document.getElementById('bookingModal');
    if (!form || !modalTitle || !modal) return;

    form.reset();
    document.getElementById('bookingId').value = booking ? booking.id : '';
    document.getElementById('bookingCustomer').value = booking ? booking.customer : '';
    document.getElementById('bookingEmail').value = booking ? booking.email : '';
    document.getElementById('bookingService').value = booking ? booking.service : '';
    document.getElementById('bookingDate').value = booking ? booking.date : '';
    document.getElementById('bookingStatus').value = booking ? booking.status : 'Pending';
    document.getElementById('bookingAmount').value = booking ? booking.amount : '';
    document.getElementById('bookingNote').value = booking ? booking.note || '' : '';
    modalTitle.textContent = booking ? 'Edit Booking' : 'Add Booking';

    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  function openViewBookingModal(booking) {
    const modal = document.getElementById('viewBookingModal');
    if (!booking || !modal) return;

    document.getElementById('viewBookingCustomer').textContent = booking.customer || '';
    document.getElementById('viewBookingEmail').textContent = booking.email || '';
    document.getElementById('viewBookingService').textContent = booking.service || '';
    document.getElementById('viewBookingDate').textContent = booking.date || '';
    document.getElementById('viewBookingStatus').innerHTML = '<span class="badge badge-soft badge-' + String(booking.status || '').toLowerCase() + '">' + (booking.status || '') + '</span>';
    document.getElementById('viewBookingAmount').textContent = '$' + Number(booking.amount || 0).toLocaleString();
    document.getElementById('viewBookingNote').textContent = booking.note || '—';

    const editBtn = document.getElementById('viewBookingEditBtn');
    if (editBtn) {
      editBtn.onclick = function () {
        if (window.bootstrap && window.bootstrap.Modal) {
          window.bootstrap.Modal.getOrCreateInstance(modal).hide();
        }
        openBookingModal(booking);
      };
    }

    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  function saveBookingFromForm(event) {
    event.preventDefault();

    const form = document.getElementById('bookingModalForm');
    if (!form) return;

    const bookingId = document.getElementById('bookingId').value;
    const bookings = getItem(STORAGE_KEYS.bookings) || [];
    const bookingPayload = {
      customer: document.getElementById('bookingCustomer').value.trim(),
      email: document.getElementById('bookingEmail').value.trim(),
      service: document.getElementById('bookingService').value.trim(),
      date: document.getElementById('bookingDate').value,
      status: document.getElementById('bookingStatus').value,
      amount: Number(document.getElementById('bookingAmount').value || 0),
      note: document.getElementById('bookingNote').value.trim()
    };

    if (!bookingPayload.customer || !bookingPayload.email || !bookingPayload.service || !bookingPayload.date) {
      showToast('Please complete the required booking fields.', 'danger');
      return;
    }

    if (bookingId) {
      const updated = bookings.map(function (item) {
        return item.id === Number(bookingId) ? Object.assign({}, item, bookingPayload) : item;
      });
      setItem(STORAGE_KEYS.bookings, updated);
      showToast('Booking updated.', 'success');
    } else {
      const nextBooking = Object.assign({}, bookingPayload, { id: Date.now() });
      setItem(STORAGE_KEYS.bookings, bookings.concat(nextBooking));
      showToast('Booking added.', 'success');
    }

    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(document.getElementById('bookingModal')).hide();
    }
    renderBookings();
    renderDashboard();
  }

  function renderCustomers() {
    const customers = getItem(STORAGE_KEYS.customers) || [];
    const tableBody = document.getElementById('customersTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = customers.map(function (item) {
      return '<tr><td>' + item.name + '</td><td>' + item.email + '</td><td>' + item.phone + '</td><td><span class="badge badge-soft">' + item.plan + '</span></td><td>' + item.status + '</td><td><button class="btn btn-sm btn-outline-warning me-1" data-action="edit-customer" data-id="' + item.id + '"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-customer" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></td></tr>';
    }).join('');
    setupEntityPage('customers');
  }

  function renderPortfolio() {
    const items = getItem(STORAGE_KEYS.portfolio) || [];
    const container = document.getElementById('portfolioCards');
    if (!container) return;
    container.innerHTML = items.map(function (item) {
      return '<div class="col-md-6 col-lg-4"><div class="card h-100"><img src="' + item.image + '" class="card-img-top" alt="' + item.title + '" style="height:180px;object-fit:cover;"><div class="card-body"><h5 class="card-title">' + item.title + '</h5><p class="card-text">' + item.description + '</p><div class="badge-soft">' + item.category + '</div></div><div class="card-footer bg-white border-0"><button class="btn btn-sm btn-outline-warning me-1" data-action="edit-portfolio" data-id="' + item.id + '"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-portfolio" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></div></div></div>';
    }).join('');
    setupEntityPage('portfolio');
  }

  function renderGallery() {
    const items = getItem(STORAGE_KEYS.gallery) || [];
    const container = document.getElementById('galleryGrid');
    if (!container) return;
    container.innerHTML = items.map(function (item) {
      return '<div class="gallery-card"><img src="' + item.image + '" alt="' + item.title + '"><div class="card-body"><h6 class="mb-1">' + item.title + '</h6><p class="small text-muted mb-2">' + item.category + '</p><button class="btn btn-sm btn-outline-danger" data-action="delete-gallery" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i> Delete</button></div></div>';
    }).join('');
    setupEntityPage('gallery');
  }

  function renderServices() {
    const items = getItem(STORAGE_KEYS.services) || [];
    const container = document.getElementById('servicesList');
    if (!container) return;
    container.innerHTML = items.map(function (item) {
      return '<div class="col-md-6"><div class="card h-100">' + 
        (item.image ? '<img src="' + item.image + '" class="card-img-top" alt="' + item.title + '" style="height:150px;object-fit:cover;">' : '') +
        '<div class="card-body"><div class="d-flex justify-content-between align-items-start"><h5><i class="fas ' + (item.icon || 'fa-camera') + ' me-2"></i>' + item.title + '</h5><span class="badge-soft">$' + item.price + '</span></div><p class="text-muted">' + item.description + '</p></div>' +
        '<div class="card-footer bg-white border-0"><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-warning" data-action="edit-service" data-id="' + item.id + '"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-service" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></div></div></div></div>';
    }).join('');
    setupEntityPage('services');
  }

  function renderTestimonials() {
    const items = getItem(STORAGE_KEYS.testimonials) || [];
    const container = document.getElementById('testimonialsList');
    if (!container) return;
    container.innerHTML = items.map(function (item) {
      return '<div class="col-md-6"><div class="card h-100"><div class="card-body"><div class="d-flex justify-content-between"><h5>' + item.author + '</h5><span class="badge-soft">' + item.rating + '★</span></div><p class="text-muted mt-3">"' + item.quote + '"</p><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-warning" data-action="edit-testimonial" data-id="' + item.id + '"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-testimonial" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></div></div></div></div>';
    }).join('');
    setupEntityPage('testimonials');
  }

  function renderTeam() {
    const items = getItem(STORAGE_KEYS.team) || [];
    const container = document.getElementById('teamList');
    if (!container) return;
    container.innerHTML = items.map(function (item) {
      return '<div class="col-md-6 col-lg-4"><div class="card h-100"><div class="card-body"><div class="avatar mb-3">' + item.name.charAt(0) + '</div><h5>' + item.name + '</h5><p class="text-muted mb-2">' + item.role + '</p><p class="small">' + item.social + '</p><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-warning" data-action="edit-member" data-id="' + item.id + '"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-member" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></div></div></div></div>';
    }).join('');
    setupEntityPage('team');
  }

  function renderBlog() {
    const items = getItem(STORAGE_KEYS.blog) || [];
    const container = document.getElementById('blogList');
    if (!container) return;
    container.innerHTML = items.map(function (item) {
      return '<div class="col-md-6"><div class="card h-100"><img src="' + item.featured + '" class="card-img-top" alt="' + item.title + '" style="height:180px;object-fit:cover;"><div class="card-body"><h5>' + item.title + '</h5><p class="text-muted">' + item.category + '</p><p class="small">Tags: ' + item.tags + '</p><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-warning" data-action="edit-blog" data-id="' + item.id + '"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-blog" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></div></div></div></div>';
    }).join('');
    setupEntityPage('blog');
  }

  function renderMessages() {
    const items = getItem(STORAGE_KEYS.messages) || [];
    const container = document.getElementById('messagesList');
    if (!container) return;
    container.innerHTML = items.map(function (item) {
      return '<div class="card message-card ' + (item.read ? '' : 'unread') + ' mb-3"><div class="card-body"><div class="d-flex justify-content-between align-items-start"><div><h6>' + item.name + '</h6><p class="small text-muted mb-1">' + item.subject + '</p></div><span class="small text-muted">' + item.date + '</span></div><p class="mb-3">' + item.message + '</p><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-primary" data-action="read-message" data-id="' + item.id + '"><i class="fa-solid fa-envelope-open"></i></button><button class="btn btn-sm btn-outline-warning" data-action="toggle-message" data-id="' + item.id + '"><i class="fa-solid fa-check"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-message" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></div></div></div>';
    }).join('');
  }

  function renderUsers() {
    const items = getItem(STORAGE_KEYS.users) || [];
    const container = document.getElementById('usersTableBody');
    if (!container) return;
    container.innerHTML = items.map(function (item) {
      return '<tr><td>' + item.name + '</td><td>' + item.email + '</td><td>' + item.role + '</td><td><button class="btn btn-sm btn-outline-warning me-1" data-action="edit-user" data-id="' + item.id + '"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger" data-action="delete-user" data-id="' + item.id + '"><i class="fa-solid fa-trash"></i></button></td></tr>';
    }).join('');
  }

  function renderSettings() {
    const settings = getItem(STORAGE_KEYS.settings) || sampleData.settings;
    const fields = document.querySelectorAll('[data-setting]');
    fields.forEach(function (field) {
      const key = field.getAttribute('data-setting');
      if (settings[key] !== undefined) {
        field.value = settings[key];
      }
    });
  }

  function saveSettings() {
    const settings = {};
    document.querySelectorAll('[data-setting]').forEach(function (field) {
      settings[field.getAttribute('data-setting')] = field.value;
    });
    setItem(STORAGE_KEYS.settings, settings);
    showToast('Settings saved locally.', 'success');
    renderDashboard();
  }

  function bindForms() {
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
      settingsForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveSettings();
      });
    }

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const profile = {
          name: document.getElementById('profileName').value,
          email: document.getElementById('profileEmail').value,
          phone: document.getElementById('profilePhone').value,
          bio: document.getElementById('profileBio').value,
          avatar: document.getElementById('profileAvatar').value
        };
        setItem(STORAGE_KEYS.profile, profile);
        populateProfile();
        populateProfileForm();
        showToast('Profile updated.', 'success');
      });
    }

    const bookingModalForm = document.getElementById('bookingModalForm');
    if (bookingModalForm) {
      bookingModalForm.addEventListener('submit', saveBookingFromForm);
    }

    const addBookingBtn = document.getElementById('addBookingBtn');
    if (addBookingBtn) {
      addBookingBtn.addEventListener('click', function () {
        openBookingModal(null);
      });
    }

    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        if (email === adminCreds.email && adminCreds.passwordHashes.indexOf(await createPasswordHash(password)) !== -1) {
          setItem(STORAGE_KEYS.auth, { userId: 'admin', email: adminCreds.email, name: adminCreds.name, role: adminCreds.role });
          showToast('Login successful. Redirecting...', 'success');
          window.setTimeout(function () { window.location.href = 'dashboard.html'; }, 500);
        } else {
          showToast('Invalid email or password.', 'danger');
        }
      });
    }

    ensureEntityModal();
    const entityForm = document.getElementById('entityModalForm');
    if (entityForm) {
      entityForm.addEventListener('submit', saveEntityFromForm);
    }
  }

  function bindActions() {
    document.addEventListener('click', function (event) {
      const openEditorBtn = event.target.closest('button[data-open-editor]');
      if (openEditorBtn) {
        openEntityModal(openEditorBtn.getAttribute('data-open-editor'));
        return;
      }

      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const action = button.getAttribute('data-action');
      const id = Number(button.getAttribute('data-id'));

      if (action === 'view-booking') {
        const list = getItem(STORAGE_KEYS.bookings) || [];
        const booking = list.find(function (item) { return item.id === id; });
        if (booking) {
          openViewBookingModal(booking);
        }
        return;
      }

      if (action === 'edit-booking') {
        const list = getItem(STORAGE_KEYS.bookings) || [];
        const booking = list.find(function (item) { return item.id === id; });
        if (booking) {
          openBookingModal(booking);
        }
        return;
      }

      if (action === 'edit-customer' || action === 'edit-portfolio' || action === 'edit-service' || action === 'edit-testimonial' || action === 'edit-member' || action === 'edit-blog' || action === 'edit-user') {
        const keyMap = {
          'edit-customer': 'customers',
          'edit-portfolio': 'portfolio',
          'edit-service': 'services',
          'edit-testimonial': 'testimonials',
          'edit-member': 'team',
          'edit-blog': 'blog',
          'edit-user': 'users'
        };
        const pageKey = keyMap[action];
        const list = getItem(getEntityConfig(pageKey).storeKey) || [];
        const item = list.find(function (entry) { return entry.id === id; });
        if (item) {
          openEntityModal(pageKey, item);
        }
        return;
      }

      if (action === 'delete-booking' || action === 'delete-customer' || action === 'delete-portfolio' || action === 'delete-gallery' || action === 'delete-service' || action === 'delete-testimonial' || action === 'delete-member' || action === 'delete-blog' || action === 'delete-message' || action === 'delete-user') {
        if (window.confirm('Delete this item?')) {
          const keyMap = {
            'delete-booking': STORAGE_KEYS.bookings,
            'delete-customer': STORAGE_KEYS.customers,
            'delete-portfolio': STORAGE_KEYS.portfolio,
            'delete-gallery': STORAGE_KEYS.gallery,
            'delete-service': STORAGE_KEYS.services,
            'delete-testimonial': STORAGE_KEYS.testimonials,
            'delete-member': STORAGE_KEYS.team,
            'delete-blog': STORAGE_KEYS.blog,
            'delete-message': STORAGE_KEYS.messages,
            'delete-user': STORAGE_KEYS.users
          };
          const list = getItem(keyMap[action]) || [];
          const updated = list.filter(function (item) { return item.id !== id; });
          setItem(keyMap[action], updated);
          showToast('Item removed.', 'success');
          refreshAdminPage();
          renderDashboard();
        }
      }

      if (action === 'toggle-message' || action === 'read-message') {
        const list = getItem(STORAGE_KEYS.messages) || [];
        const updated = list.map(function (item) {
          return item.id === id ? Object.assign({}, item, { read: action === 'read-message' ? true : !item.read }) : item;
        });
        setItem(STORAGE_KEYS.messages, updated);
        showToast('Message update saved.', 'success');
        refreshAdminPage();
        renderDashboard();
      }
    });
  }

  function initPage() {
    initStorage();
    applyAdminPreferences();
    const path = window.location.pathname.split('/').pop();
    if (path !== 'login.html' && !requireAuth()) {
      showLoader(false);
      return;
    }
    renderLayout();
    bindSidebarToggle();
    bindLogout();
    bindForms();
    bindActions();
    bindViewToggles();
    populateProfile();
    populateProfileForm();
    renderSettings();

    if (path === 'dashboard.html') {
      requireAuth();
      renderDashboard();
    } else if (path === 'bookings.html') {
      requireAuth();
      renderBookings();
    } else if (path === 'customers.html') {
      requireAuth();
      renderCustomers();
    } else if (path === 'portfolio.html') {
      requireAuth();
      renderPortfolio();
    } else if (path === 'gallery.html') {
      requireAuth();
      renderGallery();
    } else if (path === 'services.html') {
      requireAuth();
      renderServices();
    } else if (path === 'testimonials.html') {
      requireAuth();
      renderTestimonials();
    } else if (path === 'team.html') {
      requireAuth();
      renderTeam();
    } else if (path === 'blog.html') {
      requireAuth();
      renderBlog();
    } else if (path === 'messages.html') {
      requireAuth();
      renderMessages();
    } else if (path === 'users.html') {
      requireAuth();
      renderUsers();
    } else if (path === 'settings.html') {
      requireAuth();
      renderSettings();
    } else if (path === 'profile.html') {
      requireAuth();
      populateProfile();
      populateProfileForm();
    } else if (path === 'login.html') {
      const session = getCurrentSession();
      if (session && session.role === 'admin') {
        window.location.href = 'dashboard.html';
      } else if (session) {
        window.location.href = '../pages/index.html';
      }
    }

    showLoader(false);
  }

  window.addEventListener('load', function () {
    showLoader(true);
    initPage();
  });
})();