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
var newCard = document.querySelector('.task-field');



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
}


function makeLotsOfThings() {
  createToDoCard();
  unpopulateTask();
  taskList = [];
  populateCard();
  clearFields();
}


function deleteAsideTask(e) {
  e.target.closest("li").remove();
}


function populateCard() {
  var cardPlaceholder = document.createElement("div");
  newCard.prepend(cardPlaceholder);
  cardPlaceholder .innerHTML+=
  `<article class="task-card" data-id="${tasks.id}">
    <h3>${titleInput.value}</h3>
    <figure class="card-task-section">
        <ul class="card-task-list">
        ${tasks.innerHTML}
        </ul>
    </figure>
    <section class="card-bottom">
      <div class="bottom-task-card-left-urgent">
        <img id="urgent-button" class="urgent-button-task icon-button" src="images/urgent.svg" alt="urgent icon">
        <p>URGENT</p>  
        </div>
      <div class="bottom-task-card-right-delete">
        <img src="images/delete.svg" alt="delete button" class="delete-button icon-button" type="submit">
        <p>DELETE</p>  
      </div>
    </section>
  </article>`
}






