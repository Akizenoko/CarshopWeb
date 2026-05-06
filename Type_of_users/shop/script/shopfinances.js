// ----- DATA MODELS -----
let transactions = [
    { id: 1, date: 'Apr 2, 2026', customer: 'Juan Dela Cruz', service: 'Engine Tune-up', mechanic: 'Ricardo Dalisay', payment: 'GCash', amount: 5300, status: 'paid' },
    { id: 2, date: 'Apr 1, 2026', customer: 'Maria Santos', service: 'Brake Pads', mechanic: 'Cardo Dalistep', payment: 'Cash', amount: 3200, status: 'paid' },
    { id: 3, date: 'Mar 30, 2026', customer: 'Pedro Lopez', service: 'Transmission Repair', mechanic: 'Ramon Delgado', payment: 'Bank Transfer', amount: 12500, status: 'pending' },
    { id: 4, date: 'Mar 28, 2026', customer: 'Carla Fernandez', service: 'Oil Change', mechanic: 'Sofia Cruz', payment: 'GCash', amount: 1500, status: 'paid' },
    { id: 5, date: 'Mar 25, 2026', customer: 'Ramon Torres', service: 'Tire Rotation', mechanic: 'Ricardo Dalisay', payment: 'Cash', amount: 800, status: 'paid' }
];

let partsPurchases = [
    { id: 1, part: 'Starter Motor (OEM)', qty: 2, unitPrice: 4800, supplier: 'Toyota Parts Center', date: 'Apr 2, 2026' },
    { id: 2, part: 'Brake Pads (Front)', qty: 4, unitPrice: 800, supplier: 'AutoSupply PH', date: 'Apr 1, 2026' },
    { id: 3, part: 'Engine Oil (5L)', qty: 10, unitPrice: 350, supplier: 'Mobil Distributor', date: 'Mar 28, 2026' },
    { id: 4, part: 'Oil Filter', qty: 8, unitPrice: 180, supplier: 'Bosch', date: 'Mar 28, 2026' },
    { id: 5, part: 'Spark Plugs (Iridium)', qty: 12, unitPrice: 450, supplier: 'NGK', date: 'Mar 25, 2026' }
];

const mechanicsList = [
    { name: 'Ricardo Dalisay', revenue: 89200, jobs: 147, avatar: '../../../Assets/Profiles/mcado.jpg' },
    { name: 'Cardo Dalistep', revenue: 62500, jobs: 98, avatar: '../../../Assets/Profiles/mcado.jpg' },
    { name: 'Ramon Delgado', revenue: 55300, jobs: 86, avatar: '../../../Assets/Profiles/mcado.jpg' },
    { name: 'Sofia Cruz', revenue: 48900, jobs: 72, avatar: '../../../Assets/Profiles/mcado.jpg' }
];

const monthlyRevenue = [98500, 102400, 118200, 124850, 131200, 140500];
const months = ['Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026'];
const expenseCategories = ['Rent', 'Utilities', 'Parts', 'Salaries', 'Marketing'];
const expenseValues = [15000, 4200, 12800, 8500, 1800];

let revenueChart, expenseChart;

// ----- HELPERS -----
function updateTotals() {
    const revenue = transactions.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
    const pending = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
    const expenses = 42300; // static example
    const profit = revenue - 3000;
    const margin = revenue ? (profit / revenue) * 100 : 0;
    
    document.getElementById('totalRevenue').innerText = `₱${revenue.toLocaleString()}`;
    document.getElementById('pendingTotal').innerText = `₱${pending.toLocaleString()}`;
    document.getElementById('netProfit').innerText = `₱${profit.toLocaleString()}`;
    document.getElementById('gaugeFill').style.width = `${Math.min(100, margin)}%`;
    document.getElementById('gaugePercent').innerText = `${Math.round(margin)}%`;
    document.getElementById('marginCompare').innerHTML = margin > 55 ? `+${Math.round(margin-55)}% above average` : `${Math.round(margin)}% (below avg)`;
}

