/** Layout viewports identified from the shipped device catalog. Sizes only, no artwork. */
function device(id, name, brand, category, width, height) {
  return { id, name, brand, category, width, height };
}

export const DEVICES = [
  device("iphone-se", "iPhone SE (2nd & 3rd gen)", "Apple", "phone", 375, 667),
  device("iphone-11", "iPhone 11", "Apple", "phone", 414, 896),
  device("iphone-11-pro", "iPhone 11 Pro", "Apple", "phone", 375, 812),
  device("iphone-11-pro-max", "iPhone 11 Pro Max", "Apple", "phone", 414, 896),
  device("iphone-12-mini", "iPhone 12 mini", "Apple", "phone", 375, 812),
  device("iphone-12", "iPhone 12", "Apple", "phone", 390, 844),
  device("iphone-12-pro", "iPhone 12 Pro", "Apple", "phone", 390, 844),
  device("iphone-12-pro-max", "iPhone 12 Pro Max", "Apple", "phone", 428, 926),
  device("iphone-13-mini", "iPhone 13 mini", "Apple", "phone", 375, 812),
  device("iphone-13", "iPhone 13", "Apple", "phone", 390, 844),
  device("iphone-13-pro", "iPhone 13 Pro", "Apple", "phone", 390, 844),
  device("iphone-13-pro-max", "iPhone 13 Pro Max", "Apple", "phone", 428, 926),
  device("iphone-14", "iPhone 14", "Apple", "phone", 390, 844),
  device("iphone-14-plus", "iPhone 14 Plus", "Apple", "phone", 428, 926),
  device("iphone-14-pro", "iPhone 14 Pro", "Apple", "phone", 393, 852),
  device("iphone-14-pro-max", "iPhone 14 Pro Max", "Apple", "phone", 430, 932),
  device("iphone-15", "iPhone 15", "Apple", "phone", 393, 852),
  device("iphone-15-plus", "iPhone 15 Plus", "Apple", "phone", 430, 932),
  device("iphone-15-pro", "iPhone 15 Pro", "Apple", "phone", 393, 852),
  device("iphone-15-pro-max", "iPhone 15 Pro Max", "Apple", "phone", 430, 932),
  device("iphone-16", "iPhone 16", "Apple", "phone", 393, 852),
  device("iphone-16-plus", "iPhone 16 Plus", "Apple", "phone", 430, 932),
  device("iphone-16-pro", "iPhone 16 Pro", "Apple", "phone", 402, 874),
  device("iphone-16-pro-max", "iPhone 16 Pro Max", "Apple", "phone", 440, 956),
  device("iphone-16e", "iPhone 16e", "Apple", "phone", 390, 844),
  device("iphone-17", "iPhone 17", "Apple", "phone", 402, 874),
  device("iphone-air", "iPhone Air", "Apple", "phone", 420, 912),
  device("iphone-17-pro", "iPhone 17 Pro", "Apple", "phone", 402, 874),
  device("iphone-17-pro-max", "iPhone 17 Pro Max", "Apple", "phone", 440, 956),
  device("iphone-17e", "iPhone 17e", "Apple", "phone", 390, 844),
  device("iphone-18-pro", "iPhone 18 Pro", "Apple", "phone", 402, 874),
  device("iphone-18-pro-max", "iPhone 18 Pro Max", "Apple", "phone", 440, 956),
  device("pixel-7", "Pixel 7", "Google", "phone", 412, 915),
  device("pixel-8", "Pixel 8", "Google", "phone", 412, 915),
  device("pixel-8-pro", "Pixel 8 Pro", "Google", "phone", 448, 997),
  device("pixel-8a", "Pixel 8a", "Google", "phone", 412, 915),
  device("pixel-9", "Pixel 9", "Google", "phone", 412, 924),
  device("pixel-9-pro", "Pixel 9 Pro", "Google", "phone", 427, 952),
  device("pixel-9-pro-xl", "Pixel 9 Pro XL", "Google", "phone", 448, 997),
  device("pixel-9a", "Pixel 9a", "Google", "phone", 412, 924),
  device("pixel-10", "Pixel 10", "Google", "phone", 412, 924),
  device("pixel-10-pro", "Pixel 10 Pro", "Google", "phone", 427, 952),
  device("pixel-10-pro-xl", "Pixel 10 Pro XL", "Google", "phone", 448, 997),
  device("pixel-11", "Pixel 11", "Google", "phone", 412, 924),
  device("pixel-11-pro", "Pixel 11 Pro", "Google", "phone", 427, 952),
  device("pixel-11-pro-xl", "Pixel 11 Pro XL", "Google", "phone", 448, 997),
  device("galaxy-s20-ultra", "Galaxy S20 Ultra", "Samsung", "phone", 412, 915),
  device("galaxy-s8-plus", "Galaxy S8+", "Samsung", "phone", 360, 740),
  device("galaxy-a51", "Galaxy A51/71", "Samsung", "phone", 412, 914),
  device("galaxy-a55", "Galaxy A55", "Samsung", "phone", 360, 800),
  device("galaxy-s24", "Galaxy S24", "Samsung", "phone", 384, 832),
  device("galaxy-s25", "Galaxy S25", "Samsung", "phone", 384, 832),
  device("galaxy-s25-ultra", "Galaxy S25 Ultra", "Samsung", "phone", 384, 832),
  device("galaxy-s26", "Galaxy S26", "Samsung", "phone", 384, 832),
  device("galaxy-s26-ultra", "Galaxy S26 Ultra", "Samsung", "phone", 384, 832),
  device("galaxy-z-flip-7", "Galaxy Z Flip 7", "Samsung", "phone", 411, 960),
  device("redmi-note-14", "Redmi Note 14", "Xiaomi", "phone", 393, 873),
  device("moto-g-power", "Moto G Power (2022)", "Motorola", "phone", 412, 823),
  device("jiophone-2", "JioPhone 2", "Jio", "phone", 240, 320),
  device("iphone-duo", "iPhone Duo", "Apple", "foldable", 466, 678),
  device("galaxy-z-fold-5", "Galaxy Z Fold 5", "Samsung", "foldable", 344, 882),
  device("pixel-9-pro-fold", "Pixel 9 Pro Fold", "Google", "foldable", 412, 922),
  device("galaxy-z-fold-7", "Galaxy Z Fold 7", "Samsung", "foldable", 411, 960),
  device("galaxy-z-fold-8", "Galaxy Z Fold 8", "Samsung", "foldable", 475, 751),
  device("galaxy-z-fold-8-ultra", "Galaxy Z Fold 8 Ultra", "Samsung", "foldable", 411, 960),
  device("pixel-10-pro-fold", "Pixel 10 Pro Fold", "Google", "foldable", 412, 922),
  device("surface-duo", "Surface Duo", "Microsoft", "foldable", 540, 720),
  device("asus-zenbook-fold", "Asus Zenbook 17 Fold", "Asus", "foldable", 853, 1280),
  device("ipad-mini", "iPad mini", "Apple", "tablet", 744, 1133),
  device("ipad-11", "iPad 11-inch (A16)", "Apple", "tablet", 820, 1180),
  device("ipad-air-11", "iPad Air 11-inch", "Apple", "tablet", 820, 1180),
  device("ipad-air-13", "iPad Air 13-inch", "Apple", "tablet", 1024, 1366),
  device("ipad-pro-11", "iPad Pro 11-inch", "Apple", "tablet", 834, 1210),
  device("ipad-pro-13", "iPad Pro 13-inch", "Apple", "tablet", 1032, 1376),
  device("galaxy-tab-s4", "Galaxy Tab S4", "Samsung", "tablet", 712, 1138),
  device("galaxy-tab-s11", "Galaxy Tab S11", "Samsung", "tablet", 800, 1280),
  device("surface-pro-7", "Surface Pro 7", "Microsoft", "tablet", 912, 1368),
  device("surface-pro-10", "Surface Pro 10", "Microsoft", "tablet", 960, 1440),
  device("surface-pro-11", "Surface Pro (11th Edition)", "Microsoft", "tablet", 960, 1440),
  device("macbook-air-13", "MacBook Air 13-inch", "Apple", "laptop", 1470, 956),
  device("macbook-neo", "MacBook Neo", "Apple", "laptop", 1204, 753),
  device("macbook-air-15", "MacBook Air 15-inch", "Apple", "laptop", 1710, 1112),
  device("macbook-pro-14", "MacBook Pro 14-inch", "Apple", "laptop", 1512, 982),
  device("macbook-pro-16", "MacBook Pro 16-inch", "Apple", "laptop", 1728, 1117),
  device("surface-laptop-7-13", "Surface Laptop 7 (13.8-inch)", "Microsoft", "laptop", 1536, 1024),
  device("surface-laptop-7-15", "Surface Laptop 7 (15-inch)", "Microsoft", "laptop", 1664, 1109),
  device("laptop-1366", "Windows laptop (1366×768)", "Generic", "laptop", 1366, 768),
  device("laptop-1536", "Windows laptop (1536×864)", "Generic", "laptop", 1536, 864),
  device("laptop-1280", "Windows laptop (1280×720)", "Generic", "laptop", 1280, 720),
  device("desktop-1080p", "Desktop 1080p (1920×1080)", "Generic", "desktop", 1920, 1080),
  device("desktop-1440p", "Desktop 1440p (2560×1440)", "Generic", "desktop", 2560, 1440),
  device("imac-24", "iMac 24-inch", "Apple", "desktop", 2240, 1260),
  device("apple-watch-series-11-46mm", "Apple Watch Series 11 (46mm)", "Apple", "watch", 208, 248),
  device("tv-1080p", "Smart TV 1080p", "Generic", "tv", 1920, 1080),
  device("kiosk-1080p-portrait", "Kiosk 1080p (portrait)", "Generic", "kiosk", 1080, 1920),
  device("steam-deck", "Steam Deck", "Valve", "handheld", 1280, 800),
];

