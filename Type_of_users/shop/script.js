document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profile');
    const sidebar = document.getElementById('sidebar');
    if (profileIcon && sidebar) {
        profileIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }

    document.addEventListener("click", (e) => {
        if (sidebar && !sidebar.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
});


function openStaffModal() {
    document.getElementById('staffModal').style.display = "block";
}

function closeStaffModal() {
    document.getElementById('staffModal').style.display = "none";
}

function openFinanceModal(date, desc, cat, mat, fee, total, mech) {
    document.getElementById('mDate').innerText = date;
    document.getElementById('mDesc').innerText = desc;
    document.getElementById('mMat').innerText = mat;
    document.getElementById('mFee').innerText = fee;
    document.getElementById('mTotal').innerText = total;
    document.getElementById('mMech').innerText = mech;
    document.getElementById('financeModal').style.display = "block";
}

function closeFinanceModal() {
    document.getElementById('financeModal').style.display = "none";
}

window.onclick = function(event) {
    const sModal = document.getElementById('staffModal');
    const fModal = document.getElementById('financeModal');
    if (event.target == sModal) sModal.style.display = "none";
    if (event.target == fModal) fModal.style.display = "none";
}

