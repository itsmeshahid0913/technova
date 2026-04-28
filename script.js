/**
 * TECH NOVA - Master Logic
 */

// 1. Theme Protector (Immediate Execution)
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// 2. Route Guard
if (!window.location.href.includes('login.html') && !localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

// 3. Theme Toggle Control
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    updateThemeIcon(nextTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.fa-moon, .fa-sun, [onclick="toggleTheme()"]');
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            icon.style.color = '#fde047';
        } else {
            icon.className = 'fas fa-moon';
            icon.style.color = 'inherit';
        }
    }
}

// 4. Navbar & UI Updates
async function updateNavbar() {
    try {
        const badge = document.getElementById('cart-count');
        const userDisplay = document.getElementById('user-display');
        const activeUser = localStorage.getItem('activeUser');

        if (typeof fetchCart === "function") {
            const cart = await fetchCart();
            if (badge) {
                badge.innerText = cart.length;
                badge.style.display = cart.length > 0 ? 'flex' : 'none';
            }
        }
        
        if (userDisplay && activeUser) {
            userDisplay.innerHTML = `<i class="fas fa-user-circle"></i> ${activeUser}`;
        }
    } catch(err) {
        console.warn('Navbar sync delayed...');
    }
}

// 5. Global Functions
function showPopup() {
    const popup = document.getElementById('add-popup');
    if(!popup) return;
    popup.style.display = 'flex';
    setTimeout(() => popup.style.display = 'none', 2500);
}

function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('activeUser');
    window.location.href = 'login.html';
}

// 6. Initialization
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateThemeIcon(currentTheme);
    updateNavbar();
});