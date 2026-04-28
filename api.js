const BASE_URL = 'https://technova-backend-ey24.onrender.com/api';
 
// ── Helper: always attach JWT token to requests ──────────────
function authHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}
 
// ════════════════════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════════════════════
 
async function loginOrRegister(username, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    localStorage.setItem('token', data.token);
    localStorage.setItem('activeUser', data.username);
    return data;
}

async function registerUser(username, password) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}
 
// ════════════════════════════════════════════════════════════
//  PRODUCTS
// ════════════════════════════════════════════════════════════
 
async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    return await res.json();
}
 
// ════════════════════════════════════════════════════════════
//  CART
// ════════════════════════════════════════════════════════════
 
async function fetchCart() {
    const res = await fetch(`${BASE_URL}/cart`, { headers: authHeaders() });
    return await res.json();
}
 
async function addToCart(product) {
    // product = { productId (mongo _id), name, price, img }
    const res = await fetch(`${BASE_URL}/cart/add`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(product)
    });
    return await res.json();
}
 
async function changeCartQty(productId, change) {
    const res = await fetch(`${BASE_URL}/cart/qty`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ productId, change })
    });
    return await res.json();
}
 
async function removeCartItem(productId) {
    const res = await fetch(`${BASE_URL}/cart/item/${productId}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    return await res.json();
}
 
async function clearCart() {
    const res = await fetch(`${BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    return await res.json();
}
 
// ════════════════════════════════════════════════════════════
//  ORDERS
// ════════════════════════════════════════════════════════════
 
async function placeOrder(orderData) {
    // orderData = { customer, email, phone, address, method, items }
    const res = await fetch(`${BASE_URL}/orders/place`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}
 
async function fetchOrders() {
    const res = await fetch(`${BASE_URL}/orders`, { headers: authHeaders() });
    return await res.json();
}

// ════════════════════════════════════════════════════════════
//  SETTINGS
// ════════════════════════════════════════════════════════════

async function fetchSettings() {
    const res = await fetch(`${BASE_URL}/settings`);
    return await res.json();
}

async function updateSettings(data) {
    const res = await fetch(`${BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}