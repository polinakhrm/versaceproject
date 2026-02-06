// Carousel functionality for collection modals
document.addEventListener('DOMContentLoaded', function() {
  // Get all modal radio buttons
  const modalRadios = document.querySelectorAll('.modal-toggle[type="radio"]');
  
  // Helper function to check if modal is visible
  function isModalVisible(overlay) {
    const style = window.getComputedStyle(overlay);
    return style.display === 'flex';
  }
  
  // Helper function to get visible modal
  function getVisibleModal() {
    const overlays = document.querySelectorAll('.modal-overlay');
    for (let overlay of overlays) {
      if (isModalVisible(overlay)) {
        return overlay;
      }
    }
    return null;
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Only handle if a modal is open
    const activeModal = getVisibleModal();
    if (!activeModal) return;
    
    // Get the current checked radio (excluding close button)
    const currentRadio = document.querySelector('.modal-toggle[type="radio"]:checked:not([id$="-close"])');
    if (!currentRadio) return;
    
    const radioName = currentRadio.getAttribute('name');
    // Get all radios in the group except the close button
    const allRadiosInGroup = Array.from(document.querySelectorAll(`input[name="${radioName}"]:not([id$="-close"])`));
    const currentIndex = allRadiosInGroup.indexOf(currentRadio);
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      // Go to previous
      if (currentIndex > 0) {
        allRadiosInGroup[currentIndex - 1].checked = true;
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      // Go to next
      if (currentIndex < allRadiosInGroup.length - 1) {
        allRadiosInGroup[currentIndex + 1].checked = true;
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Close modal
      const closeRadio = document.querySelector(`input[name="${radioName}"][id$="-close"]`);
      if (closeRadio) {
        closeRadio.checked = true;
      }
    }
  });
  
  // Smooth scroll to top when modal opens
  modalRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked && !this.id.includes('-close')) {
        // Small delay to ensure modal is visible
        setTimeout(() => {
          const modalContent = document.querySelector(`#modal-overlay-${this.id.replace('modal-', '')}`);
          if (modalContent) {
            modalContent.scrollTop = 0;
          }
        }, 10);
      }
    });
  });
  
  // Prevent body scroll when modal is open
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const activeModal = document.querySelector('.modal-overlay[style*="flex"]');
        if (activeModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  });
  
  // Observe all modal overlays
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    observer.observe(overlay, { attributes: true, attributeFilter: ['style'] });
  });
  
  // Check initial state
  const initialActiveModal = document.querySelector('.modal-overlay[style*="flex"]');
  if (initialActiveModal) {
    document.body.style.overflow = 'hidden';
  }
});

