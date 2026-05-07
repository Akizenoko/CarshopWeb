
const jobsData = [
    {
        id: 1,
        customer: "Juan Dela Cruz",
        vehicle: "2019 Toyota Fortuner",
        issueDesc: "Engine won't start — vehicle has been unresponsive since yesterday morning. Key turns but no ignition response. Possible fuel pump or starter motor failure.",
        phone: "+63 912 345 6789",
        email: "juan.dc@email.com",
        location: "Zamboanga City",
        budget: "₱150k",
        costEstimate: `
            <div class="cost-category">
                <div class="cost-category-label"><i class="fa-solid fa-wrench"></i> Labor</div>
                <div class="cost-rows">
                    <div class="cost-row"><span class="cost-item-name">Diagnostic Check</span><span class="cost-item-price">₱500</span></div>
                    <div class="cost-row"><span class="cost-item-name">Starter Motor Removal & Install</span><span class="cost-item-price">₱1,200</span></div>
                    <div class="cost-row"><span class="cost-item-name">Fuel Pump Replacement Labor</span><span class="cost-item-price">₱1,500</span></div>
                </div>
                <div class="cost-subtotal"><span>Labor Subtotal</span><span>₱3,200</span></div>
            </div>
            <div class="cost-category">
                <div class="cost-category-label"><i class="fa-solid fa-boxes-stacked"></i> Materials</div>
                <div class="cost-rows">
                    <div class="cost-row"><span class="cost-item-name">Starter Motor (OEM)</span><span class="cost-item-price">₱4,800</span></div>
                    <div class="cost-row"><span class="cost-item-name">Fuel Pump Assembly</span><span class="cost-item-price">₱3,500</span></div>
                    <div class="cost-row"><span class="cost-item-name">Wiring Connectors & Seals</span><span class="cost-item-price">₱350</span></div>
                </div>
                <div class="cost-subtotal"><span>Materials Subtotal</span><span>₱8,650</span></div>
            </div>
            <div class="cost-grand-total"><span>Estimated Total</span><span>₱11,850</span></div>
            <p class="cost-note"><i class="fa-solid fa-circle-info"></i> Estimate may vary based on diagnosis results and parts availability.</p>
        `
    },
    {
        id: 2,
        customer: "Maria Santos",
        vehicle: "2021 Honda CR-V",
        issueDesc: "Knocking sound from front suspension, especially on bumps and uneven roads. Suspected worn-out struts or stabilizer links.",
        phone: "+63 917 654 3210",
        email: "maria.s@email.com",
        location: "Zamboanga City",
        budget: "₱80k",
        costEstimate: `
            <div class="cost-category"><div class="cost-category-label">Labor</div><div class="cost-rows"><div class="cost-row"><span class="cost-item-name">Suspension Inspection</span><span class="cost-item-price">₱400</span></div><div class="cost-row"><span class="cost-item-name">Strut Assembly R&R (per side)</span><span class="cost-item-price">₱1,400</span></div><div class="cost-row"><span class="cost-item-name">Wheel Alignment</span><span class="cost-item-price">₱600</span></div></div><div class="cost-subtotal"><span>Labor Subtotal</span><span>₱2,400</span></div></div>
            <div class="cost-category"><div class="cost-category-label">Materials</div><div class="cost-rows"><div class="cost-row"><span class="cost-item-name">Strut Assembly (x2)</span><span class="cost-item-price">₱5,600</span></div><div class="cost-row"><span class="cost-item-name">Stabilizer End Links</span><span class="cost-item-price">₱1,200</span></div><div class="cost-row"><span class="cost-item-name">Strut Mount Bearings</span><span class="cost-item-price">₱800</span></div></div><div class="cost-subtotal"><span>Materials Subtotal</span><span>₱7,600</span></div></div>
            <div class="cost-grand-total"><span>Estimated Total</span><span>₱10,000</span></div>
            <p class="cost-note"><i class="fa-solid fa-circle-info"></i> Estimate may vary.</p>
        `
    },
    {
        id: 3,
        customer: "Pedro Lopez",
        vehicle: "2022 Mitsubishi Montero",
        issueDesc: "Check engine light on and stalling intermittently. OBD scan shows P0300 (random misfire). Suspected ignition coils or spark plugs.",
        phone: "+63 929 111 2233",
        email: "pedro.l@email.com",
        location: "Zamboanga City",
        budget: "₱200k",
        costEstimate: `
            <div class="cost-category"><div class="cost-category-label">Labor</div><div class="cost-rows"><div class="cost-row"><span class="cost-item-name">OBD Diagnostic Scan</span><span class="cost-item-price">₱350</span></div><div class="cost-row"><span class="cost-item-name">Ignition Coils Replacement (4)</span><span class="cost-item-price">₱1,600</span></div><div class="cost-row"><span class="cost-item-name">Spark Plug Replacement</span><span class="cost-item-price">₱800</span></div></div><div class="cost-subtotal"><span>Labor Subtotal</span><span>₱2,750</span></div></div>
            <div class="cost-category"><div class="cost-category-label">Materials</div><div class="cost-rows"><div class="cost-row"><span class="cost-item-name">Ignition Coils (OEM x4)</span><span class="cost-item-price">₱6,400</span></div><div class="cost-row"><span class="cost-item-name">Iridium Spark Plugs (x4)</span><span class="cost-item-price">₱1,800</span></div><div class="cost-row"><span class="cost-item-name">Throttle Body Cleaner</span><span class="cost-item-price">₱220</span></div></div><div class="cost-subtotal"><span>Materials Subtotal</span><span>₱8,420</span></div></div>
            <div class="cost-grand-total"><span>Estimated Total</span><span>₱11,170</span></div>
            <p class="cost-note"><i class="fa-solid fa-circle-info"></i> Estimate may vary.</p>
        `
    }
];

