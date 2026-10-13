import { DEVICES, findDevice, fitPreviewScale, groupDevices, searchDevices, viewportSize } from "./devices.js";

const RECENT_LIMIT = 8;
const STORAGE_KEY = "casement";

const pageUrlInput = document.querySelector("#page-url");
const searchInput = document.querySelector("#search");
const searchMeta = document.querySelector("#search-meta");
const results = document.querySelector("#results");
const stage = document.querySelector("#stage");
const deviceSlot = document.querySelector("#device-slot");
const deviceEl = document.querySelector("#device");
const preview = document.querySelector("#preview");
const notice = document.querySelector("#notice");
const zoomSelect = document.querySelector("#zoom");
const frameToggle = document.querySelector("#show-frame");

const params = new URLSearchParams(location.search);
const state = {
  url: params.get("url") ?? "",
  query: "",
  deviceId: "iphone-14",
  orientation: "portrait",
  zoom: "fit",
  showFrame: true,
  favorites: [],
  recents: [],
};

pageUrlInput.value = state.url;
searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  renderList();
});
pageUrlInput.addEventListener("change", () => {
  state.url = pageUrlInput.value.trim();
  loadPreview();
});
document.querySelector("#rotate").addEventListener("click", () => {
  state.orientation = state.orientation === "portrait" ? "landscape" : "portrait";
  renderStage();
});
zoomSelect.addEventListener("change", () => {
  state.zoom = zoomSelect.value;
  renderStage();
});
frameToggle.addEventListener("change", () => {
  state.showFrame = frameToggle.checked;
  renderStage();
});
window.addEventListener("resize", () => renderStage());
new ResizeObserver(() => renderStage()).observe(stage);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput && document.activeElement !== pageUrlInput) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    state.query = "";
    renderList();
  }
});

await restore();
renderList();
loadPreview();
renderStage();

function storageArea() {
  return globalThis.chrome?.storage?.local ?? null;
}

async function restore() {
  const area = storageArea();
  if (!area) return;
  const stored = await area.get(STORAGE_KEY);
  const saved = stored[STORAGE_KEY];
  if (!saved || typeof saved !== "object") return;
  if (typeof saved.deviceId === "string") state.deviceId = saved.deviceId;
  if (Array.isArray(saved.favorites)) state.favorites = saved.favorites.filter((id) => typeof id === "string");
  if (Array.isArray(saved.recents)) state.recents = saved.recents.filter((id) => typeof id === "string").slice(0, RECENT_LIMIT);
}

async function persist() {
  const area = storageArea();
  if (!area) return;
  await area.set({
    [STORAGE_KEY]: {
      deviceId: state.deviceId,
      favorites: state.favorites,
      recents: state.recents,
    },
  });
}

function renderList() {
  const matches = searchDevices(DEVICES, state.query);
  results.replaceChildren();
  searchMeta.textContent = state.query.trim()
    ? `${matches.length} match${matches.length === 1 ? "" : "es"}`
    : `${DEVICES.length} devices`;

  if (matches.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = `No devices match “${state.query.trim()}”.`;
    results.append(empty);
    return;
  }

  const sections = state.query.trim()
    ? [{ id: "matches", label: "Matches", devices: matches }]
    : groupDevices(matches, state.favorites, state.recents);

  for (const section of sections) {
    const heading = document.createElement("div");
    heading.className = "section";
    heading.textContent = section.label;
    results.append(heading);
    for (const device of section.devices) results.append(deviceRow(device));
  }
}

function deviceRow(device) {
  const row = document.createElement("div");
  row.className = `device-row${device.id === state.deviceId ? " active" : ""}`;

  const choose = document.createElement("button");
  choose.type = "button";
  choose.className = "choose";
  const title = document.createElement("strong");
  title.textContent = device.name;
  const detail = document.createElement("small");
  detail.textContent = `${device.brand} · ${device.width} × ${device.height}`;
  choose.append(title, detail);
  choose.addEventListener("click", () => selectDevice(device.id));

  const star = document.createElement("button");
  star.type = "button";
  star.className = `star${state.favorites.includes(device.id) ? " on" : ""}`;
  star.textContent = "★";
  star.setAttribute("aria-label", state.favorites.includes(device.id) ? `Remove ${device.name} from favorites` : `Add ${device.name} to favorites`);
  star.addEventListener("click", () => toggleFavorite(device.id));

  row.append(choose, star);
  return row;
}

function selectDevice(id) {
  state.deviceId = id;
  state.recents = [id, ...state.recents.filter((item) => item !== id)].slice(0, RECENT_LIMIT);
  persist();
  renderList();
  renderStage();
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter((item) => item !== id)
    : [id, ...state.favorites];
  persist();
  renderList();
}

function viewportOf(device) {
  return viewportSize(device, state.orientation);
}

function frameChrome() {
  return state.showFrame ? { x: 24, y: 32 } : { x: 0, y: 0 };
}

function renderStage() {
  const device = findDevice(state.deviceId);
  const viewport = viewportOf(device);
  const chrome = frameChrome();
  const outerWidth = viewport.width + chrome.x;
  const outerHeight = viewport.height + chrome.y;
  const scale = state.zoom === "fit" ? fitScale(outerWidth, outerHeight) : Number(state.zoom);

  deviceEl.classList.toggle("framed", state.showFrame);
  deviceEl.style.width = `${outerWidth}px`;
  deviceEl.style.height = `${outerHeight}px`;
  deviceEl.style.transform = `scale(${scale})`;
  deviceSlot.style.width = `${Math.ceil(outerWidth * scale)}px`;
  deviceSlot.style.height = `${Math.ceil(outerHeight * scale)}px`;
}

function fitScale(outerWidth, outerHeight) {
  return fitPreviewScale(outerWidth, outerHeight, stage.clientWidth, stage.clientHeight);
}

function restrictionReason(url) {
  if (!url) return "Enter a page address to preview it.";
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return "That address is not a valid URL.";
  }
  if (parsed.protocol === "chrome:" || parsed.protocol === "chrome-extension:" || parsed.protocol === "edge:") {
    return "Browser pages cannot be shown inside Casement.";
  }
  if (parsed.hostname === "chromewebstore.google.com") {
    return "The Chrome Web Store cannot be shown inside an extension frame.";
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return "Casement previews http and https pages.";
  }
  return "";
}

function loadPreview() {
  const reason = restrictionReason(state.url);
  if (reason) {
    preview.removeAttribute("src");
    showNotice(reason);
    return;
  }
  showNotice("If the page stays blank, it is refusing to be framed.", true);
  preview.src = state.url;
}

function showNotice(text, canAllow = false) {
  notice.hidden = false;
  notice.replaceChildren(document.createTextNode(text));
  if (!canAllow || !globalThis.chrome?.permissions) return;
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Allow this site";
  button.addEventListener("click", allowSite);
  notice.append(button);
}

async function allowSite() {
  const origin = new URL(state.url).origin;
  const granted = await chrome.permissions.request({ origins: [`${origin}/*`] });
  if (!granted) return;
  const response = await chrome.runtime.sendMessage({ type: "allow-framing", origin });
  if (!response?.ok) {
    showNotice(response?.error ?? "Framing could not be allowed.", true);
    return;
  }
  notice.hidden = true;
  preview.src = state.url;
}
