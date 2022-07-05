function openMenu() {
    if (window.screen.width <= 768) {
        let button = document.querySelector(".menu-btn");
    button.classList.toggle("active");
    let menu = document.querySelector("body");
    menu.classList.toggle("menu-expanded");
    } else {
        return
    }
}