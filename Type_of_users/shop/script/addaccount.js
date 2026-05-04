const MECHANICS = [
  { id: 'M-001', name: 'Carlos Reyes',     role: 'Senior Mechanic',      contact: '+63 912 345 6789' },
  { id: 'M-002', name: 'Jake Mendoza',     role: 'Electrician',           contact: '+63 917 234 5678' },
  { id: 'M-003', name: 'Ramon Santos',     role: 'Brake Specialist',      contact: '+63 920 876 5432' },
  { id: 'M-004', name: 'Leo Cruz',         role: 'General Mechanic',      contact: '+63 915 678 9012' },
  { id: 'M-005', name: 'Arvin Dela Cruz',  role: 'Body Technician',       contact: '+63 918 345 6701' },
  { id: 'M-006', name: 'Mark Villanueva',  role: 'AC Technician',         contact: '+63 916 901 2345' },
  { id: 'M-007', name: 'Dante Flores',     role: 'Transmission Expert',   contact: '+63 919 012 3456' },
  { id: 'M-008', name: 'Rico Aguilar',     role: 'General Mechanic',      contact: '+63 913 456 7890' },
];

const ROLES = [
  'All',
  'Senior Mechanic',
  'Electrician',
  'Brake Specialist',
  'General Mechanic',
  'Body Technician',
  'AC Technician',
  'Transmission Expert',
];

let team = [];
let activeTab = 'search';
let activeFilter = 'All';

// Helper to generate unique ID for off‑platform mechanics
function generateOffPlatformId() {
  const maxId = team.filter(m => m.id && m.id.startsWith('OFF-'))
    .reduce((max, m) => {
      const num = parseInt(m.id.split('-')[1]) || 0;
      return num > max ? num : max;
    }, 0);
  const nextNum = maxId + 1;
  return `OFF-${nextNum.toString().padStart(3, '0')}`;
}

function addOffPlatformMechanic(name, role, contact) {
  if (!name.trim()) { alert('Please enter a name'); return false; }
  if (!contact.trim()) { alert('Please enter a contact number'); return false; }
  const newId = generateOffPlatformId();
  const newMech = {
    id: newId,
    name: name.trim(),
    role: role.trim() || 'General Mechanic',
    contact: contact.trim(),
    isOffPlatform: true
  };
  team.push(newMech);
  renderTeam();
  // Optionally add to MECHANICS array so it appears in search (if desired)
  // MECHANICS.push(newMech);
  // Instead, we just add to team directly.
  alert(`Mechanic "${name}" added to your team with ID ${newId}`);
  return true;
}

function switchTab(tab, el) {
  activeTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('searchPanel').style.display = tab === 'search' ? 'block' : 'none';
  document.getElementById('browsePanel').style.display = tab === 'browse' ? 'block' : 'none';
  if (tab === 'browse') renderFilters();
  renderResults(tab === 'search' ? [] : MECHANICS);
}

function renderFilters() {
  const row = document.getElementById('filterRow');
  row.innerHTML = ROLES.map(r => `<button class="filter-chip${activeFilter === r ? ' active' : ''}" onclick="applyFilter('${r}', this)">${r}</button>`).join('');
}

function applyFilter(role, el) {
  activeFilter = role;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const filtered = role === 'All' ? MECHANICS : MECHANICS.filter(m => m.role === role);
  renderResults(filtered);
}

function doSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!q) { renderResults([]); return; }
  renderResults(MECHANICS.filter(m => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)));
}

function mechanicCardHTML(m) {
  const added = team.some(t => t.id === m.id);
  return `
    <div class="mechanic-card" id="res-${m.id}">
      <img src="../../../Assets/Profiles/mcado.jpg" class="avatar">
      <div class="mech-info">
        <div class="mech-name">
          ${escapeHtml(m.name)}
          <span class="mech-id">${m.id}</span>
        </div>
        <div class="mech-role">${escapeHtml(m.role)}</div>
        <div class="mech-contact">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" width="12" height="12">
            <rect x="2" y="3" width="12" height="10" rx="2"/>
            <path d="M2 6l6 4 6-4"/>
          </svg>
          ${escapeHtml(m.contact)}
        </div>
      </div>
      <button class="btn-add${added ? ' added' : ''}" onclick="addToTeam('${m.id}')" ${added ? 'disabled' : ''}>
        ${added ? 'Added' : '+ Add'}
      </button>
    </div>`;
}

function renderResults(list) {
  const area = document.getElementById('resultsArea');
  if (!list.length) {
    const isEmpty = activeTab === 'search' && !document.getElementById('searchInput').value.trim();
    area.innerHTML = isEmpty ? '' : '<div class="no-results">No mechanic accounts found.</div>';
    return;
  }
  area.innerHTML = list.map(mechanicCardHTML).join('');
}

function addToTeam(id) {
  const m = MECHANICS.find(x => x.id === id);
  if (!m || team.some(t => t.id === id)) return;
  team.push(m);
  const btn = document.querySelector(`#res-${id} .btn-add`);
  if (btn) { btn.textContent = 'Added'; btn.classList.add('added'); btn.disabled = true; }
  renderTeam();
}

function removeFromTeam(id) {
  team = team.filter(t => t.id !== id);
  const btn = document.querySelector(`#res-${id} .btn-add`);
  if (btn) { btn.textContent = '+ Add'; btn.classList.remove('added'); btn.disabled = false; }
  renderTeam();
}

function renderTeam() {
  const list = document.getElementById('teamList');
  const count = document.getElementById('teamCount');
  count.textContent = team.length ? `(${team.length})` : '';
  if (!team.length) {
    list.innerHTML = `<div class="empty-team">No team members yet.<br>Add mechanics from the lists or use the "off‑platform" form.</div>`;
    return;
  }
  list.innerHTML = team.map(m => `
    <div class="team-card">
      <img src="../../../Assets/Profiles/mcado.jpg" class="avatar">
      <div class="mech-info">
        <div class="mech-name">
          ${escapeHtml(m.name)}
          <span class="mech-id">${m.id}</span>
        </div>
        <div class="mech-role">${escapeHtml(m.role)}</div>
        <div class="mech-contact">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" width="12" height="12">
            <rect x="2" y="3" width="12" height="10" rx="2"/>
            <path d="M2 6l6 4 6-4"/>
          </svg>
          ${escapeHtml(m.contact)}
        </div>
      </div>
      <button class="rm-btn" onclick="removeFromTeam('${m.id}')">×</button>
    </div>`).join('');
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

// Event listeners
document.getElementById('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
document.getElementById('addOffPlatformBtn').addEventListener('click', () => {
  const name = document.getElementById('offName').value;
  const role = document.getElementById('offRole').value;
  const contact = document.getElementById('offContact').value;
  if (addOffPlatformMechanic(name, role, contact)) {
    document.getElementById('offName').value = '';
    document.getElementById('offRole').value = '';
    document.getElementById('offContact').value = '';
  }
});

// Initial render
renderTeam();