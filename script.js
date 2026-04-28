// Route Guard - redirect to login if no token
if (!window.location.href.includes('login.html') && !localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
}

function showPopup() {
    const popup = document.getElementById('add-popup');
    if(!popup) return;
    popup.style.display = 'flex';
    setTimeout(() => popup.style.display = 'none', 2000);
}

async function updateNavbar() {
    try {
        const cart = await fetchCart();
        const badge = document.getElementById('cart-count');
        if (badge) badge.innerText = cart.length;
    } catch(err) {
        console.log('Could not update navbar');
    }
}

function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('activeUser');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
    const userDisplay = document.getElementById('user-display');
    if (userDisplay) userDisplay.innerText = localStorage.getItem('activeUser');
    updateNavbar();
});