// header scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const btnMenu = document.querySelector('.nav_menu-btn');
const menuMobile = document.querySelector('.menu_mobile')

btnMenu.addEventListener('click', ()=> {
    btnMenu.classList.toggle('open');
    document.body.classList.toggle('no-scrolled');
    document.documentElement.classList.toggle('no-scrolled');
    menuMobile.classList.toggle('open');
})