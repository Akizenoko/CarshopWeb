
const Btn = document.getElementById("profile");
const sidebar = document.getElementById("sidebar");

Btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (!sidebar.contains(event.target) && !Btn.contains(event.target)){
    sidebar.classList.remove("active");
  }
});

const statusBtn = document.getElementById("statusBtn");

// Add click event
statusBtn.addEventListener("click", () => {
    // Toggle the "online" class
    statusBtn.classList.toggle("online");

    // Change text depending on status
    if (statusBtn.classList.contains("online")) {
        statusBtn.innerText = "Unavailable";
    } else {
        statusBtn.innerText = "Available";
    }
});