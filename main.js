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
var cardTaskList = document.querySelector('.card-task-list');



plusButton.addEventListener('click', populateTask);
makeTaskListButton.addEventListener('click', makeLotsOfThings);
tasks.addEventListener('click', deleteAsideTask);





// function restoredToDoList() {
//   taskArray = taskArray.map(function(oldToDoList) {
//     var restoredToDoList = new ToDoList(oldToDoList.title, oldToDoList.tasks, oldToDoList.id)
//     populateCard(restoredTodo);
//     return restoredToDoList;
//   });
// };

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
  taskList.push(object);
};


function createToDoCard() {
  var card = new ToDoList (titleInput.value, taskList);
  console.log(card);
  console.log(card.title)
  console.log(card.id)
  console.log(card.tasks)
  taskArray.push(card);
  console.log(taskArray)
  return card;
}


function makeLotsOfThings() {
  var card = createToDoCard();
  populateCard(card);
  iterateThruTasks(card);
  // taskList = [];
  unpopulateTask();
  clearFields();
}


function deleteAsideTask(e) {
  e.target.closest("li").remove();
}


function populateCard(card) {
  var freshCard = 
      `<article class="task-card" data-id="${card.id}">
    <h3>${card.title}</h3>
    <figure class="card-task-section">
        <ul class="card-task-list">
        ${iterateThruTasks(card)}
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
  newCard.insertAdjacentHTML('afterbegin', freshCard);
  };


function iterateThruTasks(x) {
 var taskListIteration = '';
 console.log(taskListIteration)
 for (var i = 0; i < x.tasks.length; i++){
   taskListIteration += `
     <li class="list-item">
       <img class="tick" src="images/checkbox.svg" alt="checkbox" data-id=${x.tasks[i].id} id="index ${i}"/>
       <p class="typed-todo">${x.tasks[i].content}</p>
     </li>
     `
 } return taskListIteration;
}

// function populateCardList() {
// var cardTaskList = document.querySelector('.card-task-list');
// var freshItem =
// `  <li class="list-item">
//     <img class="tick" src="images/checkbox.svg" alt="checkbox">
//     <p class="typed-todo">'${taskInput.value}'</p> 
//   </li>`;
//   cardTaskList.insertAdjacentHTML('afterbegin', freshItem);
  
// }













