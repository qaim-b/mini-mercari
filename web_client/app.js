const itemsEl = document.getElementById("items");
const searchEl = document.getElementById("search");
const categoryEl = document.getElementById("category");
const sortEl = document.getElementById("sort");
const refreshBtnEl = document.getElementById("refreshBtn");
const statusEl = document.getElementById("status");
const apiBaseEl = document.getElementById("apiBase");
const itemsCountEl = document.getElementById("itemsCount");
const avgPriceEl = document.getElementById("avgPrice");
const createItemFormEl = document.getElementById("createItemForm");

const itemNameEl = document.getElementById("itemName");
const itemCategoryEl = document.getElementById("itemCategory");
const itemDescriptionEl = document.getElementById("itemDescription");

const API_BASE_STORAGE_KEY = "mini-mercari-api-base";

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

    const payload = {
        name: itemNameEl.value.trim(),
        category: itemCategoryEl.value.trim(),
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
}

function wireEvents() {
    refreshBtnEl.addEventListener("click", refreshItems);
    searchEl.addEventListener("input", refreshItems);
    categoryEl.addEventListener("input", refreshItems);
    sortEl.addEventListener("change", refreshItems);

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

function init() {
    initApiBase();
    wireEvents();
    refreshItems();
}

init();
