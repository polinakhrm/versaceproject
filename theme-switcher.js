// Theme Switcher JavaScript
// Handles theme switching across all pages

(function() {
  'use strict';
  
  function injectAboutMenu() {
    const aboutLink = document.querySelector('.site-header .main-nav a[href="aboutus.html"]');
    if (!aboutLink || aboutLink.closest('.about-menu-wrap')) {
      return;
    }

    const menuWrap = document.createElement('div');
    menuWrap.className = 'about-menu-wrap';

    aboutLink.classList.add('about-menu-trigger');
    aboutLink.setAttribute('aria-haspopup', 'true');
    aboutLink.setAttribute('aria-expanded', 'false');

    const dropdown = document.createElement('div');
    dropdown.className = 'about-menu-dropdown';
    dropdown.setAttribute('role', 'menu');
    dropdown.innerHTML = [
      '<a role="menuitem" href="aboutus.html">About us</a>',
      '<a role="menuitem" href="disclaimer.html">Disclaimer</a>',
      '<a role="menuitem" href="documentation.html">Documentation</a>'
    ].join('');

    aboutLink.parentNode.insertBefore(menuWrap, aboutLink);
    menuWrap.appendChild(aboutLink);
    menuWrap.appendChild(dropdown);

    function closeMenu() {
      menuWrap.classList.remove('open');
      aboutLink.setAttribute('aria-expanded', 'false');
    }

    aboutLink.addEventListener('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      const isOpen = menuWrap.classList.toggle('open');
      aboutLink.setAttribute('aria-expanded', String(isOpen));
    });

    dropdown.addEventListener('click', function() {
      closeMenu();
    });

    document.addEventListener('click', function(event) {
      if (!menuWrap.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  // Initialize theme switcher when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    injectAboutMenu();
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const stylesheet = document.getElementById('theme-stylesheet');
    
    if (!stylesheet) {
      console.warn('Theme stylesheet not found');
      return;
    }

    // theme-oos uses future.css
    function getStylesheetFilename(theme) {
      return (theme === 'oos' ? 'future' : theme) + '.css';
    }

    // Function to switch theme
    function switchTheme(theme) {
      if (stylesheet) {
        stylesheet.href = getStylesheetFilename(theme);
        localStorage.setItem('theme', theme);
        document.body.classList.toggle('future-theme', theme === 'oos');
        
        // Update the checked radio button
        const radio = document.getElementById('theme-' + theme);
        if (radio) {
          radio.checked = true;
        }
      }
    }

    // Add event listeners to theme radio buttons
    themeRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.checked) {
          const theme = this.id.replace('theme-', '');
          switchTheme(theme);
        }
      });
    });

    // Load saved theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const radio = document.getElementById('theme-' + savedTheme);
      if (radio) {
        radio.checked = true;
        stylesheet.href = getStylesheetFilename(savedTheme);
        document.body.classList.toggle('future-theme', savedTheme === 'oos');
      }
    } else {
      // Default to default theme if no preference saved
      const defaultRadio = document.getElementById('theme-default');
      if (defaultRadio) {
        defaultRadio.checked = true;
        stylesheet.href = 'default.css';
      }
    }
  });
})();

