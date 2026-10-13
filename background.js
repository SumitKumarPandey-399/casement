const STUDIO = "studio.html";

chrome.action.onClicked.addListener((tab) => {
  openStudio(tab).catch((error) => {
    console.error("Casement could not open", error);
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command !== "open-casement") return;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab) return;
    openStudio(tab).catch((error) => {
      console.error("Casement could not open", error);
    });
  });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "allow-framing") return false;
  allowFraming(message.origin)
    .then(() => sendResponse({ ok: true }))
    .catch((error) => sendResponse({ ok: false, error: error.message }));
  return true;
});

async function openStudio(tab) {
  const url = new URL(chrome.runtime.getURL(STUDIO));
  if (typeof tab.url === "string" && tab.url.length > 0) {
    url.searchParams.set("url", tab.url);
  }
  if (typeof tab.id === "number") {
    url.searchParams.set("tabId", String(tab.id));
  }
  await chrome.windows.create({
    url: url.href,
    type: "popup",
    width: 1280,
    height: 860,
  });
}

function ruleIdsFor(hostname) {
  let hash = 0;
  for (const char of hostname) {
    hash = (Math.imul(hash, 33) + char.charCodeAt(0)) >>> 0;
  }
  const base = 1000 + (hash % 20000) * 2;
  return [base, base + 1];
}

async function allowFraming(origin) {
  const page = new URL(origin);
  if (page.protocol !== "http:" && page.protocol !== "https:") {
    throw new Error("Only http and https pages can be framed.");
  }
  const hostname = page.hostname;
  const [frameOptionsId, cspId] = ruleIdsFor(hostname);
  const condition = {
    urlFilter: `||${hostname}^`,
    resourceTypes: ["sub_frame"],
  };

  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [frameOptionsId, cspId],
    addRules: [
      {
        id: frameOptionsId,
        priority: 1,
        action: {
          type: "modifyHeaders",
          responseHeaders: [{ header: "x-frame-options", operation: "remove" }],
        },
        condition,
      },
      {
        id: cspId,
        priority: 1,
        action: {
          type: "modifyHeaders",
          responseHeaders: [{ header: "content-security-policy", operation: "remove" }],
        },
        condition: {
          ...condition,
          responseHeaders: [{ header: "content-security-policy", values: ["*frame-ancestors*"] }],
        },
      },
    ],
  });
}
