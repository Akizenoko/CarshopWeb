// ========== GLOBAL FUNCTIONS ==========
// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    sidebar.classList.toggle('sidebar-collapsed');
    main.classList.toggle('main-expanded');
}

// Modal Functions
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Confirmation dialog for termination
function confirmTermination(itemType, itemName, callback) {
    const confirmed = confirm(`Are you sure you want to terminate ${itemType}: ${itemName}? This action cannot be undone.`);
    if (confirmed) callback();
}

// ========== DASHBOARD CHARTS ==========
function initCharts() {
    const jobsCtx = document.getElementById('jobsChart')?.getContext('2d');
    const usersCtx = document.getElementById('usersChart')?.getContext('2d');
    const violationCtx = document.getElementById('violationChart')?.getContext('2d');

    if (jobsCtx) {
        new Chart(jobsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{ label: 'Jobs Completed', data: [42, 58, 72, 88, 104, 125], borderColor: '#3b82f6', tension: 0.3, fill: false }]
            }
        });
    }
    if (usersCtx) {
        new Chart(usersCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{ label: 'New Users', data: [24, 36, 48, 62], backgroundColor: '#60a5fa' }]
            }
        });
    }
    if (violationCtx) {
        new Chart(violationCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                datasets: [{ label: 'Violations Count', data: [8, 12, 15, 12], backgroundColor: '#ef4444' }]
            }
        });
    }
}

// ========== USERS PAGE ==========
let currentUserPage = 1;
const usersPerPage = 5;
let allUsers = [];

function addUserRow() {
    const name = document.getElementById('newUserName')?.value;
    const email = document.getElementById('newUserEmail')?.value;
    if (!name || !email) { alert('Please fill all fields'); return; }
    const newUser = {
        name, email,
        status: 'active',
        violations: 0,
        violationDetails: []
    };
    allUsers.push(newUser);
    renderUserTable();
    closeModal('createUserModal');
    document.getElementById('newUserName').value = '';
    document.getElementById('newUserEmail').value = '';
    alert('User created successfully');
}

function viewUserViolations(userName) {
    const user = allUsers.find(u => u.name === userName);
    if (user && user.violationDetails.length > 0) {
        alert(`Violations for ${userName}:\n${user.violationDetails.join('\n')}`);
    } else {
        alert(`No violations recorded for ${userName}`);
    }
}

function terminateUser(btn, userName) {
    confirmTermination('user', userName, () => {
        const row = btn.closest('tr');
        const index = Array.from(row.parentNode.children).indexOf(row);
        allUsers.splice(index, 1);
        renderUserTable();
        alert(`User ${userName} has been terminated.`);
    });
}

function renderUserTable() {
    const tbody = document.querySelector('#userTable tbody');
    if (!tbody) return;
    const start = (currentUserPage - 1) * usersPerPage;
    const paginatedUsers = allUsers.slice(start, start + usersPerPage);
    tbody.innerHTML = paginatedUsers.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge-active">Active</span></td>
            <td><span class="violation-badge">${user.violations}</span> <button class="btn-primary" style="padding:2px 8px;" onclick="viewUserViolations('${user.name}')">View</button></td>
            <td><button class="btn-danger" onclick="terminateUser(this, '${user.name}')">Terminate</button></td>
        </tr>
    `).join('');
    renderPagination('userPagination', allUsers.length, usersPerPage, currentUserPage, (page) => {
        currentUserPage = page;
        renderUserTable();
    });
}

// ========== MECHANICS PAGE ==========
let allMechanics = [];
let currentMechPage = 1;
const mechPerPage = 5;

function addMechanicRow() {
    const name = document.getElementById('mechName')?.value;
    const shop = document.getElementById('mechShopAssign')?.value;
    const location = document.getElementById('mechLocation')?.value;
    if (!name || !shop || !location) { alert('Please fill all fields'); return; }
    allMechanics.push({
        name, shop, location,
        status: 'available',
        violations: 0,
        violationDetails: []
    });
    renderMechanicTable();
    closeModal('createMechModal');
    document.getElementById('mechName').value = '';
    document.getElementById('mechShopAssign').value = '';
    document.getElementById('mechLocation').value = '';
    alert('Mechanic added');
}

function viewMechViolations(mechName) {
    const mech = allMechanics.find(m => m.name === mechName);
    if (mech && mech.violationDetails.length) {
        alert(`Violations for ${mechName}:\n${mech.violationDetails.join('\n')}`);
    } else {
        alert(`No violations recorded for ${mechName}`);
    }
}

function terminateMech(btn, mechName) {
    confirmTermination('mechanic', mechName, () => {
        const row = btn.closest('tr');
        const index = Array.from(row.parentNode.children).indexOf(row);
        allMechanics.splice(index, 1);
        renderMechanicTable();
        alert(`Mechanic ${mechName} terminated.`);
    });
}

function renderMechanicTable() {
    const tbody = document.querySelector('#mechanicTable tbody');
    if (!tbody) return;
    const start = (currentMechPage - 1) * mechPerPage;
    const paginated = allMechanics.slice(start, start + mechPerPage);
    tbody.innerHTML = paginated.map(m => `
        <tr>
            <td>${m.name}</td>
            <td>${m.shop}</td>
            <td>${m.location}</td>
            <td><span class="badge-active">Available</span></td>
            <td><span class="violation-badge">${m.violations}</span> <button class="btn-primary" style="padding:2px 8px;" onclick="viewMechViolations('${m.name}')">View</button></td>
            <td><button class="btn-danger" onclick="terminateMech(this, '${m.name}')">Terminate</button></td>
        </tr>
    `).join('');
    renderPagination('mechPagination', allMechanics.length, mechPerPage, currentMechPage, (page) => {
        currentMechPage = page;
        renderMechanicTable();
    });
}

// ========== SHOPS PAGE ==========
let allShops = [];
let currentShopPage = 1;
const shopPerPage = 5;

function addShopRow() {
    const name = document.getElementById('shopNameNew')?.value;
    const owner = document.getElementById('shopOwner')?.value;
    const location = document.getElementById('shopLoc')?.value;
    if (!name || !owner || !location) { alert('Please fill all fields'); return; }
    allShops.push({
        name, owner, location,
        status: 'active',
        violations: 0,
        violationDetails: []
    });
    renderShopTable();
    closeModal('createShopModal');
    document.getElementById('shopNameNew').value = '';
    document.getElementById('shopOwner').value = '';
    document.getElementById('shopLoc').value = '';
    alert('Shop registered');
}

function viewShopViolations(shopName) {
    const shop = allShops.find(s => s.name === shopName);
    if (shop && shop.violationDetails.length) {
        alert(`Violations for ${shopName}:\n${shop.violationDetails.join('\n')}`);
    } else {
        alert(`No violations recorded for ${shopName}`);
    }
}

function terminateShop(btn, shopName) {
    confirmTermination('shop', shopName, () => {
        const row = btn.closest('tr');
        const index = Array.from(row.parentNode.children).indexOf(row);
        allShops.splice(index, 1);
        renderShopTable();
        alert(`Shop ${shopName} terminated.`);
    });
}

function renderShopTable() {
    const tbody = document.querySelector('#shopTable tbody');
    if (!tbody) return;
    const start = (currentShopPage - 1) * shopPerPage;
    const paginated = allShops.slice(start, start + shopPerPage);
    tbody.innerHTML = paginated.map(s => `
        <tr>
            <td>${s.name}</td>
            <td>${s.owner}</td>
            <td>${s.location}</td>
            <td><span class="badge-active">Active</span></td>
            <td><span class="violation-badge">${s.violations}</span> <button class="btn-primary" style="padding:2px 8px;" onclick="viewShopViolations('${s.name}')">View</button></td>
            <td><button class="btn-danger" onclick="terminateShop(this, '${s.name}')">Terminate</button></td>
        </tr>
    `).join('');
    renderPagination('shopPagination', allShops.length, shopPerPage, currentShopPage, (page) => {
        currentShopPage = page;
        renderShopTable();
    });
}

// ========== PAGINATION HELPER ==========
function renderPagination(containerId, totalItems, itemsPerPage, currentPage, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === currentPage ? 'active' : ''}" onclick="(function(){ if(typeof onPageChange === 'function') onPageChange(${i}); })()">${i}</button>`;
    }
    container.innerHTML = html;
    // Attach event listeners dynamically
    container.querySelectorAll('button').forEach(btn => {
        btn.onclick = (e) => {
            const page = parseInt(btn.innerText);
            if (!isNaN(page) && page !== currentPage) {
                onPageChange(page);
            }
        };
    });
}

