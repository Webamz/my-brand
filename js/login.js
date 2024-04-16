document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

<<<<<<< HEAD
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "https://my-brand-backend-tfnq.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
=======
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
>>>>>>> 56acad2b3c56282db90a86da6ed403c01a1a2679
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data: ", data);

        alert("Login successful!");

        document.cookie = `token=${data.token}; path=/; SameSite=None; Secure;`;

        if (data.role === "admin") {
          window.location.href = "../pages/admin.html";
        } else {
          window.location.href = "../index.html";
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  });
});
