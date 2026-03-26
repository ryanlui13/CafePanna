//nav button: when clicked, open the nav bar (for mobile ONLY)
const navbutton = document.getElementById('hamburger');
const links = document.getElementById('.navbar-links');

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle('open');
    links.classList.toggle('open');
});

