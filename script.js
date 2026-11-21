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

// ---------------------------------------------------------------------
// Interactive layer: scroll reveals, progress bar, hero letters,
// pointer parallax, project card tilt. Safe on pages that lack these
// elements, and mostly skipped when the visitor prefers reduced motion.
// ---------------------------------------------------------------------
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 1. Scroll reveals (.reveal, .rv, and .stagger lists)
  document.querySelectorAll('.stagger').forEach(function (list) {
    Array.prototype.forEach.call(list.children, function (child, i) {
      child.style.setProperty('--i', i);
    });
  });
  var revealItems = document.querySelectorAll('.reveal, .rv, .stagger');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach(function (el) { io.observe(el); });
  }
  // Cards in the same board come in one after another
  document.querySelectorAll('.board .card, .boxes .box').forEach(function (el, i, all) {
    var siblings = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--i', siblings);
  });

  // 2. Hero title: split "portfolio" into letters
  var title = document.querySelector('.hero__title');
  if (title) {
    var node = title.lastChild;
    if (node && node.nodeType === 3 && node.textContent.trim()) {
      var word = node.textContent.trim();
      var wrap = document.createElement('span');
      wrap.setAttribute('aria-hidden', 'true');
      word.split('').forEach(function (c, i) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.style.setProperty('--i', i);
        s.textContent = c;
        wrap.appendChild(s);
      });
      var label = document.createElement('span');
      label.className = 'sr-only';
      label.textContent = word;
      title.replaceChild(wrap, node);
      title.appendChild(label);
    }
  }

  // 3. Scroll progress + project number drift (one rAF-throttled handler)
  var progress = document.querySelector('.progress');
  var numbers = reduce ? [] : Array.prototype.slice.call(document.querySelectorAll('.project-row__number'));
  var ticking = false;
  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (progress) progress.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    var vh = window.innerHeight;
    numbers.forEach(function (n) {
      var r = n.parentNode.getBoundingClientRect();
      var center = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 around screen center
      n.style.setProperty('--np', (center * -40).toFixed(1) + 'px');
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  if (reduce || !fine) return;

  // 4. Hero pointer parallax (title, script word and blobs move in layers)
  var hero = document.querySelector('.hero');
  if (hero) {
    var blobs = hero.querySelectorAll('.hero__blobs span');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      hero.style.setProperty('--tx', (x * 14).toFixed(1) + 'px');
      hero.style.setProperty('--ty', (y * 10).toFixed(1) + 'px');
      blobs.forEach(function (b, i) {
        var k = (i + 1) * 30;
        b.style.setProperty('--mx', (x * k).toFixed(1) + 'px');
        b.style.setProperty('--my', (y * k).toFixed(1) + 'px');
      });
    });
    hero.addEventListener('pointerleave', function () {
      hero.style.setProperty('--tx', '0px');
      hero.style.setProperty('--ty', '0px');
    });
  }

  // 5. Project cards: tilt toward the pointer, with a light sheen
  document.querySelectorAll('.project-feature').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width;
      var y = (e.clientY - r.top) / r.height;
      card.classList.add('is-tilting');
      card.style.setProperty('--ry', ((x - 0.5) * 10).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
      card.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
    });
    card.addEventListener('pointerleave', function () {
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
})();
