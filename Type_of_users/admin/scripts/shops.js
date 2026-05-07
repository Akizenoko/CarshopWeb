let allShops = [];
let currentShopPage = 1;
const shopPerPage = 5;

function initSampleShops() {
    allShops = [
        { name: 'Speed Garage', owner: 'Mike Torres', location: 'Makati', status: 'active', violations: 2, violationDetails: ['Late response', 'Overpricing complaint'], terminated: false },
        { name: 'AutoFix Pasig', owner: 'Rosa Lopez', location: 'Pasig', status: 'active', violations: 0, violationDetails: [], terminated: false },
        { name: 'Prime Motors', owner: 'Arthur Lim', location: 'QC', status: 'suspended', violations: 5, violationDetails: ['Fake reviews', 'Customer disputes'], terminated: false }
    ];
    renderShopTable();
}

function addShopRow() {
    const name = document.getElementById('shopNameNew')?.value;
    const owner = document.getElementById('shopOwner')?.value;
    const location = document.getElementById('shopLoc')?.value;
    if (!name || !owner || !location) { alert('Please fill all fields'); return; }
    allShops.push({
        name, owner, location,
        status: 'active',
        violations: 0,
        violationDetails: [],
        terminated: false
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

function toggleShopTermination(shopName) {
    const shop = allShops.find(s => s.name === shopName);
    if (!shop) return;
    const action = shop.terminated ? 'restore' : 'terminate';
    if (confirm(`Are you sure you want to ${action} shop "${shopName}"?`)) {
        shop.terminated = !shop.terminated;
        renderShopTable();
        alert(`Shop "${shopName}" has been ${shop.terminated ? 'terminated' : 'restored'}.`);
    }
}

function renderShopTable() {
    const tbody = document.querySelector('#shopTable tbody');
    if (!tbody) return;
    const start = (currentShopPage - 1) * shopPerPage;
    const paginated = allShops.slice(start, start + shopPerPage);
    tbody.innerHTML = paginated.map(s => {
        const statusBadge = s.terminated 
            ? '<span class="badge-terminated">Terminated</span>' 
            : '<span class="badge-active">Active</span>';
        const actionButton = s.terminated
            ? `<button class="btn-restore" onclick="toggleShopTermination('${s.name}')">Restore</button>`
            : `<button class="btn-danger" onclick="toggleShopTermination('${s.name}')">Terminate</button>`;
        return `
            <tr>
                <td>${s.name}</td>
                <td>${s.owner}</td>
                <td>${s.location}</td>
                <td>${statusBadge}</td>
                <td><span class="violation-badge">${s.violations}</span> <button class="btn-primary" style="padding:2px 8px;" onclick="viewShopViolations('${s.name}')">View</button></td>
                <td>${actionButton}</td>
            </tr>
        `;
    }).join('');
    renderPagination('shopPagination', allShops.length, shopPerPage, currentShopPage, (page) => {
        currentShopPage = page;
        renderShopTable();
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

document.addEventListener('DOMContentLoaded', () => {
    initSampleShops();
});