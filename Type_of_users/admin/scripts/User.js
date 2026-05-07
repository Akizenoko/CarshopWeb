let allUsers = [];
let currentUserPage = 1;
const usersPerPage = 5;

// Sample data (with terminated flag)
function initSampleUsers() {
    allUsers = [
        { name: 'Juan Dela Cruz', email: 'juan@email.com', status: 'active', violations: 2, violationDetails: ['Spam review - Jan 2026', 'Fake report - Feb 2026'], terminated: false },
        { name: 'Maria Santos', email: 'maria@email.com', status: 'active', violations: 0, violationDetails: [], terminated: false },
        { name: 'Carlo Reyes', email: 'carlo@email.com', status: 'suspended', violations: 5, violationDetails: ['Multiple spam reports', 'Impersonation'], terminated: false },
        { name: 'Ana Lopez', email: 'ana@email.com', status: 'active', violations: 1, violationDetails: ['Abusive language'], terminated: false }
    ];
    renderUserTable();
}

function addUserRow() {
    const name = document.getElementById('newUserName')?.value;
    const email = document.getElementById('newUserEmail')?.value;
    if (!name || !email) { alert('Please fill all fields'); return; }
    allUsers.push({
        name, email,
        status: 'active',
        violations: 0,
        violationDetails: [],
        terminated: false
    });
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

// Toggle termination – no deletion, just flip the flag
function toggleUserTermination(userName) {
    const user = allUsers.find(u => u.name === userName);
    if (!user) return;
    const action = user.terminated ? 'restore' : 'terminate';
    const confirmMsg = `Are you sure you want to ${action} user "${userName}"?`;
    if (confirm(confirmMsg)) {
        user.terminated = !user.terminated;
        renderUserTable();
        alert(`User "${userName}" has been ${user.terminated ? 'terminated' : 'restored'}.`);
    }
}

function renderUserTable() {
    const tbody = document.querySelector('#userTable tbody');
    if (!tbody) return;
    const start = (currentUserPage - 1) * usersPerPage;
    const paginatedUsers = allUsers.slice(start, start + usersPerPage);
    tbody.innerHTML = paginatedUsers.map(user => {
        const statusBadge = user.terminated 
            ? '<span class="badge-terminated">Terminated</span>' 
            : '<span class="badge-active">Active</span>';
        const actionButton = user.terminated
            ? `<button class="btn-restore" onclick="toggleUserTermination('${user.name}')">Restore</button>`
            : `<button class="btn-danger" onclick="toggleUserTermination('${user.name}')">Terminate</button>`;
        return `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${statusBadge}</td>
                <td><span class="violation-badge">${user.violations}</span> <button class="btn-primary" style="padding:2px 8px;" onclick="viewUserViolations('${user.name}')">View</button></td>
                <td>${actionButton}</td>
            </tr>
        `;
    }).join('');
    renderPagination('userPagination', allUsers.length, usersPerPage, currentUserPage, (page) => {
        currentUserPage = page;
        renderUserTable();
    });
}

function filterUsers() {
    const searchTerm = document.getElementById('userSearch')?.value.toLowerCase();
    const rows = document.querySelectorAll('#userTable tbody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Load sample data when page loads
document.addEventListener('DOMContentLoaded', () => {
    initSampleUsers();
});