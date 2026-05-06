document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotForm');
    const successDiv = document.getElementById('successMessage');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate sending reset link (no actual backend)
        // In a real app, you would send an AJAX request here
        successDiv.style.display = 'flex';
        emailInput.value = '';

        // Optional: hide message after 5 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => {
                successDiv.style.display = 'none';
                successDiv.style.opacity = '1';
            }, 300);
        }, 5000);
    });
});