// Get modal elements
const jobModal = document.getElementById('jobModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalCustomerName = document.getElementById('modalCustomerName');
const modalVehicle = document.getElementById('modalVehicle');
const modalIssueFull = document.getElementById('modalIssueFull');
const modalPhone = document.getElementById('modalPhone');
const modalEmail = document.getElementById('modalEmail');
const modalLocation = document.getElementById('modalLocation');
const modalBudget = document.getElementById('modalBudget');
const modalCostEstimate = document.getElementById('modalCostEstimate');

// Function to open the job details modal (renamed to avoid conflict with global openModal)
function openJobModal(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    modalCustomerName.innerText = job.customer;
    modalVehicle.innerText = job.vehicle;
    modalIssueFull.innerText = job.issueDesc;
    if (modalPhone) modalPhone.innerText = job.phone;
    modalEmail.innerText = job.email;
    modalLocation.innerText = job.location;
    modalBudget.innerText = job.budget;
    modalCostEstimate.innerHTML = job.costEstimate;

    jobModal.style.display = 'flex';
}

function closeJobModal() {
    jobModal.style.display = 'none';
}

// Attach event listeners to all "More Info" buttons
function attachInfoButtonListeners() {
    const infoBtns = document.querySelectorAll('.infoBtn');
    infoBtns.forEach((btn, index) => {
        // Remove existing listeners to prevent duplicates after dynamic updates
        btn.removeEventListener('click', btn._listener);
        const listener = () => {
            const jobId = (btn.getAttribute('data-job-id')) ? parseInt(btn.getAttribute('data-job-id')) : index + 1;
            openJobModal(jobId);
        };
        btn.addEventListener('click', listener);
        btn._listener = listener;
    });
}

// Close modal on X button
if (closeModalBtn) closeModalBtn.addEventListener('click', closeJobModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === jobModal) closeJobModal();
});

// Initialize listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    attachInfoButtonListeners();
});
