// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

//  Class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// STorage

let LIST = [];
let id = 0;
// get item from the local storage
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else{
    let LIST = [];
    let id = 0;
};

// load items to user interface
function loadList(array){
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash)
    });

}

//clear the local storage
 clear.addEventListener("click", function(){
     localStorage.clear();
     location.reload();
 })

// add item to the local storage (this code must be added everywhere where the list is updated)
localStorage.setItem("TODO", JSON.stringify(LIST));

// Today's date
const today = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };
dateElement.innerText = today.toLocaleDateString("en-US", options);

// to-do function
function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
                    <li class = "item">
                    <i class = "fa ${DONE} co" job = "complete" id= "${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class = "fa fa-trash-o de" job = "delete" id = "${id}">
                    </li>
    `;
    let position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list -> Enter key

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            })
            // add item to the local storage (this code must be added everywhere where the list is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
})

// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target; // returns which element was clicked inside the list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    // add item to the local storage (this code must be added everywhere where the list is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
})

