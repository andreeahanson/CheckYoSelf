var taskList = [];
var newItem = document.querySelector('.aside-task-input');
var plusButton = document.querySelector('.plus-button');
var tasksAside = document.querySelector('.aside-task-list');
var taskInput = document.querySelector('.aside-task-input');
var taskArray = [];
var makeTaskListButton = document.querySelector('.make-task-list-button');
var clearAllButton = document.querySelector('.clear-all-button');
var filterByUrgencyButton = document.querySelector('.filter-by-urgency-button');
var searchButton = document.querySelector('.search-button');
var searchInput = document.querySelector('.search-input');
var titleInput = document.querySelector('#todo-title-input');
var newCard = document.querySelector('.task-field');
var cardTaskList = document.querySelector('.card-task-list');



plusButton.addEventListener('click', instantiateSmallListItems);
makeTaskListButton.addEventListener('click', makeLotsOfThings);
tasksAside.addEventListener('click', blockAddTask);
window.addEventListener('load', restoreList);
newCard.addEventListener('click', deleteCardFromDOM)
clearAllButton.addEventListener('click', clearAside);
newCard.addEventListener('click', checkOffTheTasks);
searchButton.addEventListener('click', searchFilter);
searchInput.addEventListener('keyup', searchFilter);
// newCard.addEventListener('click', makeItUrgent)



function searchFilter(e) {
  e.preventDefault();
  removeCardFilter ()
  var searchText = searchInput.value;
  var textSearch = taskArray.filter(function (task) {
    return task.title.toLowerCase().includes(searchText);
  });

  textSearch.forEach(function(card) {
    populateCard(card);
  })
};

function removeCardFilter () {
  newCard.innerHTML = '';
};


function findTargetIndex (e) {
  var targetedCard = e.target.closest('.task-card');
  var targetedId = parseInt(targetedCard.getAttribute('data-id'));
  var targetedIndex = taskArray.findIndex(e => e.id === targetedId);
  return targetedIndex;
}


// function makeItUrgent () {
//   if (!e.target.matches('urgent-button-task icon-button')) return;

// }


function checkOffTheTasks (e) {
  if (!e.target.matches('input')) return;
  var element = e.target;
  var index = element.dataset.index;
  var taskIndex = findTargetIndex(e);
  taskArray[taskIndex].tasks[index].done = !taskArray[taskIndex].tasks[index].done;
  localStorage.setItem('StoredList', JSON.stringify(taskArray))
}


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


function restoreList(e) {
  var getCards = localStorage.getItem('StoredList');
  var parsedCards = JSON.parse(getCards);
  if (parsedCards !== null) {
    parsedCards.forEach(function(list){
  var card = new ToDoList(list.title, list.tasks, list.id, list.urgent);
  taskArray.push(list);
  populateCard(list);
  console.log(list.tasks, list)
  iterateThruTasks(list.tasks, list);
  card.saveToStorage();
    })
  }
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
  tasksAside.innerHTML= "";
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
  tasksAside.innerHTML+=
    `<li class="aside-list-item" data-id="${object.id}">
      <img class="tick" src="images/delete.svg" alt="checkbox">
      <p class="aside-typed-todo">${object.content}</p>
    </li>`
  }
};


function makeLotsOfThings() {
  if (titleInput.value && tasksAside.innerHTML) {
  var card = new ToDoList (titleInput.value, taskList, Date.now());
  taskArray.push(card);
  populateCard(card);
  iterateThruTasks(taskList, card);
  taskList = [];
  unpopulateTask();
  card.saveToStorage();
  clearFields();
  }
};

function populateCard(card) {
  var freshCard = 
      `<article class="task-card" data-id="${card.id}">
    <h3>${card.title}</h3>
    <figure class="card-task-section">
        <ul class="card-task-list">
        </ul>
    </figure>
    <section class="card-bottom">
      <div class="bottom-task-card-left-urgent">
        <img id="urgent-button" class="urgent-button-task icon-button" src="images/urgent.svg" alt="urgent icon">
        <p>URGENT</p>  
        </div>
      <div class="bottom-task-card-right-delete">
        <img src="images/delete.svg" alt="delete button" class="delete-button icon-button">
        <p>DELETE</p>  
      </div>
    </section>
  </article>`
  newCard.insertAdjacentHTML('afterbegin', freshCard);
  };


function iterateThruTasks(theTasks, card) {
  console.log(theTasks, card)
  var dataID = `[data-id = "${card.id}"]`;
  var targetCard = document.querySelector(dataID);  
  console.log(dataID)
  targetCard.childNodes[3].childNodes[1].innerHTML = theTasks.map((task, i)=> {
    return `<li class="list-item">
    <input class="task-to-check-${task.done}" type="checkbox" data-index=${i} id="task${i}" ${task.done ? 'checked' : ""}/>
    <label class="content-to-check-${task.done}" for="task${i}">${task.content}</label>
    </li>`
  }).join("");
}
































