
function generateRandomString(length) {

    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < length; i++) {
        result = result + "" + characters.charAt(Math.floor(Math.random() * characters.length));
    }


    return result;

}

if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify([]));
}
//  <=============== Nav Bar =====================>

let colors = document.querySelectorAll(".filter div");
let grid = document.querySelector(".grid");

let color = {

    pink: "#d595aa",
    green: "#91e6c7",
    blue: "#5ecdde",
    black: "black"
}

let select = false;
for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener("click", (e) => {

        let clr = colors[i].classList[0];


        if (select) {
            select = false;
            if (colors[i].parentElement.classList.contains("Select-state")) {
                colors[i].parentElement.classList.remove("Select-state");
                loadTasks();
            }

        }
        else {
            select = true;
            colors[i].parentElement.classList.add("Select-state");
            loadTasks(clr);
        }

    });
}


//================= ticket  ====================  //

function ticket(priority_color, text, id) {
    let tkt = document.createElement("div");
    let grid = document.querySelector(".grid");
    tkt.classList.add("ticket");

    tkt.innerHTML = ` <div class="color ${priority_color}"></div>
     <div class="ticket-id">${"#" + id}</div>
     <div class="ticket-text" spellcheck="false" contenteditable> ${text}</div>
    </div>`

    storeinLocalStorage(priority_color, id, text);

    let WriteArea = tkt.querySelector(".ticket-text");

    WriteArea.addEventListener("input", (e) => {

        let tktid = e.currentTarget.parentElement.querySelector(".ticket-id").innerText.split("#")[1];

        let text = WriteArea.innerText;

        let tasksArr = JSON.parse(localStorage.getItem("tasks"));

        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i]["id"] == tktid) {
                tasksArr[i]["text"] = text;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArr));

    });

    let color_btn = tkt.querySelector(".color");

    let colorClass = ["pink-btn2", "blue-btn2", "green-btn2", "black-btn2"];



    color_btn.addEventListener("click", (e) => {
        let currColor = color_btn.classList[1];
        let idx = colorClass.indexOf(currColor);
        idx = (idx + 1) % 4;
        color_btn.classList.remove(currColor);



        let tktid = e.currentTarget.parentElement.querySelector(".ticket-id").innerText.split("#")[1];
        let tasksArr = JSON.parse(localStorage.getItem("tasks"));

        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i]["id"] == tktid) {
                tasksArr[i].priority_color = colorClass[idx];
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
        color_btn.classList.add(colorClass[idx]);

    });
    grid.appendChild(tkt);

    tkt.addEventListener("click", (e) => {

        if (deleteState) {
            let id = tkt.querySelector(".ticket-id").innerText.split("#")[1];

            let tasks = JSON.parse(localStorage.getItem("tasks"));

            tasks = tasks.filter(function (e) {

                return e.id != id;
            });

            localStorage.setItem("tasks", JSON.stringify(tasks));

            tkt.remove();
        }

    });

}

//================= dialog Box + addbtn ===================//
let modalVisible = false;
let body = document.querySelector("body");
let addbtn = document.querySelector(".add-btn");

addbtn.addEventListener("click", (e) => {

    if (deleteState) {
        deleteState = false;
        if (deletebtn.classList.contains("delete-state")) {

            deletebtn.classList.remove("delete-state");
        }
    }
    if (modalVisible) return;



    let dialogbox = document.createElement("div");

    dialogbox.classList.add("dialog-box");

    dialogbox.innerHTML = `<div class="text-area" spellcheck="false" contenteditable>
Enter Your Task </div>
<div class="priority-btn">
<div class="btns">

  <div class="pink-btn2"></div>
  <div class="blue-btn2"></div>
  <div class="green-btn2"></div>
  <div class="black-btn2 add-btn-border2"></div>

</div>
</div>`
    body.appendChild(dialogbox);
    modalVisible = true;
    let clr = "black-btn2";
    let priority_btn = document.querySelectorAll(".btns div");

    for (let i = 0; i < priority_btn.length; i++) {
        priority_btn[i].addEventListener("click", (e) => {

            clr = priority_btn[i].classList[0];

            for (let j = 0; j < priority_btn.length; j++) {

                priority_btn[j].classList.remove("add-btn-border");
                priority_btn[j].classList.remove("add-btn-border2");

            }
            if (clr != "black-btn2") {
                priority_btn[i].classList.add("add-btn-border");
            }
            else {
                priority_btn[i].classList.add("add-btn-border2");
            }


        });
    }

    let textarea = dialogbox.querySelector(".text-area");
    let count = 0;
    textarea.addEventListener("click", (e) => {
        count++;
        if (count == 1) {
            textarea.textContent = "";
        }
        else {
            return;
        }
    });
    let shiftdown = false;
    textarea.addEventListener("keypress", (e) => {

        if (!shiftdown && e.key == "Enter") {
            let text = textarea.textContent;
            let id = generateRandomString(6);
            ticket(clr, text, id);
            dialogbox.remove();
            modalVisible = false;
        }

    });


    textarea.addEventListener("keydown", (e) => {
        if (e.key == "Shift") {
            shiftdown = true;

        }
    });
    textarea.addEventListener("keyup", (e) => {

        if (e.key == "Shift") {
            shiftdown = false;
            console.log(shiftdown);
        }

    });

});
//=======================  delete btn  ====================== ///////////////////////
let deletebtn = document.querySelector(".delete-btn");

