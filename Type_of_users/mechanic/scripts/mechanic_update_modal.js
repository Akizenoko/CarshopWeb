// Get DOM elements for update modal
const updateModal = document.getElementById('updateModal');
const closeUpdateBtn = document.getElementById('closeUpdateModalBtn');
const cancelUpdateBtn = document.getElementById('cancelUpdateBtn');
const confirmUpdateBtn = document.getElementById('confirmUpdateBtn');
const updateModalCustomer = document.getElementById('updateModalCustomer');
const updateModalJob = document.getElementById('updateModalJob');
const statusSelect = document.getElementById('statusSelect');
const updateNotes = document.getElementById('updateNotes');
const updateModalImg = document.getElementById('updateModalImg');

let currentRepairCard = null; // store the repair card being updated

// Open update modal with repair data
function openUpdateModal(repairCard, customerName, jobDescription) {
    currentRepairCard = repairCard;
    updateModalCustomer.innerText = customerName;
    updateModalJob.innerText = `Job: ${jobDescription}`;
    // Optionally change image per customer (keep default for now)
    // updateModalImg.src = ... 
    statusSelect.value = "In Progress"; // default
    updateNotes.value = "";
    updateModal.style.display = 'flex';
}

// Close update modal
function closeUpdateModal() {
    updateModal.style.display = 'none';
    currentRepairCard = null;
}

// Update the repair status on the card
function updateRepairStatus() {
    if (!currentRepairCard) return;

    const newStatus = statusSelect.value;
    const notes = updateNotes.value.trim();

    // Find the status paragraph in the repair card
    const statusParagraph = currentRepairCard.querySelector('.RepairInfo p:nth-child(3)');
    if (statusParagraph) {
        statusParagraph.innerHTML = `<strong>Status:</strong> ${newStatus}`;
    }

    // Optionally change the overall card style based on status
    if (newStatus === 'Completed') {
        // You could mark the card as completed (e.g., disable update button)
        const updateBtn = currentRepairCard.querySelector('.UpdateBtn');
        if (updateBtn) {
            updateBtn.disabled = true;
            updateBtn.innerText = 'Completed';
            updateBtn.style.opacity = '0.6';
        }
    }

    // Show a temporary notification (optional)
    const notification = document.createElement('div');
    notification.innerText = `Status updated to "${newStatus}"${notes ? ` with note: ${notes}` : ''}`;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.background = '#10b981';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '30px';
    notification.style.zIndex = '2000';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);

    closeUpdateModal();
}

// Attach event listeners to all Update Status buttons
document.querySelectorAll('.UpdateBtn').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        const repairCard = btn.closest('.RepairCard');
        const customerNameElem = repairCard.querySelector('.RepairInfo h2');
        const jobElem = repairCard.querySelector('.RepairInfo p:first-child');
        const customerName = customerNameElem ? customerNameElem.innerText : 'Customer';
        const jobDescription = jobElem ? jobElem.innerText.replace('Job:', '').trim() : 'Repair job';
        openUpdateModal(repairCard, customerName, jobDescription);
    });
});

// Close modal events
if (closeUpdateBtn) closeUpdateBtn.addEventListener('click', closeUpdateModal);
if (cancelUpdateBtn) cancelUpdateBtn.addEventListener('click', closeUpdateModal);
confirmUpdateBtn.addEventListener('click', updateRepairStatus);

// Close when clicking outside modal
window.addEventListener('click', (e) => {
    if (e.target === updateModal) closeUpdateModal();
});