function validateSignUp(event) {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('regEmail');
    const password = document.getElementById('regPassword');
    let isValid = true;

    resetFields([fullName, email, password]);
    if (fullName && fullName.value.trim() === "") {
        setError(fullName, "Full name is required.");
        isValid = false;
    }
    if (email && !email.value.includes("@")) {
        setError(email, "Enter a valid email with '@'.");
        isValid = false;
    }
    if (password && password.value.length < 8) {
        setError(password, "Password must be at least 8 characters.");
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        alert("Account registered successfully!");
    }
}
function validateLogin(event) {
    const emailInput = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    resetFields([emailInput, password]);

    if (emailInput && emailInput.value.trim() === "") {
        setError(emailInput, "Email is required.");
        isValid = false;
    }
    if (password && password.value.trim() === "") {
        setError(password, "Password is required.");
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        const email = emailInput.value.trim().toLowerCase();
        let patientName = email.split('@')[0].replace('.', ' ');
        patientName = patientName.charAt(0).toUpperCase() + patientName.slice(1);
        let patientMRN = Math.floor(1000 + Math.random() * 9000);

        localStorage.setItem("patientName", patientName);
        localStorage.setItem("patientMRN", patientMRN);
        alert("Welcome back, " + patientName + "!");
    }
}
function validateContact(event) {
    const name = document.getElementById('formPatientName');
    const mrn = document.getElementById('formMrnNumber');
    const comments = document.getElementById('comments');
    let isValid = true;

    resetFields([name, mrn, comments]);

    if (name && name.value.trim() === "") {
        setError(name, "Full name is required.");
        isValid = false;
    }
    if (mrn && mrn.value.trim() === "") {
        setError(mrn, "MRN is required.");
        isValid = false;
    }
    if (comments && comments.value.trim().length < 10) {
        setError(comments, "Please enter at least 10 characters.");
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        alert("Inquiry submitted successfully!");
    }
}
function setError(element, message) {
    if (!element) return;
    element.style.borderColor = "#dc3545";
    element.style.backgroundColor = "#f8d7da";

    let errorMsg = element.parentElement.querySelector('.error-text');
    if (!errorMsg) {
        errorMsg = document.createElement('p');
        errorMsg.className = 'error-text';
        errorMsg.style.color = "#dc3545";
        errorMsg.style.fontSize = "0.85rem";
        errorMsg.style.marginTop = "5px";
        element.parentElement.appendChild(errorMsg);
    }
    errorMsg.innerText = message;
}

function resetFields(fields) {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i]) {
            fields[i].style.borderColor = "#dee2e6";
            fields[i].style.backgroundColor = "#ffffff";
            let errorMsg = fields[i].parentElement.querySelector('.error-text');
            if (errorMsg) errorMsg.remove();
        }
    }
}

window.addEventListener('load', function () {
    const storedName = localStorage.getItem("patientName");
    const storedMRN = localStorage.getItem("patientMRN");

    if (storedName && document.getElementById("patient-name")) {
        document.getElementById("patient-name").innerText = storedName;
    }
    if (storedMRN && document.getElementById("patient-mrn")) {
        document.getElementById("patient-mrn").innerText = storedMRN;
    }

    const signUpForm = document.querySelector('form[action*="login.html"]');
    if (signUpForm) signUpForm.addEventListener('submit', validateSignUp);

    const loginForm = document.querySelector('form[action*="index.html"]');
    if (loginForm) loginForm.addEventListener('submit', validateLogin);

    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm) contactForm.addEventListener('submit', validateContact);
});