let deleteState = false;
deletebtn.addEventListener("click", (e) => {

    if (deleteState) {
        deleteState = false;
        deletebtn.classList.remove("delete-state");
    }
    else {
        deleteState = true;
        deletebtn.classList.add("delete-state");
    }

});


let sidePanelBtn = document.querySelector(".toggle-btn");
let container = document.querySelector(".container");
let canvas = document.querySelector(".sheet");
sidePanelBtn.addEventListener("click", (e) => {
    canvas.style.width = "100%";

});

let closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", (e) => {

    canvas.style.width = "0%";

});



function storeinLocalStorage(priority_color, id, text) {

    let taskArr = JSON.parse(localStorage.getItem("tasks"));
    let obj = { id, priority_color, text };

    taskArr.push(obj);

    localStorage.setItem("tasks", JSON.stringify(taskArr));

}

function loadtickets(priority_color, text, id) {
    let tkt = document.createElement("div");
    let grid = document.querySelector(".grid");
    tkt.classList.add("ticket");

    tkt.innerHTML = ` <div class="color ${priority_color}"></div>
     <div class="ticket-id">${"#" + id}</div>
     <div class="ticket-text" spellcheck="false" contenteditable> ${text}</div>
    </div>`



    let WriteArea = tkt.querySelector(".ticket-text");

    WriteArea.addEventListener("input", (e) => {

        let tktid = e.currentTarget.parentElement.querySelector(".ticket-id").innerText.split("#")[1];

        let text = WriteArea.innerText;

        let tasksArr = JSON.parse(localStorage.getItem("tasks"));

        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i]["id"] == tktid) {
                tasksArr[i]["text"] = text;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArr));

    });

    let color_btn = tkt.querySelector(".color");

    let colorClass = ["pink-btn2", "blue-btn2", "green-btn2", "black-btn2"];



    color_btn.addEventListener("click", (e) => {
        let currColor = color_btn.classList[1];
        let idx = colorClass.indexOf(currColor);
        idx = (idx + 1) % 4;
        color_btn.classList.remove(currColor);



        let tktid = e.currentTarget.parentElement.querySelector(".ticket-id").innerText.split("#")[1];
        let tasksArr = JSON.parse(localStorage.getItem("tasks"));

        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i]["id"] == tktid) {
                tasksArr[i].priority_color = colorClass[idx];
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
        color_btn.classList.add(colorClass[idx]);

    });
    grid.appendChild(tkt);

    tkt.addEventListener("click", (e) => {

        if (deleteState) {
            let id = tkt.querySelector(".ticket-id").innerText.split("#")[1];

            let tasks = JSON.parse(localStorage.getItem("tasks"));

            tasks = tasks.filter(function (e) {

                return e.id != id;
            });

            localStorage.setItem("tasks", JSON.stringify(tasks));

            tkt.remove();
        }

    });

}

function loadTasks(colour) {


    let allTickets = document.querySelectorAll(".ticket");

    for (let i = 0; i < allTickets.length; i++) {
        allTickets[i].remove();
    }

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (colour != undefined) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].priority_color == colour)
                loadtickets(tasks[i].priority_color, tasks[i].text, tasks[i].id);
        }
        return;
    }



    for (let i = 0; i < tasks.length; i++) {
        loadtickets(tasks[i].priority_color, tasks[i].text, tasks[i].id);
    }
}

loadTasks();


