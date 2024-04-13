//skapa interface
interface Todo {
    task: string;
    completed: boolean;
    priority: number;
  }
  
  class TodoList {
    private todos: Todo[];
    //constructor som initierar todos-arrayen
    constructor() {
      this.todos = this.loadFromLocalStorage();
    }
  
    addTodo(task: string, priority: number): boolean {
      if (!task || priority < 1 || priority > 3) {
        console.error("Felaktiga värden för uppgift eller prioritet.");
        return false;
      }
  
      const newTodo: Todo = {
        task,
        completed: false,
        priority,
      };
  
      this.todos.push(newTodo);
      this.saveToLocalStorage();
      return true;
    }
  
    markTodoCompleted(todoIndex: number): void {
      if (todoIndex >= 0 && todoIndex < this.todos.length) {
        this.todos[todoIndex].completed = true;
        this.saveToLocalStorage();
      }
    }
  
    getTodos(): Todo[] {
      return this.todos;
    }
  
    saveToLocalStorage(): void {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  
    loadFromLocalStorage(): Todo[] {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("add-todo-form") as HTMLFormElement;
    const todoList = document.getElementById("todos") as HTMLUListElement;

    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskInput = document.getElementById("task") as HTMLInputElement;
        const priorityInput = document.getElementById("priority") as HTMLSelectElement;

        const task = taskInput.value;
        const priority = parseInt(priorityInput.value); //konvertera prioritet till en siffra

        //lägg till uppgiften i listan
        addTodo(task, priority);

        //återställ formuläret
        taskInput.value = "";
        priorityInput.value = "1";
    });

    function addTodo(task: string, priority: number) {
      //skapa ett nytt todo-element
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");

      //skapa en checkbox för att markera som klar
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.classList.add("checkbox");
      checkBox.addEventListener("change", function () {
          //markera uppgiften som klar när kryssrutan är markerad
          if (checkBox.checked) {
              todoItem.classList.add("completed");
          } else {
              todoItem.classList.remove("completed");
          }
      });

      //skapa textnoden för uppgiften
      const taskText = document.createTextNode(`${task} (Prioritet: ${priority})`);

      //lägg till checkbox och uppgiftstexten i todo-elementet
      todoItem.appendChild(checkBox);
      todoItem.appendChild(taskText);

      //lägg till todo-elementet i listan
      todoList.appendChild(todoItem);
  }
});