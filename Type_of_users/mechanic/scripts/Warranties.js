// Sample warranty data (completed repairs within warranty period)
const warrantyItems = [
    { id: 1, customer: "Bolaños, Trisha", vehicle: "2021 Honda CR-V", issue: "Knocking from front suspension", completionDate: "2025-03-12", location: "Pasonanca", status: "active", claimed: false },
    { id: 2, customer: "Ramos, Celeste", vehicle: "2021 Suzuki Jimny", issue: "4WD not engaging", completionDate: "2025-03-09", location: "Camino Nuevo", status: "active", claimed: false },
    { id: 3, customer: "Lim, Patricia", vehicle: "2020 Toyota Innova", issue: "Transmission slipping", completionDate: "2025-03-07", location: "Baliwasan", status: "active", claimed: false },
    { id: 4, customer: "Cruz, Emilio", vehicle: "2016 Toyota Vios", issue: "Overheating + coolant leak", completionDate: "2025-03-15", location: "Talon-Talon", status: "active", claimed: false },
    { id: 5, customer: "Santos, Lia", vehicle: "2017 Hyundai Tucson", issue: "Heavy power steering", completionDate: "2025-03-14", location: "Guiwan", status: "active", claimed: false }
];

function calculateDaysRemaining(completionDate) {
    const completed = new Date(completionDate);
    const today = new Date();
    const diffTime = completed - today;
    const daysPassed = Math.floor(diffTime / (1000000 * 60 * 60 * 24));
    return 23 - daysPassed; // remaining days
}

function updateStats() {
    const active = warrantyItems.filter(w => w.status === "active" && !w.claimed && calculateDaysRemaining(w.completionDate) > 0).length;
    const expiring = warrantyItems.filter(w => {
        if (w.status !== "active" || w.claimed) return false;
        const daysLeft = calculateDaysRemaining(w.completionDate);
        return daysLeft <= 5 && daysLeft > 0;
    }).length;
    const claimed = warrantyItems.filter(w => w.claimed).length;
    document.getElementById("activeWarrantyCount").innerText = active;
    document.getElementById("expiringSoonCount").innerText = expiring;
}

function renderWarranties() {
    const container = document.getElementById("warrantiesContainer");
    container.innerHTML = warrantyItems.map(item => {
        const daysLeft = calculateDaysRemaining(item.completionDate);
        const isExpired = daysLeft <= 0;
        const isExpiringSoon = daysLeft <= 5 && daysLeft > 0;
        let statusClass = "warranty-active";
        let statusText = `${daysLeft} days left`;
        if (isExpired) { statusClass = "warranty-expired"; statusText = "Expired"; }
        else if (isExpiringSoon) statusClass = "warranty-expiring";
        
        return `
            <div class="warranty-card ${statusClass}">
                <div class="card-header">
                    <h2>${escapeHtml(item.customer)}</h2>
                    <span class="warranty-badge">${statusText}</span>
                </div>
                <div class="card-body">
                    <p><i class="fa-solid fa-car"></i> ${escapeHtml(item.vehicle)}</p>
                    <p><i class="fa-solid fa-wrench"></i> ${escapeHtml(item.issue)}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)}</p>
                    <p><i class="fa-regular fa-calendar-check"></i> Completed: ${new Date(item.completionDate).toLocaleDateString()}</p>
                </div>
            </div>
        `;
    }).join("");

    document.querySelectorAll(".claim-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.dataset.id);
            const item = warrantyItems.find(w => w.id === id);
            if (item && !item.claimed && calculateDaysRemaining(item.completionDate) > 0) {
                item.claimed = true;
                alert(`Claim recorded for ${item.customer}. Customer will be contacted for free re-repair.`);
                renderWarranties();
                updateStats();
            }
        });
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Initialize
updateStats();
renderWarranties();