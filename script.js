const VALID_SECTIONS = new Set(['overview', 'work', 'about', 'contact']);

function getSectionFromHash() {
  const hash = window.location.hash.replace('#', '');
  return VALID_SECTIONS.has(hash) ? hash : 'overview';
}

function showSection(section, { updateHash = true } = {}) {
  if (!VALID_SECTIONS.has(section)) section = 'overview';

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.getAttribute('data-section') === section);
  });

  const hero = document.querySelector('.hero');
  const panels = document.querySelectorAll('.section-panel');

  if (section === 'overview') {
    panels.forEach((panel) => panel.classList.remove('active'));
    if (hero) hero.classList.add('active');
  } else {
    if (hero) hero.classList.remove('active');
    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.getAttribute('data-content') === section);
    });
  }

  if (updateHash) {
    const nextHash = `#${section}`;
    if (window.location.hash !== nextHash) {
      history.pushState(null, '', nextHash);
    }
  }
}

document.querySelectorAll('[data-section]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const section = link.getAttribute('data-section');
    if (!VALID_SECTIONS.has(section)) return;
    e.preventDefault();
    showSection(section);
  });
});

function updateProgress(reader, scroll) {
  const bar = reader.querySelector('.case-progress-bar');
  if (!bar) return;
  const max = scroll.scrollHeight - scroll.clientHeight;
  const ratio = max > 0 ? scroll.scrollTop / max : 0;
  bar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}

function initCaseReaders() {
  document.querySelectorAll('.case-reader').forEach((reader) => {
    const scroll = reader.querySelector('.case-reader-scroll');
    const tocLinks = reader.querySelectorAll('.case-toc-link');
    const sections = reader.querySelectorAll('.case-section');
    if (!scroll || !tocLinks.length || !sections.length) return;

    const setActive = (id) => {
      tocLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('data-target') === id);
      });
    };

    tocLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('data-target');
        const target = reader.querySelector(`#${id}`);
        if (!target) return;
        setActive(id);
        const top = target.offsetTop - sections[0].offsetTop;
        scroll.scrollTo({ top, behavior: 'smooth' });
      });
    });

    scroll.addEventListener('scroll', () => updateProgress(reader, scroll), { passive: true });
    updateProgress(reader, scroll);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        root: scroll,
        rootMargin: '-10% 0px -55% 0px',
        threshold: [0.15, 0.4, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
  });
}

function initCaseStudyNavigation() {
  const caseNavItems = document.querySelectorAll('.case-nav-item');

  const activateCase = (item) => {
    caseNavItems.forEach((i) => i.classList.remove('active'));
    item.classList.add('active');

    const caseId = item.getAttribute('data-case');
    document.querySelectorAll('.case-display-content').forEach((content) => {
      const isActive = content.getAttribute('data-content') === caseId;
      content.classList.toggle('active', isActive);
      if (isActive) {
        const reader = content.querySelector('.case-reader');
        const scroll = content.querySelector('.case-reader-scroll');
        if (scroll) {
          scroll.scrollTop = 0;
          if (reader) updateProgress(reader, scroll);
        }
        content.querySelectorAll('.case-toc-link').forEach((link, index) => {
          link.classList.toggle('active', index === 0);
        });
      }
    });
  };

  caseNavItems.forEach((item) => {
    item.addEventListener('click', () => activateCase(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateCase(item);
      }
    });
  });
}

function initFromHash() {
  showSection(getSectionFromHash(), { updateHash: false });
  if (!window.location.hash) {
    history.replaceState(null, '', '#overview');
  }
}

window.addEventListener('hashchange', () => {
  showSection(getSectionFromHash(), { updateHash: false });
});

window.addEventListener('popstate', () => {
  showSection(getSectionFromHash(), { updateHash: false });
});

document.addEventListener('DOMContentLoaded', () => {
  initCaseStudyNavigation();
  initCaseReaders();
  initFromHash();
});
