import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { describe, it } from "node:test";
import {
  DEVICES,
  catalogProblems,
  findDevice,
  fitPreviewScale,
  groupDevices,
  searchDevices,
  viewportSize,
} from "../devices.js";

const IDENTIFIED_IDS = [
  "iphone-se", "iphone-11", "iphone-11-pro", "iphone-11-pro-max", "iphone-12-mini", "iphone-12",
  "iphone-12-pro", "iphone-12-pro-max", "iphone-13-mini", "iphone-13", "iphone-13-pro", "iphone-13-pro-max",
  "iphone-14", "iphone-14-plus", "iphone-14-pro", "iphone-14-pro-max", "iphone-15", "iphone-15-plus",
  "iphone-15-pro", "iphone-15-pro-max", "iphone-16", "iphone-16-plus", "iphone-16-pro", "iphone-16-pro-max",
  "iphone-16e", "iphone-17", "iphone-air", "iphone-17-pro", "iphone-17-pro-max", "iphone-17e",
  "iphone-18-pro", "iphone-18-pro-max", "pixel-7", "pixel-8", "pixel-8-pro", "pixel-8a", "pixel-9",
  "pixel-9-pro", "pixel-9-pro-xl", "pixel-9a", "pixel-10", "pixel-10-pro", "pixel-10-pro-xl", "pixel-11",
  "pixel-11-pro", "pixel-11-pro-xl", "galaxy-s20-ultra", "galaxy-s8-plus", "galaxy-a51", "galaxy-a55",
  "galaxy-s24", "galaxy-s25", "galaxy-s25-ultra", "galaxy-s26", "galaxy-s26-ultra", "galaxy-z-flip-7",
  "redmi-note-14", "moto-g-power", "jiophone-2", "iphone-duo", "galaxy-z-fold-5", "pixel-9-pro-fold",
  "galaxy-z-fold-7", "galaxy-z-fold-8", "galaxy-z-fold-8-ultra", "pixel-10-pro-fold", "surface-duo",
  "asus-zenbook-fold", "ipad-mini", "ipad-11", "ipad-air-11", "ipad-air-13", "ipad-pro-11", "ipad-pro-13",
  "galaxy-tab-s4", "galaxy-tab-s11", "surface-pro-7", "surface-pro-10", "surface-pro-11", "macbook-air-13",
  "macbook-neo", "macbook-air-15", "macbook-pro-14", "macbook-pro-16", "surface-laptop-7-13",
  "surface-laptop-7-15", "laptop-1366", "laptop-1536", "laptop-1280", "desktop-1080p", "desktop-1440p",
  "imac-24", "apple-watch-series-11-46mm", "tv-1080p", "kiosk-1080p-portrait", "steam-deck",
];

describe("device catalog", () => {
  it("includes every identified device once", () => {
    assert.deepEqual(catalogProblems(), []);
    assert.equal(DEVICES.length, 96);
    assert.equal(new Set(DEVICES.map((device) => device.id)).size, 96);
    const ids = new Set(DEVICES.map((device) => device.id));
    for (const id of IDENTIFIED_IDS) assert.equal(ids.has(id), true, id);
    assert.equal(IDENTIFIED_IDS.length, 96);
  });

  it("keeps the viewport sizes observed for representative devices", () => {
    assert.deepEqual(findDevice("iphone-14"), {
      id: "iphone-14", name: "iPhone 14", brand: "Apple", category: "phone", width: 390, height: 844,
    });
    assert.equal(findDevice("ipad-air-11").width, 820);
    assert.equal(findDevice("ipad-air-11").height, 1180);
    assert.equal(findDevice("steam-deck").category, "handheld");
    assert.equal(findDevice("missing-device").id, "iphone-14");
  });
});

describe("search", () => {
  it("returns the full list for a blank query", () => {
    assert.equal(searchDevices(DEVICES, "   ").length, DEVICES.length);
  });

  it("matches name, brand, and category, with prefix names first", () => {
    const pixel = searchDevices(DEVICES, "pixel 7");
    assert.equal(pixel.length, 1);
    assert.equal(pixel[0].id, "pixel-7");

    const apple = searchDevices(DEVICES, "apple");
    assert.ok(apple.length > 1);
    assert.ok(apple.every((device) => device.brand === "Apple"));

    const phones = searchDevices(DEVICES, "phone");
    assert.ok(phones.every((device) => `${device.name} ${device.brand} ${device.category}`.toLowerCase().includes("phone")));

    const ipads = searchDevices(DEVICES, "ipad");
    assert.equal(ipads[0].name.startsWith("iPad"), true);
    assert.ok(ipads.length >= 6);
    assert.deepEqual(searchDevices(DEVICES, "zzzz"), []);
  });

  it("groups favorites and recents without repeating them in a category", () => {
    const groups = groupDevices(DEVICES, ["pixel-7"], ["iphone-14"]);
    const favorites = groups.find((group) => group.id === "favorites");
    const recent = groups.find((group) => group.id === "recent");
    const phones = groups.find((group) => group.id === "phone");
    assert.deepEqual(favorites.devices.map((device) => device.id), ["pixel-7"]);
    assert.deepEqual(recent.devices.map((device) => device.id), ["iphone-14"]);
    assert.equal(phones.devices.some((device) => device.id === "pixel-7" || device.id === "iphone-14"), false);
    assert.ok(groups.some((group) => group.id === "foldable"));
    assert.ok(groups.some((group) => group.id === "handheld"));
  });
});

describe("preview layout", () => {
  it("swaps the viewport when rotated", () => {
    const phone = findDevice("iphone-14");
    assert.deepEqual(viewportSize(phone, "portrait"), { width: 390, height: 844 });
    assert.deepEqual(viewportSize(phone, "landscape"), { width: 844, height: 390 });
  });

  it("fits a tall device to the stage height and can scale a small device up", () => {
    const fitted = fitPreviewScale(844, 1212, 1100, 800);
    assert.ok(fitted < 1);
    assert.equal(fitted, Math.min((1100 - 24) / 844, (800 - 24) / 1212));

    const grown = fitPreviewScale(208, 248, 1200, 900);
    assert.ok(grown > 1);
    assert.ok(grown <= 2);
  });
});

describe("extension package", () => {
  it("keeps the manifest and its files inside this folder", () => {
    const root = new URL("..", import.meta.url);
    const manifest = JSON.parse(readFileSync(new URL("manifest.json", root), "utf8"));
    assert.equal(manifest.manifest_version, 3);
    assert.equal(manifest.name, "Casement");
    assert.equal(manifest.background.service_worker, "background.js");
    const files = [
      manifest.background.service_worker,
      "studio.html",
      "studio.css",
      "studio.js",
      "devices.js",
      ...Object.values(manifest.icons),
    ];
    for (const file of files) {
      assert.equal(existsSync(new URL(file, root)), true, file);
    }
  });
});
