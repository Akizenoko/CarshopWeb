document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // ADMIN ACCOUNT
    if(email === "admin@gmail.com" && password === "admin123"){
        window.location.href = "./Admin.html";
    }
    else if(email === "mechanic@gmail.com" && password === "mechanic123"){
        window.location.href = "MechLand.html";
    }
    else{
        // NORMAL USER
        window.location.href = "LandingPage.html";
    }
});