// Sample job data (matching the "More Info" buttons in your JobRequests)
const jobsData = [
    {
        id: 1,
        customer: "Juan Dela Cruz",
        vehicle: "2019 Toyota Fortuner",
        issueDesc: "Engine won't start — vehicle has been unresponsive since yesterday morning. Key turns but no ignition response. Possible fuel pump or starter motor failure.",
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
const modal = document.getElementById('jobModal');
const closeBtn = document.getElementById('closeModalBtn');
const modalCustomerName = document.getElementById('modalCustomerName');
const modalVehicle = document.getElementById('modalVehicle');
const modalIssueFull = document.getElementById('modalIssueFull');
const modalEmail = document.getElementById('modalEmail');
const modalLocation = document.getElementById('modalLocation');
const modalBudget = document.getElementById('modalBudget');
const modalCostEstimate = document.getElementById('modalCostEstimate');
const modalCustomerImg = document.getElementById('modalCustomerImg');

// Function to open modal with specific job data
function openModal(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    modalCustomerName.innerText = job.customer;
    modalVehicle.innerText = job.vehicle;
    modalIssueFull.innerText = job.issueDesc;
    modalEmail.innerText = job.email;
    modalLocation.innerText = job.location;
    modalBudget.innerText = job.budget;
    modalCostEstimate.innerHTML = job.costEstimate;
    // You can also change the profile image per job if needed
    // modalCustomerImg.src = job.img || "../../Assets/Profiles/mcado.jpg";

    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Event listeners for all "More Info" buttons
document.querySelectorAll('.infoBtn').forEach((btn, index) => {
    // Assign job ID based on order (1,2,3) – adjust if you have different jobs
    btn.addEventListener('click', () => {
        const jobId = index + 1;   // first button = job 1, second = job 2, etc.
        openModal(jobId);
    });
});

// Close on X button
if (closeBtn) closeBtn.addEventListener('click', closeModal);
// Close when clicking outside modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});