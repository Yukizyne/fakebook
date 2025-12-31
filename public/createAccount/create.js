document.getElementById('create-account').addEventListener('submit', function(e){
    e.preventDefault();

    const Fname = document.getElementById('Fname').value;
    const Lname = document.getElementById('Lname').value;
    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;
    const Conpass = document.getElementById('Conpass').value;

    if(Password !== Conpass){
        alert("Passwords do not match");
        return;
    }

    const user = {Fname, Lname, Email, Password};

 
    const users = JSON.parse(localStorage.getItem("users")) || [];

 
    const emailExist = users.some(u => u.Email === Email);
    if(emailExist){
        alert("Email already exists!");
        return;
    }


    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert('Account successfully created!');

 
    window.location.href = "../login/logreg.html";
});
