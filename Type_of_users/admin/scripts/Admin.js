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