let mass = document.getElementsByClassName("user-form__form-el")
let unvalidmass = [];

function onFormClick(params) {
    for (let i = 0; i < mass.length; i++) {
        if (mass[i].value === "") {
            mass[i].classList.add('unvalid');
        } else {
            mass[i].classList.remove('unvalid');
        }
    }
}

window.addEventListener('resize',function(){
    const cookies = document.querySelector(".cookies");
    const header = document.querySelector(".header");
    if (cookies.style.display != "none") {
        if (screen.width > 776) {
            header.classList.add("_header-cookies")
        }else{
            header.classList.remove("_header-cookies")
        }   
    }else{
        if (cookies.style.display != "none") {
            if (screen.width <= 776) {
                header.classList.remove("_header-cookies")
            }else{
                header.classList.add("_header-cookies")
            }  
        }
    }
});


window.onload = function (params) {
    let preloader = document.getElementById("preloader")
    preloader.style.display = 'none';
    const header = document.querySelector(".header");
    if (screen.width > 776) {
        header.classList.add("_header-cookies")
    }else{
        header.classList.remove("_header-cookies")
    }    
}

function cookies_butt_click(params) {
    let cookies = document.getElementById("cookies");
    const header = document.querySelector(".header");
    let cookies_wrapper = document.getElementById("cookies_wrapper");
    cookies.classList.add("_cookies-active")
    setTimeout(() => {
        cookies_wrapper.classList.add("_cookies-hidde")
    }, 650);
    if (screen.width > 776) {
        header.classList.remove("_header-cookies")
    }
}