var taskList = [];
var newItem = document.querySelector('.aside-task-input');
var plusButton = document.querySelector('.plus-button');
var tasks = document.querySelector('.aside-task-list');
var taskInput = document.querySelector('.aside-task-input');
var taskArray = [];
var makeTaskListButton = document.querySelector('.make-task-list-button');
var clearAllButton = document.querySelector('.clear-all-button');
var filterByUrgencyButton = document.querySelector('.filter-by-urgency-button');
var searchButton = document.querySelector('.search-button');
var titleInput = document.querySelector('#todo-title-input');




plusButton.addEventListener('click', populateTask);
plusButton.addEventListener('click', clearFields);
makeTaskListButton.addEventListener('click', makeLotsOfThings);
tasks.addEventListener('click', deleteAsideTask)


function populateTask(e) {
  e.preventDefault();
  tasks.innerHTML+=
    `<li class="aside-list-item">
      <img class="tick" src="images/checkbox.svg" alt="checkbox">
      <p class="aside-typed-todo">${taskInput.value}</p>
    </li>`
  instantiateSmallListItems();
};


function clearFields(e) {
  var newItem = document.querySelector('.aside-task-input');
  newItem.value = "";
  titleInput.value = "";
}

function unpopulateTask() {
  tasks.innerHTML= "";
}

function instantiateSmallListItems() {
  var object = new Items (taskInput.value);
  console.log(object)
  taskList.push(object);
  console.log(taskList);
};


function createToDoCard() {
  var card = new ToDoList (titleInput.value, taskList);
  console.log(card);
  taskArray.push(card);
  console.log(taskArray)
  clearFields();
}


function makeLotsOfThings() {
  createToDoCard();
  unpopulateTask();
  taskList = [];

}


function deleteAsideTask(e) {
  e.target.closest("li").remove();
}









