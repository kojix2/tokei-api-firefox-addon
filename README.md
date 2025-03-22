# Tokei API Opener

A Firefox extension that allows you to easily open the corresponding [Tokei API](https://tokei.kojix2.net/) page while browsing GitHub repository pages.

## Features

- Displays an "Open in Tokei" button on GitHub repository pages
- Open via the extension icon in the browser toolbar
- Open from the popup interface

## Installation

### Temporary Installation (for development)

1. Open Firefox
2. Enter `about:debugging` in the address bar
3. Click "This Firefox"
4. Click "Load Temporary Add-on" button
5. Select the `manifest.json` file

### Official Installation

1. Package the repository as a ZIP file
2. Upload to the Firefox Add-ons site

## Usage

1. Open a GitHub repository page (e.g., `https://github.com/username/repository`)
2. Click the "Open in Tokei" button displayed in the bottom right corner of the screen
3. Or, click the extension icon in the browser toolbar

## Development

### File Structure

- `manifest.json`: Extension configuration file
- `background.js`: Background script
- `content.js`: Script injected into GitHub pages
- `popup.html`: Popup UI
- `popup.js`: Popup script
- `utils.js`: Common utility functions
- `icons/`: Icon files

### Building

There are no special build steps. Just edit the files and reload the extension.

### Releasing

This project uses GitHub Actions to automatically create releases when a new tag is pushed. To create a new release:

1. Update the version number in `manifest.json`
2. Commit your changes
3. Create and push a new tag:
   ```bash
   git tag v1.0.0  # Replace with your version
   git push origin v1.0.0
   ```
4. GitHub Actions will automatically build the extension and create a release with the ZIP file attached

## License

MIT

kojix2 generated the code using VSCode + Cline + Claude-3.7-sonnet
