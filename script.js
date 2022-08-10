var todos = []

function panel() {

    //two sections
    var LeftPanelDiv = document.createElement("div");
    var RightPanelDiv = document.createElement("div");

    //appending to body
    document.body.appendChild(LeftPanelDiv);
    document.body.appendChild(RightPanelDiv);

    //best way to set id of element
    LeftPanelDiv.setAttribute("id", "LeftPanel");
    RightPanelDiv.setAttribute("id", "RightPanel");

    //heading
    var heading = document.createElement("h1");
    heading.innerHTML = "Task List"; //adding content inside the tag 
    LeftPanelDiv.appendChild(heading); //appending to left panel

    //subheading
    var subheading = document.createElement("h3");
    //adding content inside the tag
    subheading.innerHTML = "Add task to your list by typing to the right and pressing enter. You may then view pending task below."
    LeftPanelDiv.appendChild(subheading); //appending to left panel

    //creating input place to add task
    var input = document.createElement("textarea");
    input.setAttribute("id", "textbox"); //setting an id for textarea
    input.setAttribute("placeholder", "Enter text"); //placeholder text for the input
    RightPanelDiv.appendChild(input); //appending to right panel

    //this function works when the first parameter is true then second parameter performs otherwise stops
    input.addEventListener("keydown", EventHandler);
}

function EventHandler(event) {
    var keyCode = event.code;
    var todoBox = document.getElementById("textbox");
    var value = todoBox.value;

    if (value == "\n" || value == "\n\n" || value == " ") {
        alert("Enter a task");
        todoBox.value = "";
    }

    if (keyCode === "Enter" && value !== "") {
        event.preventDefault();
        var Container = document.createElement("div");
        var todoHeading = document.createElement("h5");
        var button = document.createElement("div");
        var checkbox = document.createElement("input");
        var delTask = document.createElement("i");

        Container.setAttribute("class", "container");
        todoHeading.setAttribute("id", "heading");
        button.setAttribute("id", "button");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "checkbox");
        delTask.setAttribute("id", "delTask");
        delTask.setAttribute("class", "bi bi-trash");

        delTask.addEventListener("click", function (event) {
            var btn = event.target.parentNode.parentNode;
            console.log('btn :>> ', btn);
            btn.innerHTML = "";

            // Get item from local storage
            // var item = localStorage.getItem("todos");
            // // Store it in an array
            // var store = JSON.parse(item);
            // // for each laga kar find by id of task
            // store.forEach((item,index) => {
            //     if(item.id === id ){
            //         item.splice(index, 1);
            //     }
            // });
            // // then splice the array 

            // store again into local storage

            let localItems = JSON.parse(localStorage.getItem("todos"));

            todos.splice(todos.length, 1);
            console.log('todos :>> ', todos);
            localStorage.setItem("todos", JSON.stringify(todos));
        });

        checkbox.addEventListener("change", function () {
            todoHeading.style.textDecoration = checkbox.checked ? "line-through" : "none";

        });

        button.appendChild(checkbox);
        button.appendChild(delTask);
        Container.appendChild(todoHeading);
        Container.appendChild(button);

        todoHeading.innerHTML = value;

        todos.push(value);
        localStorage.setItem("todos", JSON.stringify(todos));

        var LeftPanel = document.getElementById("LeftPanel");
        LeftPanel.appendChild(Container);

        todoBox.value = "";
    }
}

panel();

var storedTodos = localStorage.getItem("todos");
if (storedTodos !== null) {
    todos = JSON.parse(storedTodos);
}
console.log('todos :>> ', todos);
todos.forEach(function (value, index) {
    var Container = document.createElement("div");
    var todoHeading = document.createElement("h5");
    var button = document.createElement("div");
    var checkbox = document.createElement("input");
    var delTask = document.createElement("i");

    Container.setAttribute("class", "container");
    todoHeading.setAttribute("id", "heading");
    button.setAttribute("id", "button");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "checkbox");
    delTask.setAttribute("id", "delTask");
    delTask.setAttribute("class", "bi bi-trash");
    delTask.setAttribute("data-index", index);

    checkbox.addEventListener("change", function () {
        todoHeading.style.textDecoration = checkbox.checked ? "line-through" : "none";

    });

    delTask.addEventListener("click", function (event) {
        var btn = event.target.parentNode.parentNode;
        btn.innerHTML = "";
        let localItems = JSON.parse(localStorage.getItem("todos"));

        todos.splice(index, 1);
        console.log('todos :>> ', todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    })


    button.appendChild(checkbox);
    button.appendChild(delTask);
    Container.appendChild(todoHeading);
    Container.appendChild(button);

    todoHeading.innerHTML = value;

    var LeftPanel = document.getElementById("LeftPanel");
    LeftPanel.appendChild(Container);

})