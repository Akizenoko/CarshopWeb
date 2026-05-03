// Shop Finances - Enhanced Dashboard Script (including Parts Expenses)

// Sample data for monthly revenue (last 6 months)
const monthlyRevenue = [98500, 102400, 118200, 124850, 131200, 140500];
const months = ['Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026'];

// Expense breakdown
const expenseCategories = ['Rent', 'Utilities', 'Parts', 'Salaries', 'Marketing'];
const expenseValues = [15000, 4200, 12800, 8500, 1800];

// Top earning mechanics
const topMechanics = [
    { name: 'Ricardo Dalisay', revenue: 89200, jobs: 147, avatar: '../../../Assets/Profiles/mcado.jpg' },
    { name: 'Cardo Dalistep', revenue: 62500, jobs: 98, avatar: '../../../Assets/Profiles/mcado.jpg' },
    { name: 'Ramon Delgado', revenue: 55300, jobs: 86, avatar: '../../../Assets/Profiles/mcado.jpg' },
    { name: 'Sofia Cruz', revenue: 48900, jobs: 72, avatar: '../../../Assets/Profiles/mcado.jpg' }
];

// Recent transactions
const transactions = [
    { date: 'Apr 2, 2026', customer: 'Juan Dela Cruz', service: 'Engine Tune-up', mechanic: 'Ricardo Dalisay', payment: 'GCash', amount: 5300, status: 'paid' },
    { date: 'Apr 1, 2026', customer: 'Maria Santos', service: 'Brake Pads', mechanic: 'Cardo Dalistep', payment: 'Cash', amount: 3200, status: 'paid' },
    { date: 'Mar 30, 2026', customer: 'Pedro Lopez', service: 'Transmission Repair', mechanic: 'Ramon Delgado', payment: 'Bank Transfer', amount: 12500, status: 'pending' },
    { date: 'Mar 28, 2026', customer: 'Carla Fernandez', service: 'Oil Change', mechanic: 'Sofia Cruz', payment: 'GCash', amount: 1500, status: 'paid' },
    { date: 'Mar 25, 2026', customer: 'Ramon Torres', service: 'Tire Rotation', mechanic: 'Ricardo Dalisay', payment: 'Cash', amount: 800, status: 'paid' }
];

// Parts purchases data
const partsPurchases = [
    { part: 'Starter Motor (OEM)', qty: 2, unitPrice: 4800, supplier: 'Toyota Parts Center', date: 'Apr 2, 2026' },
    { part: 'Brake Pads (Front)', qty: 4, unitPrice: 800, supplier: 'AutoSupply PH', date: 'Apr 1, 2026' },
    { part: 'Engine Oil (5L)', qty: 10, unitPrice: 350, supplier: 'Mobil Distributor', date: 'Mar 28, 2026' },
    { part: 'Oil Filter', qty: 8, unitPrice: 180, supplier: 'Bosch', date: 'Mar 28, 2026' },
    { part: 'Spark Plugs (Iridium)', qty: 12, unitPrice: 450, supplier: 'NGK', date: 'Mar 25, 2026' }
];

// Initialize charts
function initCharts() {
    const revenueCtx = document.getElementById('revenueChart')?.getContext('2d');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{ label: 'Revenue (₱)', data: monthlyRevenue, borderColor: '#00e0ff', backgroundColor: 'rgba(0,224,255,0.1)', tension: 0.3, fill: true }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    const expenseCtx = document.getElementById('expenseChart')?.getContext('2d');
    if (expenseCtx) {
        new Chart(expenseCtx, {
            type: 'doughnut',
            data: {
                labels: expenseCategories,
                datasets: [{ data: expenseValues, backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'] }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
}

// Populate top mechanics grid
function renderTopMechanics() {
    const container = document.getElementById('topMechanicsContainer');
    if (!container) return;
    container.innerHTML = topMechanics.map(m => `
        <div class="mechanic-card">
            <img src="${m.avatar}" alt="${m.name}">
            <h4>${m.name}</h4>
            <p>₱${m.revenue.toLocaleString()}</p>
            <small>${m.jobs} jobs completed</small>
        </div>
    `).join('');
}

// Render transactions table
function renderTransactions() {
    const tbody = document.querySelector('#transactionsTable tbody');
    if (!tbody) return;
    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td>${t.date}</td>
            <td>${t.customer}</td>
            <td>${t.service}</td>
            <td>${t.mechanic}</td>
            <td>${t.payment}</td>
            <td class="amt-good">+₱${t.amount.toLocaleString()}</td>
            <td><span class="status-pill ${t.status === 'paid' ? 'paid' : 'pending'}">${t.status === 'paid' ? 'Paid' : 'Pending'}</span></td>
            <td><button class="update-btn" onclick="alert('View transaction details')">Details</button></td>
        </tr>
    `).join('');
}

// Render parts table and update total cost
function renderPartsTable() {
    const tbody = document.querySelector('#partsTable tbody');
    if (!tbody) return;
    tbody.innerHTML = partsPurchases.map(p => {
        const total = p.qty * p.unitPrice;
        return `
            <tr>
                <td>${p.part}</td>
                <td>${p.qty}</td>
                <td>₱${p.unitPrice.toLocaleString()}</td>
                <td class="amt-good">₱${total.toLocaleString()}</td>
                <td>${p.supplier}</td>
                <td>${p.date}</td>
                <td><button class="update-btn" onclick="alert('View part details for ${p.part}')">Details</button></td>
            </tr>
        `;
    }).join('');
    // Update total parts cost summary
    const totalParts = partsPurchases.reduce((sum, p) => sum + (p.qty * p.unitPrice), 0);
    const totalElem = document.querySelector('.parts-total p');
    if (totalElem) totalElem.innerText = `₱${totalParts.toLocaleString()}`;
}

// Sidebar / modal functions (unchanged)
function toggleSidebar() {
    document.getElementById("sidebar")?.classList.toggle("active");
}
function openStaffModal() {
    document.getElementById('staffModal').style.display = 'block';
}
function closeStaffModal() {
    document.getElementById('staffModal').style.display = 'none';
}
function openFinanceModal(date, desc, category, materials, labor, total, mechanic) {
    document.getElementById('financeModal').style.display = 'block';
    document.getElementById('mDesc').innerText = desc;
    document.getElementById('mDate').innerText = date;
    document.getElementById('mMech').innerText = mechanic;
    document.getElementById('mMat').innerText = materials;
    document.getElementById('mFee').innerText = labor;
    document.getElementById('mTotal').innerText = total;
}
function closeFinanceModal() {
    document.getElementById('financeModal').style.display = 'none';
}
window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
        closeStaffModal();
        closeFinanceModal();
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    renderTopMechanics();
    renderTransactions();
    renderPartsTable();

    // New transaction button event
    const newBtn = document.getElementById('newTransactionBtn');
    if (newBtn) newBtn.addEventListener('click', () => alert('Add new transaction form would open here.'));
});

