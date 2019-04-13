class ToDoList {
  constructor (id, title, tasks, urgent) {
    this.id = Date.now();
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }
  saveToStorage();
  deleteFromStorage();
  updateToDO();
  updateTask();
}