const Btn = document.getElementById("profile");
const sidebar = document.getElementById("sidebar");

Btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (sidebar && Btn && !sidebar.contains(event.target) && !Btn.contains(event.target)) {
    sidebar.classList.remove("active");
  }
});