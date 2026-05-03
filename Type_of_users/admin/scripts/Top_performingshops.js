// Sample top shops data (replace with API later)
const topShops = [
    { name: "Speed Garage", avatar: "../../Assets/Images/Carshop2.jpg", jobs: 1245, rating: 4.9, revenue: 189200, badge: "🏆 Top Revenue" },
    { name: "AutoFix Pasig", avatar: "../../Assets/Images/Carshop2.jpg", jobs: 987, rating: 4.8, revenue: 125500, badge: "⭐ Most Jobs" },
    { name: "Prime Motors", avatar: "../../Assets/Images/Carshop2.jpg", jobs: 876, rating: 4.7, revenue: 98300, badge: "🔧 High Rating" },
    { name: "Bungkaniko Auto Center", avatar: "../../Assets/Images/Carshop2.jpg", jobs: 654, rating: 4.9, revenue: 87200, badge: "⚡ Fast Growth" }
];

function renderTopShops() {
    const container = document.getElementById('topShopsGrid');
    if (!container) return;
    container.innerHTML = topShops.map(shop => `
        <div class="shop-card">
            <img src="${shop.avatar}" alt="${shop.name}">
            <h3>${shop.name}</h3>
            <div class="shop-stats">
                <span><i class="fa-solid fa-briefcase"></i> ${shop.jobs} jobs</span>
                <span><i class="fa-solid fa-star"></i> ${shop.rating} ★</span>
                <span><i class="fa-solid fa-coin"></i> ₱${shop.revenue.toLocaleString()}</span>
            </div>
            <div class="shop-badge">${shop.badge}</div>
        </div>
    `).join('');
}

// Call it inside DOMContentLoaded (add this line to existing init)
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing init code ...
    renderTopShops();
});