var usernameInput = document.getElementById("username");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("psw");
var confirmPasswordInput = document.getElementById("confirm-psw");

var usernameValidIndicator = document.getElementById("username-valid");
var emailValidIndicator = document.getElementById("email-valid");
var passwordValidIndicator = document.getElementById("psw-valid");
var confirmPasswordValidIndicator = document.getElementById("confirm-psw-valid");

var usernameMessage = document.getElementById("username-message");
var emailMessage = document.getElementById("email-message");
var passwordMessage = document.getElementById("psw-message");
var confirmPasswordMessage = document.getElementById("confirm-psw-message");

// Function to update the indicator and message
function updateValidity(input, indicator, message, isValid) {
    if (isValid) {
        indicator.classList.remove('invalid');
        indicator.classList.add('valid');
        message.style.color = "#2D9F2B";
    } else {
        indicator.classList.remove('valid');
        indicator.classList.add('invalid');
        message.style.color = "#ff4d4d";
    }
}

// Username validation
usernameInput.addEventListener("input", function() {
    updateValidity(usernameInput, usernameValidIndicator, usernameMessage, usernameInput.value.length >= 3);
});

// Email validation
emailInput.addEventListener("input", function() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    updateValidity(emailInput, emailValidIndicator, emailMessage, emailRegex.test(emailInput.value));
});

// Password validation
passwordInput.addEventListener("input", function() {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;
    updateValidity(passwordInput, passwordValidIndicator, passwordMessage, passwordRegex.test(passwordInput.value));
});

// Confirm password validation
confirmPasswordInput.addEventListener("input", function() {
    updateValidity(confirmPasswordInput, confirmPasswordValidIndicator, confirmPasswordMessage, confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value.length >= 6);
});
