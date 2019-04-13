class ToDoList {
  constructor(id, title, urgent, tasks){
    this.id = Date.now();
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = tasks || [];

  }
}