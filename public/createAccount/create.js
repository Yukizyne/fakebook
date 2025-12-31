const createForm = document.getElementById("create-account");
if (createForm) {
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const Fname = document.getElementById("Fname").value.trim();
        const Lname = document.getElementById("Lname").value.trim();
        const Email = document.getElementById("Email").value.trim();
        const Password = document.getElementById("Password").value.trim();
        const Conpass = document.getElementById("Conpass").value.trim();

        if (Password !== Conpass) {
            alert("Passwords do not match");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(u => u.Email === Email)) {
            alert("Email already exists!");
            return;
        }

        users.push({ Fname, Lname, Email, Password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account successfully created!");
        window.location.href = "../login/logreg.html";
    });
}
