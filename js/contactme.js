document.addEventListener('DOMContentLoaded', function () {
    let queryIdCounter = localStorage.getItem('queryIdCounter') || 0;

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        queryIdCounter++;

        const formData = {
            id: queryIdCounter,
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            mobilenumber: document.getElementById('mobilenumber').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toLocaleString()
        };

        const queries = JSON.parse(localStorage.getItem('queries')) || [];

        queries.push(formData);

        localStorage.setItem('queries', JSON.stringify(queries));

        localStorage.setItem('queryIdCounter', queryIdCounter);

        contactForm.reset();

        alert('Message sent successfully!');
    });
});
