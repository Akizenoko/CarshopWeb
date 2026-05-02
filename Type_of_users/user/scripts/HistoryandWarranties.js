// ---------- DATA MODEL ----------
let repairs = [];

// Helper: warranty active check (14 days from completionDate, inclusive)
function isWarrantyActive(completionDateStr) {
    const completion = new Date(completionDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(completion);
    expiry.setDate(expiry.getDate() + 14);
    expiry.setHours(23, 59, 59, 999);
    return today <= expiry;
}

// days left for warranty (positive integer if active, else 0)
function getWarrantyDaysLeft(completionDateStr) {
    const completion = new Date(completionDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(completion);
    expiry.setDate(expiry.getDate() + 14);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry - today;
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// format date to readable
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// render stats and grid
function renderDashboard() {
    const total = repairs.length;
    const activeWarranties = repairs.filter(r => !r.freeRepairClaimed && isWarrantyActive(r.completionDate)).length;
    const claimedCount = repairs.filter(r => r.freeRepairClaimed === true).length;
    document.getElementById('totalRepairsCount').innerText = total;
    document.getElementById('activeWarrantyCount').innerText = activeWarranties;
    document.getElementById('claimedFreeCount').innerText = claimedCount;

    const gridContainer = document.getElementById('repairsGrid');
    if (!gridContainer) return;
    if (repairs.length === 0) {
        gridContainer.innerHTML = `<div style="background: white; border-radius: 1.5rem; padding: 2rem; text-align: center; color:#1e4b6e; width:100%;"><i class="fas fa-folder-open"></i> No finished inquiries yet. Add one above or reset demo.</div>`;
        return;
    }

    gridContainer.innerHTML = repairs.map(repair => {
        const warrantyActive = isWarrantyActive(repair.completionDate);
        const daysLeft = getWarrantyDaysLeft(repair.completionDate);
        const expiryDateObj = new Date(repair.completionDate);
        expiryDateObj.setDate(expiryDateObj.getDate() + 14);
        const expiryDisplay = formatDate(expiryDateObj.toISOString().slice(0, 10));

        let warrantyStatusHtml = '';
        let buttonDisabled = false;
        let buttonText = '';
        let extraMessage = '';

        if (repair.freeRepairClaimed) {
            warrantyStatusHtml = `<div class="warranty-status claimed-badge"><span><i class="fas fa-check-circle"></i> Free repair already requested</span><span>🔧 No payment needed</span></div>`;
            buttonDisabled = true;
            buttonText = '✓ Claim submitted (free)';
            extraMessage = '<div class="claim-status-text"><i class="fas fa-clock"></i> Mechanic will re-fix without charge — incident recorded.</div>';
        } else if (warrantyActive) {
            warrantyStatusHtml = `<div class="warranty-status active-warranty"><span><i class="fas fa-shield-alt"></i> ✅ Warranty active — ${daysLeft} day(s) left</span><span>📅 expires: ${expiryDisplay}</span></div>`;
            buttonDisabled = false;
            buttonText = '<i class="fas fa-tools"></i> Request free re-repair';
            extraMessage = '';
        } else {
            warrantyStatusHtml = `<div class="warranty-status expired-warranty"><span><i class="fas fa-hourglass-end"></i> ⚠️ Warranty expired</span><span> beyond 24 days</span></div>`;
            buttonDisabled = true;
            buttonText = 'Warranty expired';
            extraMessage = '<div class="claim-status-text" style="color:#aa4a4a;">Out-of-coverage period, standard charges apply.</div>';
        }

        const claimAction = !repair.freeRepairClaimed && warrantyActive ? `onclick="requestFreeRepair(${repair.id})"` : 'disabled';

        return `
            <div class="repair-card">
                <div class="card-header">
                    <span class="car-name"><i class="fas fa-car"></i> ${escapeHtml(repair.car)}</span>
                    <span class="mechanic-badge"><i class="fas fa-wrench"></i> ${escapeHtml(repair.mechanic)}</span>
                </div>
                <div class="card-body">
                    <div class="service-detail"><i class="fas fa-microchip"></i> ${escapeHtml(repair.service)}</div>
                    <div class="date-info">
                        <span><i class="far fa-calendar-alt"></i> Completed: ${formatDate(repair.completionDate)}</span>
                        <span><i class="fas fa-user-mechanic"></i> Job ID: #${repair.id}</span>
                    </div>
                    ${warrantyStatusHtml}
                    <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                        <button class="btn-claim" id="claimBtn-${repair.id}" ${claimAction === 'disabled' ? 'disabled' : ''} ${claimAction !== 'disabled' ? claimAction : ''}>
                            ${buttonText}
                        </button>
                        ${extraMessage}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// global function for free repair request
window.requestFreeRepair = function (repairId) {
    const repairIndex = repairs.findIndex(r => r.id === repairId);
    if (repairIndex === -1) return;
    const repair = repairs[repairIndex];
    const warrantyValid = isWarrantyActive(repair.completionDate);
    if (!warrantyValid || repair.freeRepairClaimed) {
        alert("This repair is no longer under warranty or free repair already claimed.");
        renderDashboard();
        return;
    }
    const confirmMsg = `⚠️ Confirm: You are reporting that the SAME issue (${repair.service}) reappeared within the 14-day guarantee. The mechanic (${repair.mechanic}) will fix it again FREE of charge. This incident is permanently recorded. Continue?`;
    if (confirm(confirmMsg)) {
        repairs[repairIndex].freeRepairClaimed = true;
        saveToLocalStorage();
        renderDashboard();
        alert(`✅ Free repair requested for your ${repair.car}. Mechanic ${repair.mechanic} has been notified. You will not pay for this fix. Incident recorded in history.`);
    }
};
// default demo data (with various warranty ages & one already claimed)
function loadDefaultRepairs() {
    const today = new Date();
    const yyyymmdd = (date) => date.toISOString().slice(0, 10);

    const twoDaysAgo = new Date(); twoDaysAgo.setDate(today.getDate() - 2);
    const fiveDaysAgo = new Date(); fiveDaysAgo.setDate(today.getDate() - 5);
    const tenDaysAgo = new Date(); tenDaysAgo.setDate(today.getDate() - 10);
    const fifteenDaysAgo = new Date(); fifteenDaysAgo.setDate(today.getDate() - 15);
    const threeDaysAgo = new Date(); threeDaysAgo.setDate(today.getDate() - 3);
    const oneWeekAgo = new Date(); oneWeekAgo.setDate(today.getDate() - 7);

    return [
        { id: 1001, car: "Toyota Camry 2019", mechanic: "Mechanic Name", service: "Brake pads & rotors replacement", completionDate: yyyymmdd(fiveDaysAgo), freeRepairClaimed: false },
        { id: 1002, car: "Honda Civic 2021", mechanic: "Shop Name", service: "AC compressor repair", completionDate: yyyymmdd(twoDaysAgo), freeRepairClaimed: false },
        { id: 1003, car: "Ford F-150 2020", mechanic: "Mechanic Name", service: "Transmission fluid leak fix", completionDate: yyyymmdd(fifteenDaysAgo), freeRepairClaimed: false },
        { id: 1004, car: "Tesla Model 3", mechanic: "Shop Name", service: "BMS software update & HV contactor", completionDate: yyyymmdd(oneWeekAgo), freeRepairClaimed: false },
        { id: 1005, car: "Chevrolet Malibu", mechanic: "Mechanic Name", service: "Engine misfire (coil pack)", completionDate: yyyymmdd(tenDaysAgo), freeRepairClaimed: false },
        { id: 1006, car: "BMW X5", mechanic: "Shop Name", service: "Coolant pump replacement", completionDate: yyyymmdd(threeDaysAgo), freeRepairClaimed: false },
        { id: 1007, car: "Hyundai Elantra", mechanic: "Mechanic Name", service: "Spark plugs & ignition coils", completionDate: yyyymmdd(oneWeekAgo), freeRepairClaimed: true }
    ];
}

// localStorage persistence
function saveToLocalStorage() {
    localStorage.setItem('garage_finished_inquiries', JSON.stringify(repairs));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('garage_finished_inquiries');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length) {
                repairs = parsed;
                return;
            }
        } catch (e) { }
    }
    repairs = loadDefaultRepairs();
    saveToLocalStorage();
}

function resetToDemo() {
    if (confirm("Reset to demo history? all current custom repairs will be replaced with example repairs (including active/expired warranty cases).")) {
        repairs = loadDefaultRepairs();
        saveToLocalStorage();
        renderDashboard();
    }
}

// ---- Event Listeners after DOM ready ----
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderDashboard();

    const addBtn = document.getElementById('addRepairBtn');
    if (addBtn) addBtn.addEventListener('click', addNewRepair);

    const resetBtn = document.getElementById('resetDemoBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetToDemo);

    const dateInput = document.getElementById('completionDateInput');
    if (dateInput && !dateInput.value) {
        const todayStr = new Date().toISOString().slice(0, 10);
        dateInput.value = todayStr;
    }
});