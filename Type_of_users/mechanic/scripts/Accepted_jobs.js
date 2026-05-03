// Sample accepted jobs data (replace with API call)
const acceptedJobs = [
    { id: 1, customer: "Bolaños, Trisha", vehicle: "2021 Honda CR-V", issue: "Knocking from front suspension", acceptedDate: "2025-03-10", status: "in-progress", location: "Pasonanca", budget: "₱80k" },
    { id: 3, customer: "Ramos, Celeste", vehicle: "2021 Suzuki Jimny", issue: "4WD not engaging", acceptedDate: "2025-03-09", status: "completed", location: "Camino Nuevo", budget: "₱55k" },
    { id: 4, customer: "Cruz, Emilio", vehicle: "2016 Toyota Vios", issue: "Overheating + coolant leak", acceptedDate: "2025-03-08", status: "in-progress", location: "Talon-Talon", budget: "₱40k" },
    { id: 5, customer: "Lim, Patricia", vehicle: "2020 Toyota Innova", issue: "Transmission slipping", acceptedDate: "2025-03-07", status: "completed", location: "Baliwasan", budget: "₱110k" }
];

function updateStats() {
    const total = acceptedJobs.length;
    const inProgress = acceptedJobs.filter(job => job.status === "in-progress").length;
    const completed = acceptedJobs.filter(job => job.status === "completed").length;
    document.getElementById("totalAccepted").innerText = total;
    document.getElementById("inProgressCount").innerText = inProgress;
    document.getElementById("completedCount").innerText = completed;
}

function renderJobs() {
    const container = document.getElementById("acceptedJobsContainer");
    container.innerHTML = acceptedJobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <h2>${escapeHtml(job.customer)}</h2>
                <span class="status-badge ${job.status === "in-progress" ? "s-inprogress" : "s-completed"}">${job.status === "in-progress" ? "In Progress" : "Completed"}</span>
            </div>
            <div class="job-details">
                <p><i class="fa-solid fa-car"></i> ${escapeHtml(job.vehicle)}</p>
                <p><i class="fa-solid fa-wrench"></i> ${escapeHtml(job.issue)}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${escapeHtml(job.location)}</p>
                <p><i class="fa-solid fa-coin"></i> ${escapeHtml(job.budget)}</p>
                <p><i class="fa-regular fa-calendar"></i> Accepted: ${new Date(job.acceptedDate).toLocaleDateString()}</p>
            </div>
            <div class="job-actions">
                ${job.status === "in-progress" ? `<button class="update-btn" data-id="${job.id}">Mark as Completed</button>` : `<button class="view-warranty-btn" data-id="${job.id}">View Warranty</button>`}
            </div>
        </div>
    `).join("");

    // Attach event listeners
    document.querySelectorAll(".update-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.dataset.id);
            const job = acceptedJobs.find(j => j.id === id);
            if (job && job.status === "in-progress") {
                job.status = "completed";
                renderJobs();
                updateStats();
                alert(`Job for ${job.customer} marked as completed. Warranty period started.`);
            }
        });
    });

    document.querySelectorAll(".view-warranty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "Mechanic_Warranties.html";
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
renderJobs();