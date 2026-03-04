const itemsEl = document.getElementById("items");
const searchEl = document.getElementById("search");
const categoryEl = document.getElementById("category");
const sortEl = document.getElementById("sort");
const refreshBtnEl = document.getElementById("refreshBtn");
const statusEl = document.getElementById("status");
const apiBaseEl = document.getElementById("apiBase");
const mercariRegionEl = document.getElementById("mercariRegion");
const openMercariSearchLinkEl = document.getElementById("openMercariSearchLink");
const itemsCountEl = document.getElementById("itemsCount");
const avgPriceEl = document.getElementById("avgPrice");
const createItemFormEl = document.getElementById("createItemForm");
const createdMercariLinkEl = document.getElementById("createdMercariLink");

const itemNameEl = document.getElementById("itemName");
const itemCategoryEl = document.getElementById("itemCategory");
const itemDescriptionEl = document.getElementById("itemDescription");

const API_BASE_STORAGE_KEY = "mini-mercari-api-base";
const MERCARI_REGION_STORAGE_KEY = "mini-mercari-mercari-region";

const MERCARI_SEARCH_BASE = {
    jp: "https://jp.mercari.com/search?keyword=",
    us: "https://www.mercari.com/search/?keyword=",
};

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;");
}

function getApiBase() {
    return apiBaseEl.value.trim().replace(/\/$/, "");
}

function getMercariRegion() {
    return MERCARI_SEARCH_BASE[mercariRegionEl.value] ? mercariRegionEl.value : "jp";
}

function buildMercariSearchUrl(query = "", category = "") {
    const base = MERCARI_SEARCH_BASE[getMercariRegion()];
    const mergedQuery = [query.trim(), category.trim()].filter(Boolean).join(" ");
    return `${base}${encodeURIComponent(mergedQuery || "mercari")}`;
}

function updateGlobalMercariLink() {
    openMercariSearchLinkEl.href = buildMercariSearchUrl(searchEl.value, categoryEl.value);
}

function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.classList.toggle("error", isError);
}

function updateStats(items) {
    itemsCountEl.textContent = String(items.length);
    if (!items.length) {
        avgPriceEl.textContent = "$0";
        return;
    }
    const avg = items.reduce((sum, item) => sum + Number(item.price || 0), 0) / items.length;
    avgPriceEl.textContent = `$${avg.toFixed(2)}`;
}

function renderItems(items) {
    itemsEl.innerHTML = "";

    if (!items.length) {
        itemsEl.innerHTML = `<p class="empty-state">No items found for the current filters.</p>`;
        updateStats([]);
        return;
    }

    items.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "card";
        card.style.animationDelay = `${Math.min(index * 60, 400)}ms`;
        card.innerHTML = `
            <p class="chip">${escapeHtml(item.category)}</p>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="price">$${Number(item.price).toFixed(2)}</div>
            <a class="mercari-link card-link" href="${buildMercariSearchUrl(item.name, item.category)}" target="_blank" rel="noopener noreferrer">View Similar on Mercari</a>
        `;
        itemsEl.appendChild(card);
    });

    updateStats(items);
}

async function fetchItems() {
    const params = new URLSearchParams();

    if (searchEl.value.trim()) {
        params.set("q", searchEl.value.trim());
    }
    if (categoryEl.value.trim()) {
        params.set("category", categoryEl.value.trim());
    }
    params.set("sort", sortEl.value);

    const endpoint = `${getApiBase()}/items?${params.toString()}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Failed to load items (${response.status})`);
    }
    return response.json();
}

async function refreshItems() {
    setStatus("Loading listings...");
    refreshBtnEl.disabled = true;

    try {
        const items = await fetchItems();
        renderItems(items);
        setStatus(`Loaded ${items.length} item(s).`);
        updateGlobalMercariLink();
    } catch (error) {
        renderItems([]);
        setStatus(error.message, true);
    } finally {
        refreshBtnEl.disabled = false;
    }
}

async function createItem(event) {
    event.preventDefault();
    setStatus("Creating listing...");

    const name = itemNameEl.value.trim();
    const category = itemCategoryEl.value.trim();
    const payload = {
        name,
        category,
        description: itemDescriptionEl.value.trim(),
    };

    const response = await fetch(`${getApiBase()}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detail = errorData.detail || `Create failed (${response.status})`;
        throw new Error(detail);
    }

    itemNameEl.value = "";
    itemCategoryEl.value = "";
    itemDescriptionEl.value = "";

    createdMercariLinkEl.href = buildMercariSearchUrl(name, category);
    createdMercariLinkEl.classList.remove("hidden");
}

function wireEvents() {
    refreshBtnEl.addEventListener("click", refreshItems);
    searchEl.addEventListener("input", () => {
        updateGlobalMercariLink();
        refreshItems();
    });
    categoryEl.addEventListener("input", () => {
        updateGlobalMercariLink();
        refreshItems();
    });
    sortEl.addEventListener("change", refreshItems);
    mercariRegionEl.addEventListener("change", () => {
        localStorage.setItem(MERCARI_REGION_STORAGE_KEY, getMercariRegion());
        updateGlobalMercariLink();
        refreshItems();
    });

    apiBaseEl.addEventListener("change", () => {
        localStorage.setItem(API_BASE_STORAGE_KEY, getApiBase());
        refreshItems();
    });

    createItemFormEl.addEventListener("submit", async (event) => {
        try {
            await createItem(event);
            setStatus("Listing created successfully.");
            await refreshItems();
        } catch (error) {
            setStatus(error.message, true);
        }
    });
}

function initApiBase() {
    const configuredBase = window.APP_CONFIG && typeof window.APP_CONFIG.API_BASE_URL === "string"
        ? window.APP_CONFIG.API_BASE_URL.trim()
        : "";
    if (configuredBase) {
        apiBaseEl.value = configuredBase;
    }

    const stored = localStorage.getItem(API_BASE_STORAGE_KEY);
    if (stored) {
        apiBaseEl.value = stored;
    }
}

function initMercariRegion() {
    const stored = localStorage.getItem(MERCARI_REGION_STORAGE_KEY);
    if (stored && MERCARI_SEARCH_BASE[stored]) {
        mercariRegionEl.value = stored;
    }
    updateGlobalMercariLink();
}

function init() {
    initApiBase();
    initMercariRegion();
    wireEvents();
    refreshItems();
}

init();
