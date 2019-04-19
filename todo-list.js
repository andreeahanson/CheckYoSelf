class ToDoList {
  constructor(title, tasks, id, urgent){
    this.title = title;
    this.tasks = tasks || [];
    this.id = id;
    this.urgent = urgent || false;
    this.done = false;
  }

  saveToStorage(){
    localStorage.setItem('StoredList', JSON.stringify(taskArray))
  }

  deleteFromStorage(index) {
    taskArray.splice(index, 1);
}

  updateTask (state){
    this.done = state;
  }

  updateToDo () {
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
  }
}
