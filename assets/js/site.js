// jihun.me: the mobile menu and the light/dark switch. No dependencies.
(function () {
  var root = document.documentElement;

  // Mobile menu (ids kept from the previous site: #menubtn, #navlinks)
  var btn = document.getElementById('menubtn');
  var links = document.getElementById('navlinks');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // Light / dark switch. Follows the OS until the visitor chooses; the choice is remembered.
  var modeBtn = document.getElementById('modebtn');
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function current() {
    return root.dataset.mode || (media && media.matches ? 'dark' : 'light');
  }
  function label() {
    if (!modeBtn) return;
    var isDark = current() === 'dark';
    modeBtn.setAttribute('aria-pressed', String(isDark));
    modeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    modeBtn.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
  }
  if (modeBtn) {
    modeBtn.hidden = false;
    label();
    modeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.mode = next;
      try { localStorage.setItem('mode', next); } catch (e) {}
      label();
    });
    if (media && media.addEventListener) media.addEventListener('change', label);
  }
})();
