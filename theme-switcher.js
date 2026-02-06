// Theme Switcher JavaScript
// Handles theme switching across all pages

(function() {
  'use strict';

  // Initialize theme switcher when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const stylesheet = document.getElementById('theme-stylesheet');
    
    if (!stylesheet) {
      console.warn('Theme stylesheet not found');
      return;
    }

    // Function to switch theme
    function switchTheme(theme) {
      if (stylesheet) {
        stylesheet.href = theme + '.css';
        localStorage.setItem('theme', theme);
        
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
        stylesheet.href = savedTheme + '.css';
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

