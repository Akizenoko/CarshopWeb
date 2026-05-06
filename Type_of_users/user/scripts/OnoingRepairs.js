// Sample data – includes payment status and step completion
let ongoingRepairs = [
    {
        id: 1,
        issue: "Engine Overheating",
        mechanic: "John Kaisen",
        status: "accepted",
        statusText: "Accepted — Mechanic assigned",
        estimatedCompletion: "2026-05-10",
        vehicle: "Toyota Camry 2019",
        priceEstimate: "₱4,500",
        paid: false,                 // NEW: payment flag
        progressSteps: [
            { name: "Request Received", completed: true, date: "2026-05-01" },
            { name: "Mechanic Assigned", completed: true, date: "2026-05-02" },
            { name: "Diagnosis", completed: false, inProgress: true },
            { name: "Repair in Progress", completed: false },
            { name: "Quality Check", completed: false },
            { name: "Ready for Pickup", completed: false }
        ]
    },
    {
        id: 2,
        issue: "Brake Pad Replacement",
        mechanic: "Maria Santos",
        status: "accepted",
        statusText: "Accepted — Mechanic assigned",
        estimatedCompletion: "2026-05-07",
        vehicle: "Honda Civic 2021",
        priceEstimate: "₱2,800",
        paid: false,
        progressSteps: [
            { name: "Request Received", completed: true, date: "2026-05-03" },
            { name: "Mechanic Assigned", completed: true, date: "2026-05-03" },
            { name: "Parts Ordered", completed: true, date: "2026-05-04" },
            { name: "Repair in Progress", completed: true, date: "2026-05-05" },
            { name: "Quality Check", completed: true, date: "2026-05-06" },
            { name: "Ready for Pickup", completed: true, date: "2026-05-06" }
        ]
    }
];

// Helper: check if all steps are completed
function isRepairFullyCompleted(repair) {
    return repair.progressSteps.every(step => step.completed === true);
}

// Helper: format date
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

// Render all repairs and update stats
function renderRepairs() {
    const container = document.getElementById('repairsGrid');
    if (!container) return;

    if (ongoingRepairs.length === 0) {
        container.innerHTML = `<div class="empty-state" style="text-align:center; padding:2rem; background:rgba(0,0,0,0.3); border-radius:2rem;">🔧 No ongoing repairs. <a href="Request_Mechanic.html" style="color:#00e0ff;">Request a Mechanic</a></div>`;
        document.getElementById('acceptedCount').innerText = '0';
        document.getElementById('completedCount').innerText = '0';
        return;
    }

    const acceptedTotal = ongoingRepairs.length;
    const readyToPay = ongoingRepairs.filter(r => isRepairFullyCompleted(r) && !r.paid).length;
    document.getElementById('acceptedCount').innerText = acceptedTotal;
    document.getElementById('completedCount').innerText = readyToPay;

    container.innerHTML = ongoingRepairs.map(repair => {
        const allCompleted = isRepairFullyCompleted(repair);
        const canPay = allCompleted && !repair.paid;
        const isPaid = repair.paid;
        let actionButton = '';
        if (isPaid) {
            actionButton = `<button class="track-btn" disabled style="background:#2c5a6e;"><i class="fas fa-check-circle"></i> Paid</button>`;
        } else if (canPay) {
            actionButton = `<button class="pay-btn" data-id="${repair.id}"><i class="fas fa-credit-card"></i> Pay Now (${repair.priceEstimate})</button>`;
        } else {
            actionButton = `<button class="track-btn" onclick="openTrackModal(${repair.id})"><i class="fas fa-chart-simple"></i> Track Progress</button>`;
        }

        let statusClass = "status-accepted";
        let statusDisplay = repair.statusText;
        if (isPaid) {
            statusClass += " status-paid";
            statusDisplay = "✓ Paid - Repair completed";
        } else if (allCompleted && !repair.paid) {
            statusDisplay = "✅ All steps done - Ready for payment";
        }

        return `
            <div class="repair-card" data-id="${repair.id}">
                <div class="card-header">
                    <span class="car-name"><i class="fas fa-car"></i> ${escapeHtml(repair.issue)}</span>
                    <span class="mechanic-badge"><i class="fas fa-wrench"></i> ${escapeHtml(repair.mechanic)}</span>
                </div>
                <div class="card-body">
                    <div class="service-detail"><i class="fas fa-microchip"></i> ${escapeHtml(repair.vehicle)}</div>
                    <div class="date-info">
                        <span><i class="far fa-calendar-alt"></i> Est. completion: ${formatDate(repair.estimatedCompletion)}</span>
                        <span><i class="fas fa-tag"></i> ${repair.priceEstimate}</span>
                    </div>
                    <div class="${statusClass}">${statusDisplay}</div>
                    ${actionButton}
                </div>
            </div>
        `;
    }).join('');

    // Attach event listeners to pay buttons dynamically
    document.querySelectorAll('.pay-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const repairId = parseInt(btn.getAttribute('data-id'));
            openPaymentModal(repairId);
        });
    });
}

