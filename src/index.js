import 'lodash';
import { remove } from 'lodash';
import './style.css';

const inputField = document.querySelector('.add-form input');
let taskLists = [];
const todoLists = document.querySelector('.tasks-list');

const tasksTodo = (todo) => {
  const displayTasks = document.createElement('div');
  displayTasks.innerHTML = '';
  displayTasks.innerHTML += `
     <div class = "todo-list" id = ${todo.index}>
     <div class = "checkbox-description-container">
          <input type='checkbox' class="completeStatus" ${todo.completed ? 'checked' : ''} >
          <input value= "${todo.description}" type= "text" class="user-task"/>
     </div>
     <div class= "edit-remove" >
       <ul>
       <li onclick="removeTask(${todo.index})"><span class="material-symbols-outlined">
       delete
       </span></li>
       </ul>
       </div>
       </div>
      <div class="line"></div>
       `;

  todoLists.appendChild(displayTasks);
};

inputField.addEventListener('keypress', (e) => {
  const todoLists = inputField.value;
  if (e.key === 'Enter' && todoLists) {
    if (localStorage.getItem('duties') === null) {
      taskLists = [];
    } else {
      taskLists = JSON.parse(localStorage.getItem('duties'));
    }
    const assignment = {
      description: todoLists,
      completed: false,
      index: taskLists.length + 1,
    };
    e.target.value = '';
    taskLists.push(assignment);
    localStorage.setItem('duties', JSON.stringify(taskLists));
    tasksTodo(assignment);
  }
});

window.removeTask = (index) => {
  const taskId = document.getElementById(index);
  const deleteTask = JSON.parse(localStorage.getItem('duties'));
  const newTodo = deleteTask.filter((task) => task.index !== index);
  newTodo.forEach((task, i) => {
    task.index = i + 1;
  });
  localStorage.setItem('duties', JSON.stringify(newTodo));
  taskId.remove();
};

const tasks = JSON.parse(localStorage.getItem('duties')) || [];
if (localStorage.getItem('duties')) {
  tasks.forEach((task) => {
    tasksTodo(task);
  });
}

const editTasks = document.querySelectorAll('.user-task');
editTasks.forEach((task, index) => {
  task.addEventListener('change', (e) => {
    const updatedTask = e.target.value;
    taskLists = JSON.parse(localStorage.getItem('duties'));
    taskLists[index].description = updatedTask;
    localStorage.setItem('duties', JSON.stringify(taskLists));
  });
});
editTasks.forEach((task, index) => {
  task.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const updatedTask = e.target.value;
      taskLists = JSON.parse(localStorage.getItem('duties'));
      taskLists[index].description = updatedTask;
      localStorage.setItem('duties', JSON.stringify(taskLists));
    }
  });
});

// Updating the checkbox
const status = document.querySelectorAll('.completeStatus');
status.forEach((check, index) => {
  check.addEventListener('change', (e) => {
    const isChecked = e.target.toggleAttribute('checked');
    taskLists = JSON.parse(localStorage.getItem('duties'));
    taskLists[index].completed = isChecked;
    localStorage.setItem('duties', JSON.stringify(taskLists));
  });
});

const clearAllBtn = document.querySelector('.complete');

clearAllBtn.addEventListener('click', (e) => {
  taskLists = JSON.parse(localStorage.getItem('duties'));
  const updatedLists = taskLists.filter((task) => !task.completed);
  updatedLists.forEach((task, i) => {
    task.index = i + 1;
  });
  localStorage.setItem('duties', JSON.stringify(updatedLists));
  window.location.reload();
});