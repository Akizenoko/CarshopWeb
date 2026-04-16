document.addEventListener('DOMContentLoaded', () => {
    const statusBtn = document.getElementById('shopStatusBtn');

    if (statusBtn) {
        statusBtn.addEventListener('click', () => {
            if (statusBtn.innerText === "OPEN") {
                statusBtn.innerText = "CLOSED";
                statusBtn.classList.remove('open-style');
                statusBtn.classList.add('close-style');
            } else {
                statusBtn.innerText = "OPEN";
                statusBtn.classList.remove('close-style');
                statusBtn.classList.add('open-style');
            }
        });
    }

    const profileIcon = document.getElementById('profile');
    const sidebar = document.getElementById('sidebar');
    
    if (profileIcon && sidebar) {
        profileIcon.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
});