// ----- Track Progress Modal -----
const trackModal = document.getElementById('trackModal');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.querySelector('.close-modal');

function openTrackModal(repairId) {
    const repair = ongoingRepairs.find(r => r.id === repairId);
    if (!repair) return;

    let stepsHtml = '';
    repair.progressSteps.forEach(step => {
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
        <div class="detail-row"><strong>Issue:</strong> <span>${escapeHtml(repair.issue)}</span></div>
        <div class="detail-row"><strong>Mechanic:</strong> <span>${escapeHtml(repair.mechanic)}</span></div>
        <div class="detail-row"><strong>Vehicle:</strong> <span>${escapeHtml(repair.vehicle)}</span></div>
        <div class="detail-row"><strong>Estimate:</strong> <span>${repair.priceEstimate}</span></div>
        <div class="detail-row"><strong>Est. completion:</strong> <span>${formatDate(repair.estimatedCompletion)}</span></div>
        <h3 style="margin: 1rem 0 0.5rem; color:#7bc5ff;"><i class="fas fa-timeline"></i> Progress Timeline</h3>
        <div class="progress-steps">${stepsHtml}</div>
        <div class="modal-note"><i class="fas fa-clock"></i> You'll be notified when each step updates.</div>
    `;
    trackModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeTrackModal() {
    trackModal.style.display = 'none';
    document.body.style.overflow = '';
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeTrackModal);
window.addEventListener('click', (e) => {
    if (e.target === trackModal) closeTrackModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && trackModal.style.display === 'block') closeTrackModal();
});

// ----- Payment Modal -----
const paymentModal = document.getElementById('paymentModal');
const paymentModalBody = document.getElementById('paymentModalBody');
const closePaymentBtn = document.querySelector('.close-payment-modal');

function openPaymentModal(repairId) {
    const repair = ongoingRepairs.find(r => r.id === repairId);
    if (!repair || repair.paid) return;
    if (!isRepairFullyCompleted(repair)) {
        alert("This repair is not yet fully completed. Please wait until all steps are done.");
        return;
    }

    paymentModalBody.innerHTML = `
        <div class="detail-row"><strong>Service:</strong> ${escapeHtml(repair.issue)}</div>
        <div class="detail-row"><strong>Vehicle:</strong> ${escapeHtml(repair.vehicle)}</div>
        <div class="detail-row"><strong>Total amount:</strong> <span style="font-size:1.4rem; color:#2ecc71;">${repair.priceEstimate}</span></div>
        <div class="payment-form">
            <input type="text" placeholder="Card Number •••• •••• •••• ••••" id="cardNumber">
            <input type="text" placeholder="MM/YY" id="expiry">
            <input type="text" placeholder="CVC" id="cvc">
            <button id="confirmPaymentBtn">Confirm Payment (${repair.priceEstimate})</button>
            <button id="confirmPaymentBtn">Pay in other way (${repair.priceEstimate})</button>
        </div>
        <div class="modal-note"><i class="fas fa-lock"></i> Secure demo payment – no real charge</div>
    `;
    paymentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    const confirmBtn = document.getElementById('confirmPaymentBtn');
    const handlePayment = () => {
        // Simulate payment success
        repair.paid = true;
        renderRepairs();
        closePaymentModal();
        alert(`✅ Payment of ${repair.priceEstimate} received! Thank you for choosing PrecisionDrive.`);
    };
    confirmBtn.addEventListener('click', handlePayment, { once: true });
}

function closePaymentModal() {
    paymentModal.style.display = 'none';
    document.body.style.overflow = '';
}

if (closePaymentBtn) closePaymentBtn.addEventListener('click', closePaymentModal);
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) closePaymentModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && paymentModal.style.display === 'block') closePaymentModal();
});

// Initial render
renderRepairs();