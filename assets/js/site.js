(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const servicesSection = document.querySelector('.services-section');
  const yearElement = document.getElementById('current-year');
  const teamButtons = Array.from(document.querySelectorAll('.team-member[data-profile-target]'));
  const teamProfilePanel = document.querySelector('.team-profile-panel');
  const teamProfiles = Array.from(document.querySelectorAll('.team-profile'));
  const teamProfileClose = document.querySelector('.team-profile-close');
  const navLinks = links ? Array.from(links.querySelectorAll('a')) : [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const currentPageName = window.location.pathname.split('/').pop() || 'index.html';
  const isHomepage = currentPageName === 'index.html';
  let scrollFrame = null;
  let activeTeamButton = null;

  const homeLink = navLinks.find(function (link) {
    const href = link.getAttribute('href') || '';
    return href === 'index.html' || href === './' || href === '/';
  });

  const sectionLinks = navLinks
    .map(function (link) {
      const href = link.getAttribute('href') || '';

      if (!href.startsWith('#')) {
        return null;
      }

      const section = document.querySelector(href);
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  function setActiveLink(activeLink) {
    navLinks.forEach(function (link) {
      const isActive = link === activeLink;
      link.classList.toggle('active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', link.hash ? 'location' : 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function currentPageLink() {
    return navLinks.find(function (link) {
      const href = link.getAttribute('href') || '';

      if (!href || href.startsWith('#')) {
        return false;
      }

      const linkPage =
        new URL(href, window.location.href)
          .pathname
          .split('/')
          .pop() || 'index.html';

      return linkPage === currentPageName;
    });
  }

  function updateActiveNavigation(scrollTop) {
    if (!isHomepage || !sectionLinks.length) {
      setActiveLink(currentPageLink());
      return;
    }

    if (scrollTop <= 4) {
      setActiveLink(homeLink);
      return;
    }

    const pageBottom = scrollTop + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (pageBottom >= documentHeight - 4) {
      const contactLink = sectionLinks.find(function (item) {
        return item.section.id === 'kontakt';
      });

      setActiveLink(
        contactLink
          ? contactLink.link
          : sectionLinks[sectionLinks.length - 1].link
      );
      return;
    }

    const headerHeight = header
      ? header.getBoundingClientRect().height
      : 0;

    const readingLine = scrollTop + headerHeight + 160;
    let activeLink = homeLink;

    sectionLinks.forEach(function (item) {
      const sectionTop =
        item.section.getBoundingClientRect().top + scrollTop;

      if (sectionTop <= readingLine) {
        activeLink = item.link;
      }
    });

    setActiveLink(activeLink);
  }

  function updateScrollEffects() {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;

    if (header) {
      header.classList.toggle('is-compact', scrollTop > 40);
    }

    if (hero && !reduceMotion.matches) {
      const shift = Math.min(72, scrollTop * 0.16);

      hero.style.setProperty(
        '--hero-parallax',
        shift.toFixed(1) + 'px'
      );
    }

    if (servicesSection && !reduceMotion.matches) {
      const sectionRect = servicesSection.getBoundingClientRect();
      const sectionCenter =
        sectionRect.top + sectionRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const centerOffset = sectionCenter - viewportCenter;
      const shift = Math.max(
        -58,
        Math.min(58, centerOffset * -0.09)
      );

      servicesSection.style.setProperty(
        '--services-parallax',
        shift.toFixed(1) + 'px'
      );
    }

    updateActiveNavigation(scrollTop);
    scrollFrame = null;
  }

  function requestScrollUpdate() {
    if (scrollFrame === null) {
      scrollFrame =
        window.requestAnimationFrame(updateScrollEffects);
    }
  }

  function closeTeamProfile(returnFocus) {
    teamButtons.forEach(function (button) {
      button.setAttribute('aria-expanded', 'false');
    });

    teamProfiles.forEach(function (profile) {
      profile.hidden = true;
    });

    if (teamProfilePanel) {
      teamProfilePanel.hidden = true;
    }

    if (returnFocus && activeTeamButton) {
      activeTeamButton.focus();
    }

    activeTeamButton = null;
  }

  function toggleTeamProfile(button) {
    if (!teamProfilePanel) {
      return;
    }

    const targetId =
      button.getAttribute('data-profile-target');

    const targetProfile = targetId
      ? document.getElementById(targetId)
      : null;

    if (!targetProfile) {
      return;
    }

    if (button === activeTeamButton) {
      closeTeamProfile(false);
      return;
    }

    const panelWasHidden = teamProfilePanel.hidden;

    teamButtons.forEach(function (item) {
      item.setAttribute(
        'aria-expanded',
        String(item === button)
      );
    });

    teamProfiles.forEach(function (profile) {
      profile.hidden = profile !== targetProfile;
    });

    teamProfilePanel.hidden = false;
    activeTeamButton = button;

    if (panelWasHidden) {
      window.requestAnimationFrame(function () {
        teamProfilePanel.scrollIntoView({
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
          block: 'nearest'
        });
      });
    }
  }

  if (yearElement) {
    yearElement.textContent =
      String(new Date().getFullYear());
  }

  teamButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      toggleTeamProfile(button);
    });
  });

  if (teamProfileClose) {
    teamProfileClose.addEventListener('click', function () {
      closeTeamProfile(true);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      teamProfilePanel &&
      !teamProfilePanel.hidden
    ) {
      closeTeamProfile(true);
    }
  });

  updateScrollEffects();

  window.addEventListener(
    'scroll',
    requestScrollUpdate,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    requestScrollUpdate
  );

  window.addEventListener(
    'hashchange',
    requestScrollUpdate
  );

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');

      toggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    });

    links.addEventListener('click', function (event) {
      const clickedLink = event.target.closest('a');

      if (!clickedLink) {
        return;
      }

      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      const href =
        clickedLink.getAttribute('href') || '';

      if (clickedLink === homeLink && isHomepage) {
        event.preventDefault();

        if (window.location.hash) {
          window.history.replaceState(
            null,
            '',
            window.location.pathname +
              window.location.search
          );
        }

        window.scrollTo({
          top: 0,
          behavior: reduceMotion.matches
            ? 'auto'
            : 'smooth'
        });

        setActiveLink(homeLink);
        return;
      }

      if (
        href.startsWith('#') &&
        document.querySelector(href)
      ) {
        setActiveLink(clickedLink);
      }
    });
  }
}());
