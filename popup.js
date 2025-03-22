/**
 * Popup UI initialization and functionality implementation
 */
document.addEventListener('DOMContentLoaded', () => {
  const openButton = document.getElementById('openTokei');
  
  // Set button enabled/disabled state based on current tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    updateButtonState(openButton, activeTab.url);
  });
  
  // Handle button click event
  openButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      try {
        const activeTab = tabs[0];
        const result = generateTokeiUrl(activeTab.url);
        
        if (result.success) {
          chrome.tabs.create({ url: result.url });
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An unexpected error occurred.');
      }
    });
  });
});

/**
 * Update button state based on URL
 * @param {HTMLButtonElement} button - Button element to update
 * @param {string} url - Current URL
 */
function updateButtonState(button, url) {
  const isGitHubRepo = url && url.includes('github.com') && url.split('/').length >= 5;
  
  button.disabled = !isGitHubRepo;
  
  if (isGitHubRepo) {
    button.style.backgroundColor = COLORS.primary;
    button.title = 'Click to open in Tokei API';
  } else {
    button.style.backgroundColor = COLORS.disabled;
    button.title = 'Please open a GitHub repository page';
  }
}
