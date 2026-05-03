// Sample top mechanics data (replace with API data later)
const topMechanics = [
    { name: "Ricardo Dalisay", avatar: "../../Assets/Profiles/mcado.jpg", jobs: 147, rating: 4.9, revenue: 89200, badge: "🏆 Senior Mechanic" },
    { name: "Cardo Dalistep", avatar: "../../Assets/Profiles/mcado.jpg", jobs: 98, rating: 4.7, revenue: 62500, badge: "⭐ Junior Mechanic" },
    { name: "Ramon Delgado", avatar: "../../Assets/Profiles/mcado.jpg", jobs: 86, rating: 4.8, revenue: 55300, badge: "🔧 Engine Expert" },
    { name: "Sofia Cruz", avatar: "../../Assets/Profiles/mcado.jpg", jobs: 72, rating: 4.9, revenue: 48900, badge: "⚡ Diagnostics Pro" }
];

function renderTopMechanics() {
    const container = document.getElementById('topMechanicsGrid');
    if (!container) return;
    container.innerHTML = topMechanics.map(m => `
        <div class="mechanic-card">
            <img src="${m.avatar}" alt="${m.name}">
            <h3>${m.name}</h3>
            <div class="mechanic-stats">
                <span><i class="fa-solid fa-briefcase"></i> ${m.jobs} jobs</span>
                <span><i class="fa-solid fa-star"></i> ${m.rating} ★</span>
                <span><i class="fa-solid fa-coin"></i> ₱${m.revenue.toLocaleString()}</span>
            </div>
            <div class="mechanic-badge">${m.badge}</div>
        </div>
    `).join('');
}

// Call it on page load (inside DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    renderTopMechanics();
    // ... your existing initialization code ...
});