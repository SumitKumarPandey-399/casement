# Casement

Casement is an open-source Chrome extension that previews the page you are on inside a phone, tablet, laptop, desktop, or other screen size. It is a layout preview: the page is shown at that screen's width and height. It does not change the browser's user agent, pixel ratio, or touch behavior.

The source is released under the [MIT License](LICENSE).

## What you can do

- Open the current `http` or `https` tab in a device-sized frame.
- Search 96 built-in devices by name, brand, or category.
- Star favorites and reopen the last 8 devices you chose.
- Rotate between portrait and landscape.
- Zoom from 50% to 150%, or choose **Fit** so the frame fills the window.
- Show or hide the device frame.
- Allow a site that refuses to be shown inside a frame.

## Device list

| Category | Examples |
| --- | --- |
| Phones | iPhone SE through iPhone 18 Pro Max, Pixel 7–11, Galaxy S and A series, Redmi Note 14, Moto G Power, JioPhone 2 |
| Foldables | iPhone Duo, Galaxy Z Fold, Pixel Fold, Surface Duo, Asus Zenbook Fold |
| Tablets | iPad mini, iPad Air, iPad Pro, Galaxy Tab, Surface Pro |
| Laptops | MacBook Air and Pro, Surface Laptop, common Windows sizes |
| Desktops | 1080p, 1440p, iMac 24-inch |
| Other | Apple Watch, Smart TV 1080p, portrait kiosk, Steam Deck |

Viewport sizes are layout widths and heights. Frames are generic drawings, not a manufacturer's artwork.

## Install in Chrome

1. Clone this repository, or download it and unzip it.
2. Open Chrome and go to `chrome://extensions`.
3. Turn **Developer mode** on. The switch is at the top right of that page.
4. Click **Load unpacked**. That button appears at the top left only after Developer mode is on.
5. Select the `casement` folder (the folder that contains `manifest.json`).

Casement then appears in the extension list. If you do not see its icon, click the puzzle-piece button beside the address bar and pin **Casement**.

After you pull new code, open `chrome://extensions` and click the reload icon on the Casement card.

## How to use it

1. Open a normal website, such as `https://example.com`.
2. Click the **Casement** icon, or press **Alt+Shift+C**.
3. Type in **Search devices**. An empty search shows Favorites, Recent, then each category. A typed search lists matches only, with names that start with your text first.
4. Click a device to preview the page at that size. Click the star to save or remove a favorite.
5. Use **Rotate**, **Zoom**, and **Frame** in the toolbar.
6. You can change the address in the URL field and press Enter.

If the preview stays blank, the site is blocking frames. Click **Allow this site**. Chrome asks for permission for that site only, and Casement then removes the frame-blocking headers for the preview.

These pages cannot be previewed:

- `chrome://` pages and other browser pages
- the Chrome Web Store
- addresses that are not `http` or `https`

## Project layout

```text
casement/
  manifest.json    Chrome extension manifest
  background.js    Opens the preview window and allows framing
  studio.html      Preview window
  studio.css       Preview styles
  studio.js        Search, favorites, recents, and the device stage
  devices.js       Device catalog and search rules
  test/            Automated tests
  icons/           Toolbar icons
  LICENSE          MIT License
```

## Tests

Node.js 20 or newer is required. From this folder:

```powershell
npm test
```

The tests check that all 96 devices are present, that search and grouping behave as described, that rotation and fit scaling are correct, and that the manifest points at files in this folder.

## Permissions

| Permission | Why it is used |
| --- | --- |
| `storage` | Saves favorites, recent devices, and the last device on this computer |
| `activeTab` | Reads the address of the tab you open Casement from |
| `declarativeNetRequestWithHostAccess` | Removes frame-blocking headers after you allow a site |
| optional `<all_urls>` | Requested only when you click **Allow this site** |

Casement does not add analytics, accounts, or its own servers. Favorites and recents stay in Chrome local storage.

## Limits

- This is a layout preview. Media queries that depend on width, height, and orientation follow the selected device. The page still sees your computer's browser.
- **Fit** keeps the whole device visible, so a tall phone in a wide window still has space on the sides.
- Some sites keep working only in a top-level tab even after you allow framing.

## License

[MIT](LICENSE). You can use, copy, modify, and share this project. Include the copyright notice and license text when you distribute it.
