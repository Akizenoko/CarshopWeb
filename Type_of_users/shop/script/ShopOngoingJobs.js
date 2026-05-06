// Active jobs with cost and progress steps
let activeJobs = [
    {
        id: 101,
        customer: "John Dela Cruz",
        issue: "Engine Overheating",
        vehicle: "Toyota Camry 2019",
        estimatedCompletion: "2026-05-10",
        cost: "₱4,500",
        costSet: true,
        progressSteps: [
            { name: "Request Received", completed: true, date: "2026-05-01" },
            { name: "Diagnosis", completed: true, date: "2026-05-02" },
            { name: "Repair in Progress", completed: false, inProgress: true },
            { name: "Quality Check", completed: false },
            { name: "Ready for Pickup", completed: false }
        ]
    },
    {
        id: 102,
        customer: "Maria Santos",
        issue: "Brake Pad Replacement",
        vehicle: "Honda Civic 2021",
        estimatedCompletion: "2026-05-07",
        cost: "₱4,500",
        costSet: true,
        progressSteps: [
            { name: "Request Received", completed: true, date: "2026-05-03" },
            { name: "Diagnosis", completed: true, date: "2026-05-03" },
            { name: "Parts Ordered", completed: true, date: "2026-05-04" },
            { name: "Repair in Progress", completed: false, inProgress: true },
            { name: "Quality Check", completed: false },
            { name: "Ready for Pickup", completed: false }
        ]
    },
    {
        id: 103,
        customer: "Ramon Dela Cruz",
        issue: "Transmission Fluid Leak",
        vehicle: "Ford F-150",
        estimatedCompletion: "2026-05-12",
        cost: "₱7,200",
        costSet: true,
        progressSteps: [
            { name: "Request Received", completed: true, date: "2026-05-01" },
            { name: "Diagnosis", completed: true, date: "2026-05-02" },
            { name: "Awaiting Parts", completed: false, inProgress: true },
            { name: "Repair", completed: false },
            { name: "Final Testing", completed: false }
        ]
    }
];

let finishedJobs = [
    {
        id: 201,
        customer: "Ana Reyes",
        issue: "Oil Change",
        vehicle: "Mitsubishi Mirage",
        completedDate: "2026-04-28",
        finalCost: "₱2,500"
    },
    {
        id: 202,
        customer: "Carlos Mendoza",
        issue: "Battery Replacement",
        vehicle: "Hyundai Accent",
        completedDate: "2026-04-25",
        finalCost: "₱4,200"
    }
];

// Helper functions
function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
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

// Render active jobs
function renderActiveJobs() {
    const container = document.getElementById('activeJobsContainer');
    if (activeJobs.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-inbox"></i><p>No active jobs.</p></div>`;
        return;
    }

    container.innerHTML = activeJobs.map(job => {
        const completedCount = job.progressSteps.filter(s => s.completed).length;
        const totalSteps = job.progressSteps.length;
        return `
        <div class="job-card">
            <div class="card-header">
                <h3>${escapeHtml(job.issue)}</h3>
                <span class="status-badge status-accepted">Accepted</span>
            </div>
            <div class="job-details">
                <p><i class="fa-solid fa-user"></i> ${escapeHtml(job.customer)}</p>
                <p><i class="fa-solid fa-car"></i> ${escapeHtml(job.vehicle)}</p>
                <p><i class="fa-regular fa-calendar"></i> Est. completion: ${formatDate(job.estimatedCompletion)}</p>
                <p><i class="fa-solid fa-chart-simple"></i> Progress: ${completedCount}/${totalSteps} steps</p>
            </div>
            <div class="job-cost">
                <i class="fa-solid fa-tag"></i> Cost: ${job.cost}
            </div>
            <div class="job-actions">
                <button class="btn-view" onclick="openJobModal(${job.id})"><i class="fa-solid fa-eye"></i> Manage Job</button>
                <button class="btn-finish" onclick="markAsFinished(${job.id})"><i class="fa-solid fa-check-double"></i> Mark as Finished</button>
                <button class="btn-cancel"><i class="fa-solid fa-ban"></i> Cancel</button>
            </div>
        </div>
    `}).join('');
}

// Render finished jobs
function renderFinishedJobs() {
    const container = document.getElementById('finishedJobsContainer');
    if (finishedJobs.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-archive"></i><p>No finished jobs yet.</p></div>`;
        return;
    }

    container.innerHTML = finishedJobs.map(job => `
        <div class="job-card">
            <div class="card-header">
                <h3>${escapeHtml(job.issue)}</h3>
                <span class="status-badge status-finished">Completed</span>
            </div>
            <div class="job-details">
                <p><i class="fa-solid fa-user"></i> ${escapeHtml(job.customer)}</p>
                <p><i class="fa-solid fa-car"></i> ${escapeHtml(job.vehicle)}</p>
                <p><i class="fa-regular fa-calendar-check"></i> Finished: ${formatDate(job.completedDate)}</p>
            </div>
            <div class="job-cost">
                <i class="fa-solid fa-receipt"></i> Final cost: ${job.finalCost}
            </div>
        </div>
    `).join('');
}

function updateStats() {
    document.getElementById('totalActive').innerText = activeJobs.length;
    document.getElementById('completedCount').innerText = finishedJobs.length;
}

