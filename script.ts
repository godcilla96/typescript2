
interface Todo {
    task: string;
    completed: boolean;
    priority: number;
  }
  
  class TodoList {
    private todos: Todo[];
  
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