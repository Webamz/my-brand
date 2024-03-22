document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get user input values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username);

        // If user is found and password matches
        if (user && CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex) === user.password) {
            alert('Login successful!');
            if (username === 'admin') {
                window.location.href = '../pages/admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('Invalid username or password');
        }
    });
});
