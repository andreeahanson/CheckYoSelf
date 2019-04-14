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



}


class Items {
  constructor(content, id) {
    this.content = content;
    this.done = false;
    this.id = Date.now();
  }
}
