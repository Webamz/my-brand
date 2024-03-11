document.addEventListener('DOMContentLoaded', function () {
    const mainMenu = document.querySelector('.mainMenu');
    const closeMenu = document.querySelector('.closeMenu');
    const openMenu = document.querySelector('.openMenu');
    const menuItems = mainMenu.querySelectorAll('a');

    openMenu.addEventListener('click', showBurger);
    closeMenu.addEventListener('click', closeBurger);

    menuItems.forEach(item => {
        item.addEventListener('click', scrollToSection);
    });

    function showBurger() {
        mainMenu.style.display = 'flex';
        mainMenu.style.top = '0';
    }

    function closeBurger() {
        mainMenu.style.top = '-100%';
    }

    function scrollToSection(event) {
        // event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            closeBurger();
        }
    }
});



//download CV function
function downloadCV() {
    var cvFileName = 'chris_cv.pdf';
    var cvFilePath = './img/chris_cv.pdf';
    var link = document.createElement('a');
    link.href = cvFilePath;
    link.download = cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


document.addEventListener('DOMContentLoaded', function () {
    const projects = document.querySelectorAll('.projects-card');
    let currentIndex = 0;

    function showProjects() {
        for (let i = 0; i < projects.length; i++) {
            if (i === currentIndex || i === currentIndex + 1) {
                projects[i].style.display = 'block';
            } else {
                projects[i].style.display = 'none';
            }
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex -= 2;
        }
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        showProjects();
    }

    function nextSlide() {
        if (currentIndex < projects.length - 2) {
            currentIndex += 2;
        }
        if (currentIndex > projects.length - 2) {
            currentIndex = projects.length - 2;
        }
        showProjects();
    }

    showProjects();

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
});
