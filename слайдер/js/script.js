const allButt = document.getElementsByName("slider-number");
const elemWidth = document.querySelector('.slider-el').offsetWidth;
const prevbutt = document.querySelector(".arrow__left");
const nextbutt = document.querySelector(".arrow__right");
const sliderLength = document.querySelector(".slider-list").offsetWidth;
const form = document.querySelector('.form')
const preloader = document.querySelector(".container__spiner")
let subButtArray = []
let slides = document.querySelectorAll('.slider-el');
let slider = [];

let step = 0;
let offset = 0;

window.onload = function (params) {
    preloader.style.display = 'none';
    for (let i = 0; i < slides.length; i++) {
        slider[i] = slides[i].src;
        slides[i].remove();
        subButtArray[i] = i;
    }
    draw();
    drawSubButton();
}
function drawSubButton() {
    subButtArray.map((e) => {
        let x = document.createElement("button");
        if (e <= 9) {
            x.setAttribute("class", "sub-butt");
            x.setAttribute("value", e);
            x.setAttribute("name", "slider-number");
            x.addEventListener("click", buttonclick, false)
            form.appendChild(x);
            if (e == 0) {
                x.classList.add("checkbox-active")
            }
        }
    })
}
function draw() {
    
    let next_img = document.createElement('img');
    if (step + 1 == slider.length) {
        next_img.src = slider[0];
    }
    else {
        next_img.src = slider[step + 1];
    }
    next_img.classList.add('slider-el');
    next_img.style.left = sliderLength + 'px'
    let img = document.createElement('img');
    img.src = slider[step];
    img.classList.add('slider-el');
    let prev_img = document.createElement('img');
    if (step - 1 < 0) {
        prev_img.src = slider[slider.length - 1]
    } else {
        prev_img.src = slider[step - 1];
    }
    prev_img.classList.add('slider-el');
    prev_img.style.left = -sliderLength + 'px'
    document.querySelector('.slider-list').appendChild(prev_img)
    document.querySelector('.slider-list').appendChild(img)
    document.querySelector('.slider-list').appendChild(next_img)
}
function checkSteps(where) {
    if (where == 'prev') {
        if (step - 1 < 0) {
            step = slider.length - 1
        } else {
            step--;
        }
    }
    if (where == 'next') {
        if (step + 1 == slider.length) {
            step = 0
        } else {
            step++;
        }
    }
}

function animation(element, startPosition, endPosition, where, speed, stop) {
    let changes = (element.offsetWidth / 10)
    if (!speed) {
        speed = 20;
    }
    debugger
    nextbutt.removeAttribute('onclick')
    prevbutt.removeAttribute('onclick')
    let timer = setInterval(() => {
        if (startPosition != endPosition) {
            element.style.left = startPosition + 'px'
            if (where == "left") {
                startPosition = startPosition - changes
            }
            if (where == "right") {
                startPosition = startPosition + changes
            }
        } else {
            element.remove()
            stop ? draw() : null
            clearInterval(timer);
            nextbutt.setAttribute('onclick',"NextButtClick()")
            prevbutt.setAttribute('onclick',"PrevButtClick()")  
        }
    }, speed);
}
function NextButtClick(speed) {
    let slides2 = document.querySelectorAll('.slider-el');
    for (let i = 0; i < slides2.length; i++) {
        if (i == 0) {
            slides2[i].remove();
        } if (i == 1) {
            animation(slides2[i], 0, -elemWidth, "left", 20 - speed)
        } if (i == 2) {
            animation(slides2[i], elemWidth, 0, "left", 20 - speed, true)
        }
    }
    checkSteps('next');
    subButtIsChange("next");
}
function PrevButtClick(speed) {
    let slides2 = document.querySelectorAll('.slider-el');
    for (let i = 0; i < slides2.length; i++) {
        if (i == 0) {
            animation(slides2[i], -elemWidth, 0, "right", 20 - speed)
        } if (i == 1) {
            animation(slides2[i], 0, elemWidth, "right", 20 - speed, true)
        } if (i == 2) {
            slides2[i].remove();
        }
    }
    checkSteps('prev')
    subButtIsChange("prev");
}
function subButtIsChange(where) {
    let subButtArray = document.getElementsByName("slider-number");
    let currentSubButt = document.querySelector(".checkbox-active").value;
    if (where == "next") {
        if (Number(currentSubButt) < subButtArray.length - 1) {
            let number = Number(currentSubButt) + 1;
            subButtArray[number].classList.add("checkbox-active");
            subButtArray[currentSubButt].classList.remove("checkbox-active");
        } else {
            subButtArray[currentSubButt].classList.remove("checkbox-active");
            subButtArray[0].classList.add("checkbox-active");
        }
    }
    if (where == "prev") {
        if (Number(currentSubButt) !== 0) {
            let number = Number(currentSubButt) - 1;
            subButtArray[number].classList.add("checkbox-active")
            subButtArray[currentSubButt].classList.remove("checkbox-active")
        } else {
            subButtArray[currentSubButt].classList.remove("checkbox-active")
            subButtArray[subButtArray.length - 1].classList.add("checkbox-active")
        }
    }
}
function buttonclick(e) {
    newButt = e.target.value;
    margin1 = newButt - step;
    margin2 = step - newButt
    for (let i = 0; i < allButt.length; i++) {
        allButt[i].setAttribute("disabled", "disabled");
    }
    let interval = setInterval(() => {
        if (newButt > step) {
            NextButtClick(margin1)
        } else {
            if (newButt < step) {
                PrevButtClick(margin2)
            } else {
                for (let i = 0; i < allButt.length; i++) {
                    allButt[i].removeAttribute("disabled");
                }
                clearInterval(interval)
            }
        }
    }, 200);
}