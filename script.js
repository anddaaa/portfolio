// Media slots: a slot shows a dashed placeholder until the image or video
// file it points to actually exists in assets/projects/.
(function () {
  document.querySelectorAll('.media').forEach(function (figure) {
    var el = figure.querySelector('img, video');
    if (!el) return;

    var isVideo = el.tagName === 'VIDEO';
    var show = function () { figure.classList.add('has-media'); };
    var hide = function () { figure.classList.remove('has-media'); };

    el.addEventListener(isVideo ? 'loadeddata' : 'load', show);
    el.addEventListener('error', hide, true);

    if (!isVideo && el.complete && el.naturalWidth > 0) show();
    if (isVideo && el.readyState >= 2) show();
  });

  // "See more" panels
  document.querySelectorAll('.more-btn').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    var label = btn.querySelector('.lbl');
    if (!panel || !label) return;
    var closedText = label.textContent;

    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
      label.textContent = open ? 'close' : closedText;
    };

    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });

    // A "close" button at the end of the panel closes it without
    // needing to scroll back up to the toggle button.
    var closeBtn = panel.querySelector('.more-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setOpen(false);
        btn.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    }
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Highlight the nav pill for the section currently in view, so the
  // top bar shows where you are on the page, not just where a click takes you.
  var navLinks = Array.prototype.filter.call(
    document.querySelectorAll('.bar__nav a[href^="#"]'),
    function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }
  );
  if (navLinks.length) {
    var sections = navLinks.map(function (a) {
      return { link: a, el: document.getElementById(a.getAttribute('href').slice(1)) };
    });

    var setActive = function () {
      var atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      var pos = window.scrollY + 140;
      var current = sections[0];
      sections.forEach(function (s) {
        if (atBottom || s.el.offsetTop <= pos) current = s;
      });
      navLinks.forEach(function (a) { a.classList.remove('is-active'); });
      current.link.classList.add('is-active');
    };

    document.addEventListener('scroll', setActive, { passive: true });
    window.addEventListener('resize', setActive);
    setActive();
  }
})();
