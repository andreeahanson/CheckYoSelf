class ToDoList {
  constructor(title, tasks, id, urgent){
    this.title = title;
    this.tasks = tasks || [];
    this.id = id;
    this.urgent = urgent || false;
    this.done = false;
    this.urgentImg;
    this.urgent ? this.urgentImg = 'images/urgent-active.svg' : this.urgentImg = 'images/urgent.svg';
  }

  saveToStorage(){
    localStorage.setItem('StoredList', JSON.stringify(taskArray))
  }

  deleteFromStorage(targetId) {
    var parsedItems = JSON.parse(localStorage.getItem('StoredList'));
    var itemIndex = parsedItems.findIndex(function(task) {
    return task.id === targetId;
  });
  parsedItems.splice(itemIndex, 1);
  localStorage.setItem('StoredList', JSON.stringify(parsedItems));
  };

  updateTask (state){
    this.done = state;
  }

  updateToDo () {
    // console.log(this.urgent)
    this.urgent = !this.urgent;
    console.log(this.urgent)
  }

  updateList(taskArray, index, urgent) {
    urgent ? taskArray[index].urgent = true : taskArray[index].urgent = false;
    this.saveToStorage(taskArray)
  }


}


class Items {
  constructor(content, id) {
    this.content = content;
    this.done = false;
    this.id = Date.now();

    this.doneImg;
    this.done ? this.doneImg = 'images/checkbox-active.svg' : this.doneImg = 'images/checkbox.svg';
  }
}
