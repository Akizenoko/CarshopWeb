  // Sidebar toggle
    function toggleSidebar() {
        document.getElementById("sidebar").classList.toggle("active");
    }

    // Shop status toggle
    const statusBtn = document.getElementById('shopStatusBtn');
    statusBtn.addEventListener('click', () => {
        statusBtn.classList.toggle('open-style');
        statusBtn.classList.toggle('close-style');
        statusBtn.innerText = statusBtn.classList.contains('open-style') ? 'OPEN' : 'CLOSED';
    });

    // Staff Modal
    function openStaffModal() { document.getElementById('staffModal').style.display = 'block'; }
    function closeStaffModal() { document.getElementById('staffModal').style.display = 'none'; }

    // Job data (for modals)
    const jobsData = [
        {
            id: 1,
            customer: "Juan Dela Cruz",
            vehicle: "2019 Toyota Fortuner",
            issueDesc: "Engine won't start — vehicle has been unresponsive since yesterday morning. Key turns but no ignition response. Possible fuel pump or starter motor failure.",
            phone: "+63 912 345 6789",
            email: "juan.dc@email.com",
            location: "Zamboanga City",
            budget: "₱150,000",
            costEstimate: `
                <div class="cost-category"><div class="cost-category-label"><i class="fa-solid fa-wrench"></i> Labor</div>
                <div class="cost-rows"><div class="cost-row"><span class="cost-item-name">Diagnostic Check</span><span class="cost-item-price">₱500</span></div>
                <div class="cost-row"><span class="cost-item-name">Starter Motor Removal & Install</span><span class="cost-item-price">₱1,200</span></div>
                <div class="cost-row"><span class="cost-item-name">Fuel Pump Replacement Labor</span><span class="cost-item-price">₱1,500</span></div></div>
                <div class="cost-subtotal"><span>Labor Subtotal</span><span>₱3,200</span></div></div>
                <div class="cost-category"><div class="cost-category-label"><i class="fa-solid fa-boxes-stacked"></i> Materials</div>
                <div class="cost-rows"><div class="cost-row"><span class="cost-item-name">Starter Motor (OEM)</span><span class="cost-item-price">₱4,800</span></div>
                <div class="cost-row"><span class="cost-item-name">Fuel Pump Assembly</span><span class="cost-item-price">₱3,500</span></div>
                <div class="cost-row"><span class="cost-item-name">Wiring Connectors & Seals</span><span class="cost-item-price">₱350</span></div></div>
                <div class="cost-subtotal"><span>Materials Subtotal</span><span>₱8,650</span></div></div>
                <div class="cost-grand-total"><span>Estimated Total</span><span>₱11,850</span></div>
                <p class="cost-note"><i class="fa-solid fa-circle-info"></i> Estimate may vary.</p>`
        },
        {
            id: 2,
            customer: "Maria Santos",
            vehicle: "2021 Honda CR-V",
            issueDesc: "Knocking sound from front suspension, especially on bumps and uneven roads. Suspected worn-out struts or stabilizer links.",
            phone: "+63 917 654 3210",
            email: "maria.s@email.com",
            location: "Pasonanca",
            budget: "₱80,000",
            costEstimate: `
                <div class="cost-category"><div class="cost-category-label">Labor</div>
                <div class="cost-rows"><div class="cost-row"><span class="cost-item-name">Suspension Inspection</span><span class="cost-item-price">₱400</span></div>
                <div class="cost-row"><span class="cost-item-name">Strut Assembly R&R (per side)</span><span class="cost-item-price">₱1,400</span></div>
                <div class="cost-row"><span class="cost-item-name">Wheel Alignment</span><span class="cost-item-price">₱600</span></div></div>
                <div class="cost-subtotal"><span>Labor Subtotal</span><span>₱2,400</span></div></div>
                <div class="cost-category"><div class="cost-category-label">Materials</div>
                <div class="cost-rows"><div class="cost-row"><span class="cost-item-name">Strut Assembly (x2)</span><span class="cost-item-price">₱5,600</span></div>
                <div class="cost-row"><span class="cost-item-name">Stabilizer End Links</span><span class="cost-item-price">₱1,200</span></div>
                <div class="cost-row"><span class="cost-item-name">Strut Mount Bearings</span><span class="cost-item-price">₱800</span></div></div>
                <div class="cost-subtotal"><span>Materials Subtotal</span><span>₱7,600</span></div></div>
                <div class="cost-grand-total"><span>Estimated Total</span><span>₱10,000</span></div>
                <p class="cost-note"><i class="fa-solid fa-circle-info"></i> Estimate may vary.</p>`
        },
        {
            id: 3,
            customer: "Pedro Lopez",
            vehicle: "2022 Mitsubishi Montero",
            issueDesc: "Check engine light on and stalling intermittently. OBD scan shows P0300 (random misfire). Suspected ignition coils or spark plugs.",
            phone: "+63 929 111 2233",
            email: "pedro.l@email.com",
            location: "Tetuan",
            budget: "₱200,000",
            costEstimate: `
                <div class="cost-category"><div class="cost-category-label">Labor</div>
                <div class="cost-rows"><div class="cost-row"><span class="cost-item-name">OBD Diagnostic Scan</span><span class="cost-item-price">₱350</span></div>
                <div class="cost-row"><span class="cost-item-name">Ignition Coils Replacement (4)</span><span class="cost-item-price">₱1,600</span></div>
                <div class="cost-row"><span class="cost-item-name">Spark Plug Replacement</span><span class="cost-item-price">₱800</span></div></div>
                <div class="cost-subtotal"><span>Labor Subtotal</span><span>₱2,750</span></div></div>
                <div class="cost-category"><div class="cost-category-label">Materials</div>
                <div class="cost-rows"><div class="cost-row"><span class="cost-item-name">Ignition Coils (OEM x4)</span><span class="cost-item-price">₱6,400</span></div>
                <div class="cost-row"><span class="cost-item-name">Iridium Spark Plugs (x4)</span><span class="cost-item-price">₱1,800</span></div>
                <div class="cost-row"><span class="cost-item-name">Throttle Body Cleaner</span><span class="cost-item-price">₱220</span></div></div>
                <div class="cost-subtotal"><span>Materials Subtotal</span><span>₱8,420</span></div></div>
                <div class="cost-grand-total"><span>Estimated Total</span><span>₱11,170</span></div>
                <p class="cost-note"><i class="fa-solid fa-circle-info"></i> Estimate may vary.</p>`
        }
    ];

    // Modal elements
    const jobModal = document.getElementById('jobModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const updateModal = document.getElementById('updateModal');
    const closeUpdateBtn = document.getElementById('closeUpdateModalBtn');
    const cancelUpdateBtn = document.getElementById('cancelUpdateBtn');
    const confirmUpdateBtn = document.getElementById('confirmUpdateBtn');
    let currentRepairCard = null;

    // Open job detail modal
    function openJobModal(jobId) {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;
        document.getElementById('modalCustomerName').innerText = job.customer;
        document.getElementById('modalVehicle').innerText = job.vehicle;
        document.getElementById('modalIssueFull').innerText = job.issueDesc;
        document.getElementById('modalPhone').innerText = job.phone;
        document.getElementById('modalEmail').innerText = job.email;
        document.getElementById('modalLocation').innerText = job.location;
        document.getElementById('modalBudget').innerText = job.budget;
        document.getElementById('modalCostEstimate').innerHTML = job.costEstimate;
        jobModal.style.display = 'flex';
    }

    // Open update status modal
    function openUpdateModal(repairCard, customerName, jobDesc) {
        currentRepairCard = repairCard;
        document.getElementById('updateModalCustomer').innerText = customerName;
        document.getElementById('updateModalJob').innerText = `Job: ${jobDesc}`;
        document.getElementById('statusSelect').value = "In Progress";
        document.getElementById('updateNotes').value = "";
        updateModal.style.display = 'flex';
    }

    // Close modals
    function closeJobModal() { jobModal.style.display = 'none'; }
    function closeUpdateModal() { updateModal.style.display = 'none'; currentRepairCard = null; }

    // Update repair status
    function updateRepairStatus() {
        if (!currentRepairCard) return;
        const newStatus = document.getElementById('statusSelect').value;
        const notes = document.getElementById('updateNotes').value.trim();
        const statusParagraph = currentRepairCard.querySelector('.RepairInfo p:nth-child(3)');
        if (statusParagraph) statusParagraph.innerHTML = `<strong>Status:</strong> ${newStatus}`;
        if (newStatus === 'Completed') {
            const updateBtn = currentRepairCard.querySelector('.UpdateBtn');
            if (updateBtn) { updateBtn.disabled = true; updateBtn.innerText = 'Completed'; updateBtn.style.opacity = '0.6'; }
        }
        alert(`Status updated to "${newStatus}"${notes ? ` with note: ${notes}` : ''}`);
        closeUpdateModal();
    }

    // Attach event listeners to job cards
    document.querySelectorAll('.JobCard').forEach(card => {
        const jobId = card.getAttribute('data-job-id');
        const infoBtn = card.querySelector('.infoBtn');
        if (infoBtn) infoBtn.addEventListener('click', () => openJobModal(parseInt(jobId)));
    });

    // Attach event listeners to repair cards
    document.querySelectorAll('.RepairCard').forEach(card => {
        const updateBtn = card.querySelector('.UpdateBtn');
        const customerName = card.querySelector('.RepairInfo h2')?.innerText || 'Customer';
        const jobDesc = card.querySelector('.RepairInfo p:first-child')?.innerText.replace('Job:', '').trim() || 'Repair job';
        updateBtn.addEventListener('click', () => openUpdateModal(card, customerName, jobDesc));
    });

    // Modal close events
    closeModalBtn.addEventListener('click', closeJobModal);
    closeUpdateBtn.addEventListener('click', closeUpdateModal);
    cancelUpdateBtn.addEventListener('click', closeUpdateModal);
    confirmUpdateBtn.addEventListener('click', updateRepairStatus);
    window.addEventListener('click', (e) => {
        if (e.target === jobModal) closeJobModal();
        if (e.target === updateModal) closeUpdateModal();
        if (e.target.classList.contains('modal')) closeStaffModal();
    });

    // Initial staff modal close handler
    window.closeStaffModal = closeStaffModal;
    window.openStaffModal = openStaffModal;

