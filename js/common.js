document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const moonIcon = document.getElementById("moonIcon");
    const sunIcon = document.getElementById("sunIcon");
    const darkText = document.getElementById("darkText");
    const lightText = document.getElementById("lightText");
    const html = document.documentElement;

    themeToggle.addEventListener("click", () => {
        html.classList.toggle("dark");
        moonIcon.classList.toggle("!hidden");
        sunIcon.classList.toggle("!hidden");
        darkText.classList.toggle("hidden");
        lightText.classList.toggle("hidden");
    });

});