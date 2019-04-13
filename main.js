var newItem = document.querySelector('.aside-task-input');
var plusButton = document.querySelector('.plus-button');
var tasks = document.querySelector('.aside-task-list');
var taskInput = document.querySelector('.aside-task-input');



plusButton.addEventListener('click', createTask);



function createTask(e) {
  e.preventDefault();
  var taskPlaceHolder = document.createElement('div');
  tasks.innerHTML+=
    `<li class="aside-list-item">
      <img class="tick" src="images/checkbox.svg" alt="checkbox">
      <p class="aside-typed-todo">${taskInput.value}</p>
    </li>`
};

