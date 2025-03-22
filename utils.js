/**
 * Tokei API Opener utility functions
 */

/**
 * Extract username and repository name from GitHub URL and generate Tokei API URL
 * @param {string} url - GitHub URL
 * @returns {Object} Result object (success: true, url: tokeiUrl on success, success: false, message: error message on failure)
 */
function generateTokeiUrl(url) {
  try {
    if (!url || !url.includes('github.com')) {
      return {
        success: false,
        message: 'Please open a GitHub page.'
      };
    }

    const urlParts = url.split('/');
    if (urlParts.length < 5) {
      return {
        success: false,
        message: 'Please open a GitHub repository page.'
      };
    }

    const userName = urlParts[3];
    const repoName = urlParts[4];

    if (!userName || !repoName) {
      return {
        success: false,
        message: 'Could not retrieve username or repository name.'
      };
    }

    return {
      success: true,
      url: `https://tokei.kojix2.net/github/${userName}/${repoName}`
    };
  } catch (error) {
    console.error('URL processing error:', error);
    return {
      success: false,
      message: 'An error occurred while processing the URL.'
    };
  }
}

// Common color definitions
const COLORS = {
  primary: '#8A2BE2', // Purple
  hover: '#7B1FA2',   // Dark purple
  disabled: '#A9A9A9' // Gray
};
