const loginForm = document.getElementById("login-form");
if (loginForm) {
    const emailInput = document.getElementById("Email");
    const passwordInput = document.getElementById("Password");
    const rememberCheck = document.getElementById("remember-password");

    const saveEmail = localStorage.getItem("saveEmail");
    if (saveEmail) {
        emailInput.value = saveEmail;
        rememberCheck.checked = true;
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter email & password!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const validUser = users.find(user => user.Email === email && user.Password === password);

        if (!validUser) {
            alert("Invalid credentials, try again!");
            return;
        }

        if (rememberCheck.checked) {
            localStorage.setItem("saveEmail", email);
        } else {
            localStorage.removeItem("saveEmail");
        }

        localStorage.setItem("currentUser", validUser.Fname);
        alert(`Login successful! Welcome, ${validUser.Fname}`);
       window.location.href = "../landpage/newsfeed.html";

    });
}
