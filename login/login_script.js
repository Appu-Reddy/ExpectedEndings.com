const options_cont = document.querySelector(".options");
const name_cont = document.querySelector("#user-name input");
const mail_cont = document.querySelector("#user-mail input");
const pass_cont = document.querySelector("#user-pass input");
const robo = document.querySelector("#robo-box input");
const sign = document.querySelector("#sign-in-button button");

let nam = '', pass = '', mail = '';
let cond_robot = false;
let show_mssg = true;

let user_stored = JSON.parse(window.localStorage.getItem('user_stored')) || [];

name_cont.addEventListener("input", (e) => {
    nam = e.target.value;
    invalid_checker("username",nam, name_cont,"username-error");
})

mail_cont.addEventListener("input", (e) => {
    mail = e.target.value;
    invalid_checker('usermail',mail, mail_cont,"mail-error");
})

pass_cont.addEventListener("input", (e) => {
    pass = e.target.value;
    invalid_checker("userpass",pass, pass_cont,"password-error");
})

function check_caps(word)
{
    let up=0;
    for(i of word) if (i >= 'A' && i <= 'Z') up++;
    return up;
}

function check_number(word)
{
    let dig=0;
    for (i of word) if ((/^\d+$/.test(i))) dig +=1;
    return dig;
}

function generate_message_username(name) {
    let mssg = "";
    if (name.length === 0) return "Invalid Username...";
    if (name.length > 0 && name.length <= 8) mssg = "Length should be >8...";
    if (check_caps(name) === 0) mssg = "Must have one capital letter...";
    if (check_number(name) === 0) mssg = "Must include a number...";
    return mssg;
}

function generate_message_userpass(p) {
    let mssg = "";
    if (p.length === 0) return "Invalid Password...";
    if (p.length > 8) mssg = "Length should be <8...";
    if (check_caps(p) === 0) mssg = "Must have one capital letter...";
    if (check_number(p) === 0) mssg = "Must include a number...";
    return mssg;
}

function invalid_checker(opt, parameter, container,elementId)
 {
    let para = document.querySelector(`#${elementId}`);
    show_mssg = true;
    let message = '';

    if (opt === "username") 
    {
        if (parameter.length == 0 || parameter.length <= 8 || check_caps(parameter) == 0 || check_number(parameter) == 0) 
        {
            show_mssg = true;
            message = generate_message_username(parameter);
        }
        else show_mssg = false;
    }

    if (opt == "usermail")
    {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parameter)) show_mssg = false; 
        else message = "Wrong mail id...";
    }

    if (opt == "userpass")
    {
        if (parameter.length == 0 || parameter.length >8 || check_caps(parameter) == 0 || check_number(parameter) == 0)
        {
            show_mssg = true;
            message = generate_message_userpass(parameter);
        }
        else show_mssg = false;
    }

    if (show_mssg) 
    {
        if (!para)
        {
            para = document.createElement("h4");
            para.style.color = "black";
            para.style.fontSize = "23px";
            para.id = elementId;
            para.textContent = message;
            container.parentNode.appendChild(para);
        }
        else para.textContent = message;
    } 
    else
    {
        if (para) para.remove();
    }
}

function error_styling(err,error_mssg)
{
    err.innerText = error_mssg;
    err.style.color = "orange";
    err.style.fontSize = "20px";
    err.style.fontFamily = "Nerko one";
    err.style.textAlign = "center";
    err.style.paddingLeft = "5px";
}

robo.addEventListener("click" , () => {
    cond_robot = robo.checked;
    let robo_error = robo.parentElement.parentElement.lastElementChild;
    let error = document.querySelector("p");
    if (!cond_robot)
    {
        if (!error) 
        {
            let err = document.createElement("p");
            error_styling(err,"Please Check the Robot box...");
            robo_error.appendChild(err);
        }
    } 
    else
    {
        if (error) error.remove();
    }
})

sign.addEventListener("click" , () => {

    if (nam ==="" || pass === "" || mail === "")
    {
        let robo_error = robo.parentElement.parentElement.lastElementChild;
        let error = document.querySelector("p");
        if (!error) 
        {
            let err = document.createElement("p");
            error_styling(err,"fields can't be empty");
            robo_error.appendChild(err);
        }
    }

    if (!show_mssg && cond_robot)
        {

            if (user_stored.includes(nam))
            {
                let crrct_pass = window.localStorage.getItem(nam);
                let para = document.querySelector("password-error");

                if (pass === crrct_pass)
                { 
                    if (para) para.remove();
                    setTimeout(() =>  window.location.assign("./homepage/home_index.html"),1500);
                }
                else
                {
                    let message = "Username exists..wrong password...";
                    if (!para)
                    {
                        para = document.createElement("h6");
                        para.id = "password-error";
                        para.textContent = message;
                        pass_cont.parentNode.appendChild(para);
                    }
                    else para.textContent = message;
                }
            }
            else
            {
                if (!nam=="")
                {
                    window.localStorage.setItem(nam,pass);
                    user_stored.push(nam);
                }
                window.localStorage.setItem('user_stored', JSON.stringify(user_stored));
                setTimeout(function() { window.location.assign("./homepage/home_index.html"); },1500);
            }
        }
    else
    {
        if (!cond_robot) 
        {
            let robo_error = robo.parentElement.parentElement.lastElementChild;
            let error = document.querySelector("p");
            if (!error) 
            {
                let err = document.createElement("p");
                error_styling(err,"Please Check the Robot box....");
                robo_error.appendChild(err);
            }
        }
    }
})