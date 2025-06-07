const itemsEl = document.getElementById('items');
const searchEl = document.getElementById('search');

async function fetchItems() {
    const res = await fetch('http://localhost:8000/items');
    const data = await res.json();
    return data;
}

function renderItems(items) {
    itemsEl.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="price">$${item.price.toFixed(2)}</div>
        `;
        itemsEl.appendChild(card);
    });
}

async function init() {
    const items = await fetchItems();
    renderItems(items);

    searchEl.addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );
        renderItems(filtered);
    });
}

init();
