let allMechanics = [];
let currentMechPage = 1;
const mechPerPage = 5;

function initSampleMechanics() {
    allMechanics = [
        { name: 'Pedro Ramos', shop: 'Ramos Auto Repair', location: 'Pasig', status: 'available', violations: 1, violationDetails: ['No-show appointment'], terminated: false },
        { name: 'Mark Velasco', shop: 'Speed Garage', location: 'Makati', status: 'busy', violations: 3, violationDetails: ['Customer complaint x2', 'Late arrival'], terminated: false },
        { name: 'Leo Fernandez', shop: 'QuickFix Auto', location: 'QC', status: 'offline', violations: 0, violationDetails: [], terminated: false }
    ];
    renderMechanicTable();
}

function addMechanicRow() {
    const name = document.getElementById('mechName')?.value;
    const shop = document.getElementById('mechShopAssign')?.value;
    const location = document.getElementById('mechLocation')?.value;
    if (!name || !shop || !location) { alert('Please fill all fields'); return; }
    allMechanics.push({
        name, shop, location,
        status: 'available',
        violations: 0,
        violationDetails: [],
        terminated: false
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

function toggleMechTermination(mechName) {
    const mech = allMechanics.find(m => m.name === mechName);
    if (!mech) return;
    const action = mech.terminated ? 'restore' : 'terminate';
    if (confirm(`Are you sure you want to ${action} mechanic "${mechName}"?`)) {
        mech.terminated = !mech.terminated;
        renderMechanicTable();
        alert(`Mechanic "${mechName}" has been ${mech.terminated ? 'terminated' : 'restored'}.`);
    }
}

function renderMechanicTable() {
    const tbody = document.querySelector('#mechanicTable tbody');
    if (!tbody) return;
    const start = (currentMechPage - 1) * mechPerPage;
    const paginated = allMechanics.slice(start, start + mechPerPage);
    tbody.innerHTML = paginated.map(m => {
        const statusBadge = m.terminated 
            ? '<span class="badge-terminated">Terminated</span>' 
            : '<span class="badge-active">Available</span>';
        const actionButton = m.terminated
            ? `<button class="btn-restore" onclick="toggleMechTermination('${m.name}')">Restore</button>`
            : `<button class="btn-danger" onclick="toggleMechTermination('${m.name}')">Terminate</button>`;
        return `
            <tr>
                <td>${m.name}</td>
                <td>${m.shop}</td>
                <td>${m.location}</td>
                <td>${statusBadge}</td>
                <td><span class="violation-badge">${m.violations}</span> <button class="btn-primary" style="padding:2px 8px;" onclick="viewMechViolations('${m.name}')">View</button></td>
                <td>${actionButton}</td>
            </tr>
        `;
    }).join('');
    renderPagination('mechPagination', allMechanics.length, mechPerPage, currentMechPage, (page) => {
        currentMechPage = page;
        renderMechanicTable();
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

document.addEventListener('DOMContentLoaded', () => {
    initSampleMechanics();
});