// Modal logic
let currentJobId = null;
const modal = document.getElementById('jobModal');
const modalBody = document.getElementById('modalBody');
const updateCostBtn = document.getElementById('updateCostBtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeSpan = document.querySelector('.close-modal');

function openJobModal(jobId) {
    const job = activeJobs.find(j => j.id === jobId);
    if (!job) return;
    currentJobId = jobId;

    let stepsHtml = '';
    job.progressSteps.forEach(step => {
        let stepClass = '';
        let icon = '⏳';
        if (step.completed) {
            stepClass = 'completed';
            icon = '✅';
        } else if (step.inProgress) {
            stepClass = 'in-progress';
            icon = '⚙️';
        } else {
            icon = '○';
        }
        stepsHtml += `
            <div class="step ${stepClass}">
                <div class="step-icon">${icon}</div>
                <div class="step-info">
                    <h4>${escapeHtml(step.name)}</h4>
                    <p>${step.completed ? `Completed: ${formatDate(step.date)}` : (step.inProgress ? 'Currently in progress...' : 'Pending')}</p>
                </div>
            </div>
        `;
    });

    modalBody.innerHTML = `
        <div class="detail-row"><strong>Customer:</strong> <span>${escapeHtml(job.customer)}</span></div>
        <div class="detail-row"><strong>Issue:</strong> <span>${escapeHtml(job.issue)}</span></div>
        <div class="detail-row"><strong>Vehicle:</strong> <span>${escapeHtml(job.vehicle)}</span></div>
        <div class="detail-row"><strong>Est. Completion:</strong> <span>${formatDate(job.estimatedCompletion)}</span></div>
        <div class="detail-row"><strong>Budget:</strong> <span>100,000php</span></div>
        <div class="detail-row">
            <strong>Current Cost:</strong> <span>${job.cost}</span>
            <input type="number" id="costInput" placeholder="Update cost (₱)" value="${job.cost.replace('₱','')}" step="0.01">
        </div>
        <h3 style="margin: 1rem 0 0.5rem; color:#7bc5ff;">Progress Timeline</h3>
        <div class="progress-steps">${stepsHtml}</div>
        <div class="modal-note"><i class="fas fa-info-circle"></i> Click "Mark Next Step" to advance progress.</div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    currentJobId = null;
}

function updateCost() {
    if (!currentJobId) return;
    const job = activeJobs.find(j => j.id === currentJobId);
    if (!job) return;
    const costInput = document.getElementById('costInput');
    const newCost = costInput ? costInput.value.trim() : '';
    if (!newCost) {
        alert('Please enter a valid cost.');
        return;
    }
    const numericCost = parseFloat(newCost);
    if (isNaN(numericCost) || numericCost <= 0) {
        alert('Enter a positive number.');
        return;
    }
    job.cost = `₱${numericCost.toLocaleString()}`;
    renderActiveJobs();
    alert('Cost updated!');
    openJobModal(currentJobId);
}

function markNextStep() {
    if (!currentJobId) return;
    const job = activeJobs.find(j => j.id === currentJobId);
    if (!job) return;

    const nextIndex = job.progressSteps.findIndex(step => !step.completed);
    if (nextIndex === -1) {
        alert('All steps are already completed. Please mark the job as finished using the "Mark as Finished" button.');
        return;
    }

    job.progressSteps[nextIndex].completed = true;
    job.progressSteps[nextIndex].date = new Date().toISOString().slice(0,10);
    job.progressSteps[nextIndex].inProgress = false;
    
    if (nextIndex + 1 < job.progressSteps.length) {
        job.progressSteps[nextIndex + 1].inProgress = true;
    }

    renderActiveJobs();
    openJobModal(currentJobId);
    alert(`Step "${job.progressSteps[nextIndex].name}" marked as completed.`);
}

window.markAsFinished = function(jobId) {
    const jobIndex = activeJobs.findIndex(j => j.id === jobId);
    if (jobIndex === -1) return;
    const job = activeJobs[jobIndex];
    
    const allStepsCompleted = job.progressSteps.every(step => step.completed);
    if (!allStepsCompleted) {
        if (!confirm(`Not all progress steps are completed. Finish "${job.issue}" anyway?`)) return;
    }
    
    if (confirm(`Mark "${job.issue}" as finished? This will move it to Finished Jobs.`)) {
        finishedJobs.unshift({
            id: Date.now(),
            customer: job.customer,
            issue: job.issue,
            vehicle: job.vehicle,
            completedDate: new Date().toISOString().slice(0,10),
            finalCost: job.cost
        });
        activeJobs.splice(jobIndex, 1);
        renderActiveJobs();
        renderFinishedJobs();
        updateStats();
        alert('Job marked as finished!');
        if (currentJobId === jobId) closeModal();
    }
};

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            if (tabId === 'active') {
                document.getElementById('activeJobsTab').classList.add('active');
            } else {
                document.getElementById('finishedJobsTab').classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderActiveJobs();
    renderFinishedJobs();
    updateStats();
    initTabs();
    
    updateCostBtn.addEventListener('click', updateCost);
    nextStepBtn.addEventListener('click', markNextStep);
    closeModalBtn.addEventListener('click', closeModal);
    closeSpan.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});