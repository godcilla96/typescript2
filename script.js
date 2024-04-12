var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = this.loadFromLocalStorage();
    }
    TodoList.prototype.addTodo = function (task, priority) {
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
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    };
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    };
    TodoList.prototype.loadFromLocalStorage = function () {
        var storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    };
    return TodoList;
}());
document.addEventListener("DOMContentLoaded", function () {
    var todoForm = document.getElementById("add-todo-form");
    var todoList = document.getElementById("todos");
    todoForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Förhindra standardbeteendet för formuläret
        var taskInput = document.getElementById("task");
        var priorityInput = document.getElementById("priority");
        var task = taskInput.value;
        var priority = parseInt(priorityInput.value); // Konvertera prioritet till en siffra
        // Lägg till uppgiften i listan
        addTodo(task, priority);
        // Återställ formuläret
        taskInput.value = "";
        priorityInput.value = "1";
    });
    function addTodo(task, priority) {
        // Skapa ett nytt todo-element
        var todoItem = document.createElement("li");
        todoItem.textContent = "".concat(task, " (Prioritet: ").concat(priority, ")");
        // Lägg till todo-elementet i listan
        todoList.appendChild(todoItem);
    }
});
