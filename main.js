var taskList = [];
var newItem = document.querySelector('.aside-task-input');
var plusButton = document.querySelector('.plus-button');
var tasks = document.querySelector('.aside-task-list');
var taskInput = document.querySelector('.aside-task-input');
var taskArray = JSON.parse(localStorage.getItem('StoredList')) || [];
var makeTaskListButton = document.querySelector('.make-task-list-button');
var clearAllButton = document.querySelector('.clear-all-button');
var filterByUrgencyButton = document.querySelector('.filter-by-urgency-button');
var searchButton = document.querySelector('.search-button');
var titleInput = document.querySelector('#todo-title-input');
var newCard = document.querySelector('.task-field');
var cardTaskList = document.querySelector('.card-task-list');



plusButton.addEventListener('click', instantiateSmallListItems);
makeTaskListButton.addEventListener('click', makeLotsOfThings);
tasks.addEventListener('click', blockAddTask);

window.addEventListener('load', restoreList);
newCard.addEventListener('click', deleteCardFromDOM)
clearAllButton.addEventListener('click', clearAside);



function blockAddTask(e) {
  var targetId = parseInt(e.target.closest(".aside-list-item").dataset.id);
  let index = 0;

  for(let i=0; i < taskList.length ; i++){
    if(taskList[i].id === targetId) {
      index = taskList.indexOf(taskList[i])
      taskList.splice(index,1)
    }
  }

  // taskList.forEach(task => {
  //   if(task.id === targetId) {
  //     index = taskList.indexOf(task)
  //     taskList.splice(index)
  //   }
  // })
  
  e.target.closest("li").remove();

  // var itemIndex = parsedItems.findIndex(function(task) {
  // return task.id === targetId;
  // });
  // parsedItems.splice(itemIndex, 1);
  
}





function deleteCardFromDOM(e) {
  if (e.target.className === "delete-button icon-button") {
    e.target.closest(".task-card").remove();
    var removedList = new ToDoList();
    var targetId = parseInt(e.target.closest(".task-card").dataset.id);
    removedList.deleteFromStorage(targetId); 
  }
};



function clearAside() {
  var newItem = document.querySelector('.aside-task-input');
  var titleInput = document.querySelector('#todo-title-input');
  newItem.value = "";
  titleInput.value = "";
  unpopulateTask();
};

function restoreList() {
  taskArray = taskArray.map(function(oldList) {
    var restoredList = new ToDoList(oldList.title, oldList.tasks, oldList.id, oldList.urgent);
    populateCard(restoredList);
    return restoredList;
  });
};

function clearTaskField() {
  var newItem = document.querySelector('.aside-task-input');
  newItem.value = "";
}


function clearFields() {
  var titleInput = document.querySelector('#todo-title-input');
  titleInput.value = "";
  clearTaskField();
};

function unpopulateTask() {
  tasks.innerHTML= "";
};

function instantiateSmallListItems(e) {
  e.preventDefault()
  if (taskInput.value) {
  var object = new Items (taskInput.value);
  console.log(taskList)
  taskList.push(object);
  populateTask(object);
  clearTaskField();
  }
};


function populateTask(object) {
  if (taskInput.value) {
  tasks.innerHTML+=
    `<li class="aside-list-item" data-id="${object.id}">
      <img class="tick" src="images/delete.svg" alt="checkbox">
      <p class="aside-typed-todo">${object.content}</p>
    </li>`
  }
};

function createToDoCard() {
  var card = new ToDoList (titleInput.value, taskList);
  taskArray.push(card);
  card.saveToStorage(taskArray);
  return card;
};


function makeLotsOfThings() {
  if (titleInput.value && tasks.innerHTML) {
  var card = createToDoCard();
  populateCard(card);
  iterateThruTasks(card);
  taskList = [];
  unpopulateTask();
  clearFields();
  }
};

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
        <input type="image" src="images/delete.svg" alt="delete button" class="delete-button icon-button">
        <p>DELETE</p>  
      </div>
    </section>
  </article>`
  newCard.insertAdjacentHTML('afterbegin', freshCard);
  };


function iterateThruTasks(x) {
 var taskListIteration = '';
 for (var i = 0; i < x.tasks.length; i++){
   taskListIteration += `
     <li class="list-item">
       <img class="tick" src="images/checkbox.svg" alt="checkbox" data-id=${x.tasks[i].id} id="index ${i}"/>
       <p class="typed-todo">${x.tasks[i].content}</p>
     </li>
     `
 } return taskListIteration;
}



// NOT WORKING
// function handleButtons(e){
//  e.preventDefault()
//   if (newItem.value = "" || titleInput.value = "") {
//     plusButton.disabled = true;
//     plusButton.classList.add('disabled')    
//   } else {
//     plusButton.disabled = false;
//     plusButton.classList.remove('disabled')
//   }
// };












