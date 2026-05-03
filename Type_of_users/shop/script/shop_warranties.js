// Sample warranty data (repairs completed by this shop)
const warrantyItems = [
    {
        id: 1,
        customer: "Juan Dela Cruz",
        vehicle: "2019 Toyota Fortuner",
        issue: "Engine won't start",
        mechanic: "Ricardo Dalisay",
        completionDate: "2025-03-12",
        location: "Zamboanga City",
        claimed: false
    },
    {
        id: 2,
        customer: "Maria Santos",
        vehicle: "2021 Honda CR-V",
        issue: "Knocking from front suspension",
        mechanic: "Cardo Dalistep",
        completionDate: "2025-03-09",
        location: "Zamboanga City",
        claimed: false
    },
    {
        id: 3,
        customer: "Pedro Lopez",
        vehicle: "2022 Mitsubishi Montero",
        issue: "Transmission slipping",
        mechanic: "Ramon Delgado",
        completionDate: "2025-03-07",
        location: "Zamboanga City",
        claimed: false
    },
    {
        id: 4,
        customer: "Carla Fernandez",
        vehicle: "2020 Toyota Innova",
        issue: "Brake pads replacement",
        mechanic: "Sofia Cruz",
        completionDate: "2025-03-01",
        location: "Zamboanga City",
        claimed: true
    }
];

function daysRemaining(completionDate) {
    const completed = new Date(completionDate);
    const today = new Date();
    const daysPassed = Math.floor((today - completed) / (1000 * 60 * 60 * 24));
    return 24 - daysPassed;
}

function updateStats() {
    const active = warrantyItems.filter(w => !w.claimed && daysRemaining(w.completionDate) > 0).length;
    const expiring = warrantyItems.filter(w => {
        if (w.claimed) return false;
        const days = daysRemaining(w.completionDate);
        return days <= 5 && days > 0;
    }).length;
    const claimed = warrantyItems.filter(w => w.claimed).length;

    document.getElementById("activeWarrantyCount").innerText = active;
    document.getElementById("expiringSoonCount").innerText = expiring;
}

function renderWarranties() {
    const container = document.getElementById("warrantiesContainer");
    container.innerHTML = warrantyItems.map(item => {
        const days = daysRemaining(item.completionDate);
        const isExpired = days <= 0;
        const isExpiringSoon = days <= 5 && days > 0;
        let statusClass = "warranty-active";
        let statusText = `${days} days left`;
        if (isExpired) { statusClass = "warranty-expired"; statusText = "Expired"; }
        else if (isExpiringSoon) { statusClass = "warranty-expiring"; statusText = "Expiring soon"; }
        if (item.claimed) statusText = "Claim processed";

        return `
            <div class="warranty-card ${statusClass}">
                <div class="card-header">
                    <h2>${escapeHtml(item.customer)}</h2>
                    <span class="warranty-badge">${statusText}</span>
                </div>
                <div class="card-body">
                    <p><i class="fa-solid fa-car"></i> ${escapeHtml(item.vehicle)}</p>
                    <p><i class="fa-solid fa-wrench"></i> ${escapeHtml(item.issue)}</p>
                    <p><i class="fa-solid fa-user-gear"></i> Mechanic: ${escapeHtml(item.mechanic)}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)}</p>
                    <p><i class="fa-regular fa-calendar-check"></i> Completed: ${new Date(item.completionDate).toLocaleDateString()}</p>
                </div>
                <div class="card-actions">
                    ${!isExpired && !item.claimed ? `<button class="claim-btn" data-id="${item.id}">Mark Claim as Processed</button>` : 
                      (item.claimed ? `<span class="claimed-badge"><i class="fa-solid fa-check-circle"></i> Claim completed</span>` : 
                      `<span></span>`)}
                </div>
            </div>
        `;
    }).join("");

    // Attach claim event listeners
    document.querySelectorAll(".claim-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.dataset.id);
            const item = warrantyItems.find(w => w.id === id);
            if (item && !item.claimed && daysRemaining(item.completionDate) > 0) {
                item.claimed = true;
                alert(`Claim processed for ${item.customer}. Your shop must now perform the free re‑repair.`);
                renderWarranties();
                updateStats();
            }
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

updateStats();
renderWarranties();