// ========== INITIALIZE WITH SAMPLE DATA ==========
function initSampleData() {
    // Sample Users
    allUsers = [
        { name: 'Juan Dela Cruz', email: 'juan@email.com', status: 'active', violations: 2, violationDetails: ['Spam review - Jan 2026', 'Fake report - Feb 2026'] },
        { name: 'Maria Santos', email: 'maria@email.com', status: 'active', violations: 0, violationDetails: [] },
        { name: 'Carlo Reyes', email: 'carlo@email.com', status: 'suspended', violations: 5, violationDetails: ['Multiple spam reports', 'Impersonation'] },
        { name: 'Ana Lopez', email: 'ana@email.com', status: 'active', violations: 1, violationDetails: ['Abusive language'] }
    ];
    // Sample Mechanics
    allMechanics = [
        { name: 'Pedro Ramos', shop: 'Ramos Auto Repair', location: 'Pasig', status: 'available', violations: 1, violationDetails: ['No-show appointment'] },
        { name: 'Mark Velasco', shop: 'Speed Garage', location: 'Makati', status: 'busy', violations: 3, violationDetails: ['Customer complaint x2', 'Late arrival'] },
        { name: 'Leo Fernandez', shop: 'QuickFix Auto', location: 'QC', status: 'offline', violations: 0, violationDetails: [] }
    ];
    // Sample Shops
    allShops = [
        { name: 'Speed Garage', owner: 'Mike Torres', location: 'Makati', status: 'active', violations: 2, violationDetails: ['Late response', 'Overpricing complaint'] },
        { name: 'AutoFix Pasig', owner: 'Rosa Lopez', location: 'Pasig', status: 'active', violations: 0, violationDetails: [] },
        { name: 'Prime Motors', owner: 'Arthur Lim', location: 'QC', status: 'suspended', violations: 5, violationDetails: ['Fake reviews', 'Customer disputes'] }
    ];
    // Render tables if they exist
    if (document.querySelector('#userTable tbody')) renderUserTable();
    if (document.querySelector('#mechanicTable tbody')) renderMechanicTable();
    if (document.querySelector('#shopTable tbody')) renderShopTable();
}

// ========== SEARCH/FILTER FUNCTIONS ==========
function filterUsers() {
    const searchTerm = document.getElementById('userSearch')?.value.toLowerCase();
    const rows = document.querySelectorAll('#userTable tbody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function filterMechanics() {
    const searchTerm = document.getElementById('mechSearch')?.value.toLowerCase();
    const rows = document.querySelectorAll('#mechanicTable tbody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function filterShops() {
    const searchTerm = document.getElementById('shopSearch')?.value.toLowerCase();
    const rows = document.querySelectorAll('#shopTable tbody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// ========== ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) menuBtn.onclick = toggleSidebar;
    initCharts();
    initSampleData();
});