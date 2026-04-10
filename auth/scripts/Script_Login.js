document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // ADMIN ACCOUNT
    if(email === "admin@gmail.com" && password === "admin123"){
        window.location.href = "../Type_of_users/admin/Admin.html";
    }
    else if(email === "mechanic@gmail.com" && password === "mechanic123"){
        window.location.href = "../Type_of_users/mechanic/Mechanic_Homepage.html";
    }
    else{
        // NORMAL USER
        window.location.href = "../Type_of_users/user/Home_Page_For_Users.html";
    }
});