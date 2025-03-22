/**
 * Add a floating button to GitHub pages
 */
function createFloatingButton() {
  // Don't create if it already exists
  if (document.getElementById('tokei-api-button')) {
    return;
  }

  const button = document.createElement('button');
  button.id = 'tokei-api-button';
  button.textContent = 'Open in Tokei';
  button.setAttribute('aria-label', 'Open in Tokei API');
  button.setAttribute('title', 'Open this repository in Tokei API');
  
  // Style settings
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '10000';
  button.style.padding = '10px 15px';
  button.style.backgroundColor = COLORS.primary;
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  button.style.transition = 'all 0.3s ease';
  button.style.fontSize = '14px';
  
  // Hover effects
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = COLORS.hover;
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
  });
  
  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = button.disabled ? COLORS.disabled : COLORS.primary;
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  });

  // Click event
  button.addEventListener('click', () => {
    try {
      const result = generateTokeiUrl(window.location.href);
      
      if (result.success) {
        window.open(result.url, '_blank');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An unexpected error occurred.');
    }
  });

  document.body.appendChild(button);
  return button;
}

/**
 * Update button state based on URL
 */
function updateButtonState() {
  const button = document.getElementById('tokei-api-button');
  if (!button) return;
  
  const result = generateTokeiUrl(window.location.href);
  button.disabled = !result.success;
  
  if (result.success) {
    button.style.backgroundColor = COLORS.primary;
    button.style.cursor = 'pointer';
    button.title = 'Open this repository in Tokei API';
  } else {
    button.style.backgroundColor = COLORS.disabled;
    button.style.cursor = 'not-allowed';
    button.title = result.message;
  }
}

// Create button when page loading is complete
window.addEventListener('load', () => {
  createFloatingButton();
  updateButtonState();
});

// MutationObserver to detect URL changes
const observer = new MutationObserver((mutations) => {
  // Detect title changes (to detect GitHub SPA transitions)
  const titleChanged = mutations.some(mutation => 
    mutation.target.nodeName === 'TITLE' || 
    [...mutation.addedNodes].some(node => node.nodeName === 'TITLE')
  );
  
  if (titleChanged || window.location.href !== lastUrl) {
    lastUrl = window.location.href;
    
    // Create button if it doesn't exist, otherwise update state
    const button = document.getElementById('tokei-api-button') || createFloatingButton();
    updateButtonState();
  }
});

// Record current URL
let lastUrl = window.location.href;

// Observer configuration
observer.observe(document, { 
  childList: true, 
  subtree: true,
  attributes: false,
  characterData: false
});

// Initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFloatingButton);
} else {
  createFloatingButton();
  updateButtonState();
}
