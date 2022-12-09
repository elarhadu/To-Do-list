import "lodash";
import "./style.css";

const inputField = document.querySelector(".add-form input");
let taskLists = [];
const todoLists = document.querySelector(".tasks-list");
let editIndex;
let editedTodo = false;


const tasksTodo = (todo) => {
  const displayTasks = document.createElement("div");

  displayTasks.innerHTML += `
     <div class = "todo-list" id = ${todo.index} complete= ${todo.completed}>
     <div class = "checkbox-description-container">
          <input type='checkbox' onclick='completedTask(${todo.completed})' >
          <input type='text' value=${todo.description} class="user-task" readonly>
     </div>
     <div class= "edit-remove" >
       <i class="fa-solid fa-ellipsis-vertical" ></i>
       <ul>
       <li class="edit" onclick="editTask(${todo.index}, ${todo.description})"><span class="material-symbols-outlined">
       edit
       </span>Edit</li>
       <li onclick="removeTask(${todo.index})"><span class="material-symbols-outlined">
       delete
       </span>Remove</li>
       </ul>
       </div>
       </div>
      <div class="line"></div>
       `;

  todoLists.appendChild(displayTasks);
};

inputField.addEventListener("keypress", (e) => {
  let todoLists = inputField.value;
  if (e.key === "Enter" && todoLists) {
    if (localStorage.getItem("duties") === null) {
      taskLists = [];
    } else {
      taskLists = JSON.parse(localStorage.getItem("duties"));
    }
    let assignment = {
      description: todoLists,
      completed: false,
      index: taskLists.length,
    };
    e.target.value = "";
    taskLists.push(assignment);
    localStorage.setItem("duties", JSON.stringify(taskLists));
    tasksTodo(assignment);
  }
});

window.removeTask = (index) => {
  const taskId = document.getElementById(index);
  const deleteTask = JSON.parse(localStorage.getItem("duties"));
  const newTodo = deleteTask.filter((task) => {
    return task.index !== index;
  });
  localStorage.setItem("duties", JSON.stringify(newTodo));
  taskId.remove();
};

const tasks = JSON.parse(localStorage.getItem("duties")) || [];
if (localStorage.getItem("duties")) {
  tasks.forEach((task) => {
    tasksTodo(task);
  });
}

// Edit a task
window.editTask = (index, description) => {
  editIndex=index;
  inputField.value = description;
}