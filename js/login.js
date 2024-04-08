document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log('Email: ' +email+ 'Password: ' +password)

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            console.log('Full response', response)
            const data = await response.json();
            console.log('Data: ',data)
            if (response.ok) {
                alert('Login successful!');
                if (data.role === 'admin') {
                    window.location.href = '../pages/admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error.message);
            alert(error.message);
        }
    });
});
