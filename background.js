// Opens the chosen service in a new tab next to the current one, with the selected text pre-filled.
const TARGETS = {
  google: (q) => "https://www.google.com/search?q=" + encodeURIComponent(q),
  claude: (q) => "https://claude.ai/new?q=" + encodeURIComponent(q),
  chatgpt: (q) => "https://chatgpt.com/?q=" + encodeURIComponent(q)
};

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (!msg || msg.type !== "OPEN" || !msg.text) return;
  const build = TARGETS[msg.target];
  if (!build) return;
  chrome.tabs.create({
    url: build(msg.text.slice(0, 4000)),
    active: true,
    index: sender.tab ? sender.tab.index + 1 : undefined
  });
});
