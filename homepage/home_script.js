const home_cont = document.querySelector(".header-home");
const lang_cont = document.querySelector(".header-lang");
const theme_cont = document.querySelector(".theme");
const contact_cont = document.querySelector(".contact");
const contact_drop = document.querySelector(".contact-drop");
const body_cont = document.querySelector("body");

home_cont.addEventListener("click", (event) => {
    event.preventDefault();
    const currentUrl = window.location.href.split('#')[0];
    window.location.href = currentUrl;
})

theme_cont.addEventListener("click", ()=>{
    body_cont.classList.toggle("lightmode");
})

document.getElementById('back-to-top').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    });
});

contact_cont.addEventListener("click" ,()=> {
    contact_drop.classList.toggle("drop-active");
    setTimeout(() => {contact_drop.classList.toggle("drop-active");}, 2500);
})