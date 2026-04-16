// SIDEBAR TOGGLE
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");

menuBtn.onclick = () => {
    sidebar.classList.toggle("hidden");
    main.classList.toggle("full");
};

// JOBS CHART (SMALL)
new Chart(document.getElementById('jobsChart'), {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Jobs',
            data: [12, 19, 8, 15, 22]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


// USERS CHART (SMALL)
new Chart(document.getElementById('usersChart'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Users',
            data: [5, 10, 7, 14, 20],
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});