const GROUPS = [
  { id: "phone", label: "Phones" },
  { id: "foldable", label: "Foldables" },
  { id: "tablet", label: "Tablets" },
  { id: "laptop", label: "Laptops" },
  { id: "desktop", label: "Desktops" },
  { id: "watch", label: "Watches" },
  { id: "tv", label: "TVs" },
  { id: "kiosk", label: "Kiosks" },
  { id: "handheld", label: "Handhelds" },
];

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function findDevice(id) {
  return DEVICES.find((device) => device.id === id) ?? DEVICES.find((device) => device.id === "iphone-14");
}

export function viewportSize(device, orientation) {
  if (orientation === "landscape") {
    return { width: Math.max(device.width, device.height), height: Math.min(device.width, device.height) };
  }
  return { width: Math.min(device.width, device.height), height: Math.max(device.width, device.height) };
}

/** Fit the outer frame inside the stage. Scale may grow up to 2×. */
export function fitPreviewScale(outerWidth, outerHeight, stageWidth, stageHeight) {
  const availableWidth = Math.max(stageWidth - 24, 120);
  const availableHeight = Math.max(stageHeight - 24, 120);
  const scale = Math.min(availableWidth / outerWidth, availableHeight / outerHeight);
  return Math.max(0.15, Math.min(scale, 2));
}

