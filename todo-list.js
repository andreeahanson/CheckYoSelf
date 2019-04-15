class ToDoList {
  constructor(title, tasks, id, urgent){
    this.id = Date.now();
    this.title = title;
    this.urgent = false;
    this.tasks = tasks || [];
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

  updateTask (){
    this.done = !this.done;
  }



}


class Items {
  constructor(content, id) {
    this.content = content;
    this.done = false;
    this.id = Date.now();
  }
}
