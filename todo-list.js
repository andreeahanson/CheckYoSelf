class ToDoList {
  constructor(title, tasks, id){
    this.id = Date.now();
    this.title = title;
    this.urgent = false;
    this.tasks = tasks || [];
  }

  saveToStorage(){
    // var stringifiedNewTask = JSON.stringify('tasksSaved');
    // console.log(tasksSaved)
    // localStorage.setItem('tasksSaved', stringifiedNewTask);
  }



}


class Items {
  constructor(content, id) {
    this.content = content;
    this.done = false;
    this.id = Date.now();
  }
}