/** Case-insensitive substring match on name, brand, and category. */
export function searchDevices(devices, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return devices;

  return devices
    .filter((device) => {
      const haystack = `${device.name} ${device.brand} ${device.category}`.toLowerCase();
      return haystack.includes(needle);
    })
    .sort((left, right) => {
      const leftStarts = left.name.toLowerCase().startsWith(needle);
      const rightStarts = right.name.toLowerCase().startsWith(needle);
      if (leftStarts !== rightStarts) return leftStarts ? -1 : 1;
      return left.name.localeCompare(right.name);
    });
}

export function groupDevices(devices, favoriteIds, recentIds) {
  const favoriteSet = new Set(favoriteIds);
  const recentSet = new Set(recentIds);
  const byId = new Map(devices.map((item) => [item.id, item]));
  const take = (ids) => ids.map((id) => byId.get(id)).filter(Boolean);

  const sections = [
    { id: "favorites", label: "Favorites", devices: take(favoriteIds) },
    { id: "recent", label: "Recent", devices: take(recentIds) },
  ];

  for (const group of GROUPS) {
    sections.push({
      id: group.id,
      label: group.label,
      devices: devices.filter(
        (item) => item.category === group.id && !favoriteSet.has(item.id) && !recentSet.has(item.id),
      ),
    });
  }

  return sections.filter((section) => section.devices.length > 0);
}

export function catalogProblems(devices = DEVICES) {
  const problems = [];
  const seen = new Set();
  const categories = new Set(GROUPS.map((group) => group.id));

  for (const item of devices) {
    if (!ID_PATTERN.test(item.id)) problems.push(`invalid id ${item.id}`);
    if (seen.has(item.id)) problems.push(`duplicate id ${item.id}`);
    seen.add(item.id);
    if (!item.name || !item.brand) problems.push(`missing name or brand for ${item.id}`);
    if (!categories.has(item.category)) problems.push(`unknown category ${item.category} on ${item.id}`);
    if (!Number.isInteger(item.width) || !Number.isInteger(item.height) || item.width < 100 || item.height < 100) {
      problems.push(`invalid size for ${item.id}`);
    }
  }

  for (const category of categories) {
    if (!devices.some((item) => item.category === category)) problems.push(`missing category ${category}`);
  }

  return problems;
}
