document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');

  // Get input elements
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('psw');
  const confirmPasswordInput = document.getElementById('confirm-psw');

  // Get validation indicators and messages
  const usernameValidIndicator = document.getElementById('username-valid');
  const emailValidIndicator = document.getElementById('email-valid');
  const passwordValidIndicator = document.getElementById('psw-valid');
  const confirmPasswordValidIndicator = document.getElementById('confirm-psw-valid');

  const usernameMessage = document.getElementById('username-message');
  const emailMessage = document.getElementById('email-message');
  const passwordMessage = document.getElementById('psw-message');
  const confirmPasswordMessage = document.getElementById('confirm-psw-message');

  // Attach input event listeners for validation
  usernameInput.addEventListener('input', validateUsername);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);

  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (
      validateUsername() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword()
    ) {

      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      // Create user object
      const newUser = {
        username: username,
        email: email,
        password: hashedPassword
      };

      let users = JSON.parse(localStorage.getItem('users')) || [];

      users.push(newUser);

      localStorage.setItem('users', JSON.stringify(users));

      window.location.href = 'login.html';
    } else {
      alert('Please fill in the form correctly.');
    }
  });

  // Function to validate username
  function validateUsername() {
    const username = usernameInput.value;
    const isValid = username.length >= 3;
    updateValidity(usernameInput, usernameValidIndicator, usernameMessage, isValid);
    return isValid;
  }

  // Function to validate email
  function validateEmail() {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    updateValidity(emailInput, emailValidIndicator, emailMessage, isValid);
    return isValid;
  }

  // Function to validate password
  function validatePassword() {
    const password = passwordInput.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;
    const isValid = passwordRegex.test(password);
    updateValidity(passwordInput, passwordValidIndicator, passwordMessage, isValid);
    return isValid;
  }

  // Function to validate confirm password
  function validateConfirmPassword() {
    const confirmPassword = confirmPasswordInput.value;
    const password = passwordInput.value;
    const isValid = confirmPassword === password && confirmPassword.length >= 6;
    updateValidity(confirmPasswordInput, confirmPasswordValidIndicator, confirmPasswordMessage, isValid);
    return isValid;
  }

  // Function to update the indicator and message
  function updateValidity(input, indicator, message, isValid) {
    if (isValid) {
      indicator.classList.remove('invalid');
      indicator.classList.add('valid');
      message.style.color = '#2D9F2B';
    } else {
      indicator.classList.remove('valid');
      indicator.classList.add('invalid');
      message.style.color = '#ff4d4d';
    }
  }
});
