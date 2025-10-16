let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty array
let arrayOfTasks = [];

(function () {
  arrayOfTasks = JSON.parse(localStorage.getItem("Tasks")) || []; // added || to dont let arrayOfTasks return null and make Error
  if (arrayOfTasks.length > 0) {
    addElementToPageFrom(arrayOfTasks);
  }
})();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

tasksDiv.addEventListener("click", function (e) {
  // لو دوست على زر Done
  if (e.target.classList.contains("btn-done")) {
    let taskDiv = e.target.parentElement;
    toggleStatuse(taskDiv.getAttribute("data-id"));
    taskDiv.classList.toggle("done");
  }
  
  // لو دوست على زر Delete
  if (e.target.classList.contains("del")) {
    let taskDiv = e.target.parentElement;
    taskDiv.remove();
    let id = taskDiv.getAttribute("data-id");
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
    addToLocalstorage(arrayOfTasks);
  }
});

function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // push task to array
  arrayOfTasks.push(task);
  // add task to page
  addElementToPageFrom(arrayOfTasks);
  addToLocalstorage(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
  // empty tasks
  tasksDiv.innerHTML = "";
  // looping on array
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let buttonDel = document.createElement("button");
    buttonDel.className = "del";
    buttonDel.appendChild(document.createTextNode("Delete"));
    div.appendChild(buttonDel);
    let buttonDone = document.createElement("button");
    buttonDone.className = "btn-done";
    buttonDone.appendChild(document.createTextNode("Done"));
    div.appendChild(buttonDone);
    tasksDiv.appendChild(div);
  });
}
function addToLocalstorage(arrayOfTasks) {
  window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}

function toggleStatuse(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addToLocalstorage(arrayOfTasks);
}

document.querySelector('.clear-all').addEventListener('click' , function () {  
  if (confirm("هتمسح كل المهام؟")) {
    tasksDiv.innerHTML = "";
    arrayOfTasks = [];
    localStorage.removeItem("Tasks");
    alert("تم مسح كل المهام بنجاح!");
  }
})
document.querySelector('.clear-done').addEventListener('click' , function () {  
  if (confirm("هتمسح المهام اللي خلصت ؟")) {
    arrayOfTasks = arrayOfTasks.filter((done) => done.completed!== true);
    addElementToPageFrom(arrayOfTasks);
    addToLocalstorage(arrayOfTasks);
}
})