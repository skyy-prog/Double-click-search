# Double-Click Search (v1.1)

Select text on any web page and get a small toolbar with three buttons. Click one and the selected text is searched or asked in a **new tab**, right next to the tab you are on. No more copy, open tab, paste.

| Button | What it does |
|---|---|
| 🔍 Google | Opens a Google search for the selected text |
| ✨ Claude | Opens claude.ai with the text filled into a new chat |
| 💬 ChatGPT | Opens ChatGPT with the text filled into a new chat |

This is the version that opens each AI in a new tab. It needs **no API key** and no payment beyond whatever your Claude or ChatGPT account already has.

---

## Files

```
manifest.json    Extension settings
background.js    Opens the new tab with your text
content.js       Shows the toolbar when you select text
```

---

## Install (about 1 minute)

1. Unzip `double-click-search.zip` into a folder. Keep the folder, because Chrome reads the extension from it.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and choose the unzipped folder.
5. Reload any tabs that were already open. The extension only works on pages loaded after you install it.

Works in Edge and Brave the same way (`edge://extensions`, `brave://extensions`).

## Update to a new version

Unzip the new zip over the old folder, then go to `chrome://extensions` and click the refresh icon on the extension. Reload your open tabs.

---

## How to use

1. **Double-click** a word, or **drag-select** several words or a sentence (triple-click selects a whole paragraph).
2. A dark toolbar appears under your selection.
3. Click **Google**, **Claude** or **ChatGPT**.
4. A new tab opens next to the current one with your text already filled in.

Dismiss the toolbar by pressing **Esc** or clicking anywhere else.

Example: you are watching a song on YouTube. Double-click the artist's name, click **Google**, and the search opens in a new tab.

---

## Good to know

- Claude and ChatGPT fill the text in through a link (`?q=`). Depending on the site, you may need to press **Enter** to send it. You must be logged in to see your chat.
- If either site changes how that link works, the text may not fill in automatically and the extension would need an update.
- Text longer than 4,000 characters is cut off, because it travels in the page address.
- It does not work on Chrome's own pages (`chrome://...`) or the Chrome Web Store, because Chrome blocks extensions there.
- The toolbar also appears when you select several words just to copy them. Press Esc to dismiss it.

---

## Customize

**Change the search engine or add another AI.** Open `background.js` and edit the `TARGETS` list. Each line is a name and a link pattern:

```js
const TARGETS = {
  google:  (q) => "https://www.google.com/search?q=" + encodeURIComponent(q),
  claude:  (q) => "https://claude.ai/new?q=" + encodeURIComponent(q),
  chatgpt: (q) => "https://chatgpt.com/?q=" + encodeURIComponent(q)
};
```

Examples of other links you can add:

- DuckDuckGo: `https://duckduckgo.com/?q=`
- YouTube: `https://www.youtube.com/results?search_query=`
- Perplexity: `https://www.perplexity.ai/search?q=`

Then add a matching entry to the `BUTTONS` list at the top of `content.js`, for example `{ target: "youtube", label: "▶ YouTube" }`.

**Show the toolbar only on double-click.** In `content.js`, delete the `mouseup` listener near the bottom (the one with the comment about drag-select).

After any change, click the refresh icon on the extension in `chrome://extensions` and reload your tabs.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Toolbar never appears | Reload the page. Check the extension is on in `chrome://extensions`. It won't run on `chrome://` pages. |
| Text doesn't fill in on Claude or ChatGPT | Make sure you're logged in. The site may have changed its link format. Paste the text manually in that case. |
| "Manifest file is missing or unreadable" | You selected the wrong folder. Pick the folder that directly contains `manifest.json`. |
| Chrome warns about developer mode extensions | Normal for unpacked extensions. Dismiss it, or publish to the Web Store. |

---

## Privacy

Nothing is stored and nothing is sent anywhere except to the site you click (Google, Claude or ChatGPT), and only when you click its button. There is no tracking, no analytics, and no server.
