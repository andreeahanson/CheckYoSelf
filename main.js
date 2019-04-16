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
var searchInput = document.querySelector('.search-input')
var titleInput = document.querySelector('#todo-title-input');
var newCard = document.querySelector('.task-field');
var cardTaskList = document.querySelector('.card-task-list');
var greetingMessage = document.querySelector('.greeting');


plusButton.addEventListener('click', instantiateSmallListItems);
makeTaskListButton.addEventListener('click', makeLotsOfThings);
makeTaskListButton.addEventListener('click', greeting);
tasksAside.addEventListener('click', blockAddTask);
window.addEventListener('load', greeting);
window.addEventListener('load', restoreList);
newCard.addEventListener('click', deleteCardFromDOM)
newCard.addEventListener('click', greeting);
clearAllButton.addEventListener('click', clearAside);
newCard.addEventListener('click', checkOffTheTasks);
searchButton.addEventListener('click', searchFilter);
searchInput.addEventListener('keyup', searchFilter);




function findTargetIndex (e) {
  var targetedCard = e.target.closest('.task-card');
  var targetedId = parseInt(targetedCard.getAttribute('data-id'));
  var targetedIndex = taskArray.findIndex(e => e.id === targetedId);
  return targetedIndex;
}


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
    greeting();
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
  iterateThruTasks(list.tasks, list);
  card.saveToStorage();
  greeting();
    })
  }

  // taskArray = taskArray.map(function(oldList) {
  //   var restoredList = new ToDoList(oldList.title, oldList.tasks, oldList.id, oldList.urgent);
  //   populateCard(restoredList);
  //   return restoredList;
  // });
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

// function createToDoCard() {
//   var card = new ToDoList (titleInput.value, taskList, Date.now());
//   taskArray.push(card);
//   card.saveToStorage(taskArray);
//   populateCard(card);
//   iterateThruTasks(taskList, card);
//   return card;
// };


function makeLotsOfThings() {
  if (titleInput.value && taskList.length) {
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
      `<article class="task-card" id="lolo" data-id="${card.id}">
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
  // console.log(dataID)
  targetCard.childNodes[3].childNodes[1].innerHTML = theTasks.map((task, i)=> {
    return `<li class="list-item">
    <input class="task-to-check-${task.done}" type="checkbox" data-index=${i} id="task${i}" ${task.done ? 'checked' : ""}/>
    <label class="content-to-check-${task.done}" for="task${i}">${task.content}</label>
    </li>`
  }).join("");

}






function greeting(event){
 var elements = newCard.querySelectorAll('.task-card')
 // console.log(elements)
 if(!elements.length){
 greetingMessage.removeAttribute('hidden', true)
 } else if(elements.length) {
  greetingMessage.setAttribute('hidden', true)
 }
};









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






// newCard.addEventListener('click', makeCardYellow) 

// function makeCardYellow (e) {
//   e.preventDefault();
//   var cardToYellow = document.getElementById('lolo');
//   var theUrgentButton = document.getElementById('urgent-button');

//   if (e.target.matches('#urgent-button')) {
//   taskArray.urgent = !taskArray.urgent;


  
//   cardToYellow.classList.toggle('yellow');

//   theUrgentButton.classList.toggle('hey');

//   // localStorage.setItem('StoredList', JSON.stringify(taskArray))
  
// }

// }











// URGENT BUTTON FUNCTION - NOT WORKING YET

newCard.addEventListener('click', cardUrgent)




function cardUrgent (e) {
  if (e.target.className === 'urgent-button-task icon-button') {
    var card = e.target.closest('.task-card');
    console.log(card)
    var index = findCardIndex(card);
    console.log('index', index)
    console.log(taskArray[index].title)
    var cardToMakeUrgent = new ToDoList(taskArray[index].title, taskArray[index].tasks, taskArray[index].id, taskArray[index].urgent ); 
  cardToMakeUrgent.updateToDo();

  taskArray.splice(index, 1, cardToMakeUrgent)
  cardToMakeUrgent.saveToStorage();
  // cardToMakeUrgent.innerHTML = '';
}
}


function findCardIndex(card) {
  var cardId = card.dataset.id;
  return taskArray.findIndex(function(item) {
    // console.log(item.id)
    // console.log(cardId)
    return item.id == cardId;
  });
}


function saveUrgency(e, urgent) {
  taskArray.forEach(function(theList, index){
  var myCardList = reinstantiateCards(index);
  var cardId = parseInt(e.target.parentNode.parentNode.parentNode.dataset.id);
  if (cardId === theList.id) {
    myCardList.updateList(taskArray, index, urgent);
  }
  })
}

function reinstantiateCards(i) {
  return new ToDoList (taskArray[i].title, taskArray[i].tasks, taskArray[i].id, taskArray[i].urgent);
}











