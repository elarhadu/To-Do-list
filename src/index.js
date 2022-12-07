import 'lodash';
import './style.css';
import tasksLists from './modules/render.js';

class Display {
  static showTasks() {
    const lists = tasksLists;

    const tasks = lists;

    tasks.forEach((task) => Display.addTaskToList(task));
  }

  static addTaskToList(task) {
    const todoLists = document.querySelector('.tasks-list');
    const displayTasks = document.createElement('div');
    displayTasks.innerHTML = `
   <div class = "todo-list" id = ${task.index} complete = ${task.completed}>
   <div class = "checkbox-description-container">
        <input type='checkbox'>
        <p>${task.description}</p>
   </div>
     <i class="fa-solid fa-ellipsis-vertical"></i>
     </div>
    <div class="line"></div>
     `;
    todoLists.appendChild(displayTasks);
  }
}

document.addEventListener('DOMContentLoaded', Display.showTasks);
