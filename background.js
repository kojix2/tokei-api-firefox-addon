/**
 * Handler for browser action button click
 */
chrome.browserAction.onClicked.addListener((tab) => {
  try {
    const result = generateTokeiUrl(tab.url);
    
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
