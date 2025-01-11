const body_cont = document.querySelector("body");
const read_button = document.querySelector(".read-select");
const write_button = document.querySelector(".write-select");
const backButtons = document.querySelectorAll(".back");

backButtons.forEach(back => {
    back.addEventListener("click", () => {
        window.location.reload();
    });
});

/* Reading Story Start*/

const rsubmit = document.querySelector("#read-submit");
const rreset = document.querySelector("#read-reset");
const story_Cont = document.querySelector(".stories");
const rinput_cont = document.querySelector('.read-inputs');

let mrnam = '';
let mryr = 0;
let mrlang = "Telugu";


read_button.addEventListener("click", ()=> {
    body_cont.classList.add("read-active");
})

function rhandleEvent(e) {
    const target = e.target;

    if (target.classList.contains('read-search')) mrnam = target.value;
    else if (target.classList.contains('read-year')) mryr = parseInt(target.value) || 0;
    else if (target.tagName === 'SELECT') mrlang = target.value;
}

rinput_cont.addEventListener('input', rhandleEvent);
rinput_cont.addEventListener('change', rhandleEvent);

rsubmit.addEventListener("click", () => {
    const existingError = rinput_cont.querySelector("p.error-message");

    if (mrnam.length>0 && mryr>0) {
        if (existingError) rinput_cont.removeChild(existingError);
        story_Cont.classList.add("stories-active");
    } 
    else {
        if (existingError) rinput_cont.removeChild(existingError);

        const err = document.createElement("p");
        err.textContent = "fields can't be empty...";
        err.className = "error-message";
        rinput_cont.appendChild(err);
    }
});

rreset.addEventListener("click",()=>{
    story_Cont.classList.remove("stories-active");
})

/* Reading Story End*/

/* Writing Story start*/

const winput_cont = document.querySelector('.write-cont');
const usr_story_cont = document.querySelector(".user-story");
const wsubmit = document.querySelector("#write-submit");
const wreset = document.querySelector("#write-reset");

let mwnam = '';
let mwyr = 0;
let mwlang = "Telugu";
let usr_story = "";

write_button.addEventListener("click", ()=> {
    body_cont.classList.add("write-active");
})

function whandleEvent(e) {
    const target = e.target;

    if (target.classList.contains('write-search')) mwnam = target.value;
    else if (target.classList.contains('write-year')) mwyr = parseInt(target.value) || 0;
    else if (target.tagName === 'SELECT') mwlang = target.value;
}

winput_cont.addEventListener('input', whandleEvent);
winput_cont.addEventListener('change', whandleEvent);

usr_story_cont.addEventListener("input",() => {
    usr_story = usr_story_cont.querySelector("textarea").value;
})

wsubmit.addEventListener("click", () => {
    const existingError = winput_cont.querySelector("p.error-message");

    if (mwnam.length>0 && mwyr>0 && usr_story.length>0) {
        if (existingError) winput_cont.removeChild(existingError);
        document.querySelector('.write-success').classList.add('write-success-active');
       
        setTimeout(() => {
            document.querySelector('.write-success').classList.remove('write-success-active');
        }, 2000);
    } 

    else {
        if (existingError) winput_cont.removeChild(existingError);

        const err = document.createElement("p");
        err.textContent = "fields can't be empty...";
        err.className = "error-message";
        err.style.paddingTop = "10px";
        err.style.fontSize = "18px";
        winput_cont.appendChild(err);
    }
});