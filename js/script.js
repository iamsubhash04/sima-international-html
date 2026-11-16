document.addEventListener('DOMContentLoaded', function () {
  const MOBILE_MAX = 991;
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const dropdowns = document.querySelectorAll('.has-dropdown');

  if (!menuToggle || !navMenu) return;

  const isMobile = () => window.innerWidth <= MOBILE_MAX;

  function closeDropdowns(except) {
    dropdowns.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('active');
      const t = item.querySelector('.dropdown-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    closeDropdowns();
  }

  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    const open = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    if (!open) closeDropdowns();
  });

  dropdowns.forEach(function (item) {
    const trigger = item.querySelector('.dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (!isMobile()) return;

      const willOpen = !item.classList.contains('active');
      closeDropdowns(item);
      item.classList.toggle('active', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
  });

  navMenu.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (link && !link.classList.contains('dropdown-trigger') && isMobile()) {
      closeMenu();
    }
  });

  document.addEventListener('click', function (e) {
    if (isMobile() && !e.target.closest('.navbar')) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function () {
    if (!isMobile()) closeMenu();
  });
});
