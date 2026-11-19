(() => {
  let host = null;

  const BUTTONS = [
    { target: "google", label: "🔍 Google" },
    { target: "claude", label: "✨ Claude" },
    { target: "chatgpt", label: "💬 ChatGPT" }
  ];

  function removeToolbar() {
    if (host) {
      host.remove();
      host = null;
    }
  }

  function showToolbar(text, rect) {
    removeToolbar();

    host = document.createElement("div");
    host.style.cssText = "all: initial; position: absolute; z-index: 2147483647;";
    const shadow = host.attachShadow({ mode: "closed" });

    const bar = document.createElement("div");
    bar.style.cssText = [
      "display: flex",
      "gap: 4px",
      "padding: 4px",
      "background: #202124",
      "border-radius: 999px",
      "box-shadow: 0 2px 10px rgba(0,0,0,.35)",
      "font: 600 13px system-ui, sans-serif"
    ].join(";");

    BUTTONS.forEach(({ target, label }) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.style.cssText = [
        "font: inherit",
        "padding: 6px 12px",
        "border: none",
        "border-radius: 999px",
        "background: transparent",
        "color: #fff",
        "cursor: pointer",
        "white-space: nowrap"
      ].join(";");
      btn.addEventListener("mouseenter", () => (btn.style.background = "#3c4043"));
      btn.addEventListener("mouseleave", () => (btn.style.background = "transparent"));
      // mousedown (not click) so the selection isn't lost before we use it
      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        chrome.runtime.sendMessage({ type: "OPEN", target, text });
        removeToolbar();
      });
      bar.appendChild(btn);
    });

    shadow.appendChild(bar);
    document.documentElement.appendChild(host);

    const top = window.scrollY + rect.bottom + 8;
    const left = window.scrollX + rect.left;
    host.style.top = top + "px";
    host.style.left = Math.max(4, left) + "px";
  }

  function handleSelection(requireMultiWord) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const text = sel.toString().trim();
    if (!text) return;
    if (requireMultiWord && !/\s/.test(text)) return;
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    if (!rect.width && !rect.height) return;
    showToolbar(text, rect);
  }

  // Double-click a word -> toolbar
  document.addEventListener("dblclick", () => handleSelection(false));

  // Drag-select (or triple-click) several words/sentences -> toolbar too
  document.addEventListener("mouseup", (e) => {
    if (host && e.composedPath().includes(host)) return;
    setTimeout(() => handleSelection(true), 10);
  });

  // Dismiss when clicking elsewhere or pressing Esc
  document.addEventListener("mousedown", (e) => {
    if (host && !e.composedPath().includes(host)) removeToolbar();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") removeToolbar();
  });
})();
