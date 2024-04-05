// Steg 2: Implementera Todo-klassen
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = this.loadFromLocalStorage();
    }
    // Metod för att lägga till nya todos
    TodoList.prototype.addTodo = function (task, priority) {
        // Kontrollera om uppgift och prioritet är korrekta
        if (!task || priority < 1 || priority > 3) {
            console.error("Felaktiga värden för uppgift eller prioritet.");
            return false;
        }
        var newTodo = {
            task: task,
            completed: false,
            priority: priority,
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    };
    // Metod för att markera todos som klara
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    };
    // Metod för att hämta hela listan av todos
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    // Metod för att spara todos till LocalStorage
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    };
    // Metod för att hämta todos från LocalStorage
    TodoList.prototype.loadFromLocalStorage = function () {
        var storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    };
    return TodoList;
}());