function renderTransactions() {
    const tbody = document.getElementById('transactionsTableBody');
    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td>${t.date}</td><td>${t.customer}</td><td>${t.service}</td><td>${t.mechanic}</td><td>${t.payment}</td>
            <td class="amt-good">+₱${t.amount.toLocaleString()}</td>
            <td><span class="status-pill ${t.status}">${t.status === 'paid' ? 'Paid' : 'Pending'}</span></td>
            <td><button class="update-btn" onclick="viewTransaction(${t.id})">Details</button></td>
        </tr>
    `).join('');
    updateTotals();
}

function renderParts() {
    const tbody = document.getElementById('partsTableBody');
    const totalParts = partsPurchases.reduce((sum, p) => sum + (p.qty * p.unitPrice), 0);
    document.getElementById('totalPartsCost').innerText = `₱${totalParts.toLocaleString()}`;
    tbody.innerHTML = partsPurchases.map(p => {
        const total = p.qty * p.unitPrice;
        return `<tr>
            <td>${p.part}</td><td>${p.qty}</td><td>₱${p.unitPrice.toLocaleString()}</td>
            <td>₱${total.toLocaleString()}</td><td>${p.supplier}</td><td>${p.date}</td>
            <td><button class="update-btn" onclick="viewPart(${p.id})">Details</button></td>
        </tr>`;
    }).join('');
}

function renderTopMechanics() {
    const container = document.getElementById('topMechanicsContainer');
    container.innerHTML = mechanicsList.map(m => `
        <div class="mechanic-card">
            <img src="${m.avatar}" alt="${m.name}">
            <h4>${m.name}</h4>
            <p>₱${m.revenue.toLocaleString()}</p>
            <small>${m.jobs} jobs</small>
        </div>
    `).join('');
}

function initCharts() {
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: { labels: months, datasets: [{ label: 'Revenue (₱)', data: monthlyRevenue, borderColor: '#00e0ff', backgroundColor: 'rgba(0,224,255,0.1)', tension: 0.3, fill: true }] },
        options: { responsive: true, maintainAspectRatio: true }
    });
    const expenseCtx = document.getElementById('expenseChart').getContext('2d');
    expenseChart = new Chart(expenseCtx, {
        type: 'doughnut',
        data: { labels: expenseCategories, datasets: [{ data: expenseValues, backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'] }] },
        options: { responsive: true, maintainAspectRatio: true }
    });
}

function populateMechanicSelect() {
    const select = document.getElementById('transMechanic');
    select.innerHTML = mechanicsList.map(m => `<option value="${m.name}">${m.name}</option>`).join('');
}

// Transaction modal handlers
window.viewTransaction = (id) => {
    const t = transactions.find(tx => tx.id === id);
    if (!t) return;
    document.getElementById('transactionDetailContent').innerHTML = `
        <div style="padding:10px;"><p><strong>Date:</strong> ${t.date}</p><p><strong>Customer:</strong> ${t.customer}</p>
        <p><strong>Service:</strong> ${t.service}</p><p><strong>Mechanic:</strong> ${t.mechanic}</p>
        <p><strong>Payment:</strong> ${t.payment}</p><p><strong>Amount:</strong> ₱${t.amount.toLocaleString()}</p>
        <p><strong>Status:</strong> ${t.status}</p><button class="btn-primary" onclick="closeModal('transactionDetailModal')">Close</button></div>
    `;
    openModal('transactionDetailModal');
};

window.viewPart = (id) => {
    const part = partsPurchases.find(p => p.id === id);
    if (!part) return;
    document.getElementById('partDetailContent').innerHTML = `
        <div style="padding:10px;"><p><strong>Part:</strong> ${part.part}</p><p><strong>Quantity:</strong> ${part.qty}</p>
        <p><strong>Unit Price:</strong> ₱${part.unitPrice.toLocaleString()}</p><p><strong>Total:</strong> ₱${(part.qty * part.unitPrice).toLocaleString()}</p>
        <p><strong>Supplier:</strong> ${part.supplier}</p><p><strong>Date:</strong> ${part.date}</p>
        <button class="btn-primary" onclick="closeModal('partDetailModal')">Close</button></div>
    `;
    openModal('partDetailModal');
};

// New transaction
document.getElementById('newTransactionBtn')?.addEventListener('click', () => {
    document.getElementById('transactionForm').reset();
    openModal('newTransactionModal');
});

document.getElementById('transactionForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newId = Math.max(0, ...transactions.map(t => t.id)) + 1;
    const newTrans = {
        id: newId,
        date: document.getElementById('transDate').value,
        customer: document.getElementById('transCustomer').value,
        service: document.getElementById('transService').value,
        mechanic: document.getElementById('transMechanic').value,
        payment: document.getElementById('transPayment').value,
        amount: parseFloat(document.getElementById('transAmount').value),
        status: document.getElementById('transStatus').value
    };
    if (!newTrans.date || !newTrans.customer || !newTrans.service || !newTrans.amount) return;
    transactions.unshift(newTrans);
    renderTransactions();
    closeModal('newTransactionModal');
});

// View unpaid
document.getElementById('viewUnpaidBtn')?.addEventListener('click', () => {
    const unpaid = transactions.filter(t => t.status === 'pending');
    const container = document.getElementById('unpaidListContainer');
    if (unpaid.length === 0) {
        container.innerHTML = '<p>No pending payments.</p>';
    } else {
        container.innerHTML = unpaid.map(t => `<div class="staff-card"><div><strong>${t.customer}</strong> - ₱${t.amount.toLocaleString()}<br><small>${t.service} | ${t.date}</small></div></div>`).join('');
    }
    openModal('unpaidModal');
});

// Staff modal - static sample
function renderStaffList() {
    const staffContainer = document.getElementById('staffListContainer');
    staffContainer.innerHTML = mechanicsList.map((m, idx) => `
        <div class="staff-card">
            <img src="${m.avatar}" alt="${m.name}">
            <div class="staff-info"><h3>${m.name}</h3><p>${m.jobs > 80 ? 'Senior Mechanic' : 'Junior Mechanic'}</p></div>
            <button class="remove-btn" onclick="alert('Remove mechanic demo')"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join('');
}
document.getElementById('addMechanicBtn')?.addEventListener('click', () => alert('Add mechanic form (demo).'));

// Notifications & chat placeholders
function loadNotifications() {
    const notifDiv = document.getElementById('notificationsList');
    notifDiv.innerHTML = `<div class="notification-item"><div class="notification-title">Welcome</div><p>Dashboard ready.</p><div class="notification-time">Now</div></div>`;
}
function loadChat() {
    const chatDiv = document.getElementById('chatList');
    chatDiv.innerHTML = `<div class="chat-item"><div class="chat-sender">System</div><div class="chat-preview">All financial modules working.</div><div class="chat-time">Today</div></div>`;
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    renderTopMechanics();
    renderTransactions();
    renderParts();
    populateMechanicSelect();
    renderStaffList();
    loadNotifications();
    loadChat();
    
    // Date picker sample
    document.getElementById('reportDate')?.addEventListener('change', (e) => {
        alert(`Filter by date: ${e.target.value} (demo)`);
    });
});

