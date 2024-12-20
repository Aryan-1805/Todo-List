import { Todo } from './models/todo.js';
import { TodoService } from './services/TodoService.js';
import { createTodoItem } from '/Users/aryanbhutyal/Desktop/Program/c++/todolist/js/utils/Dom.js';

class TodoApp {
    constructor() {
        this.todoService = new TodoService();
        this.todos = this.todoService.getTodos();
        this.currentFilter = 'all';
        
        this.initElements();
        this.initEventListeners();
        this.render();
    }

    initElements() {
        this.form = document.getElementById('todoForm');
        this.input = document.getElementById('todoInput');
        this.list = document.getElementById('todoList');
        this.filters = document.getElementById('todoFilters');
        this.stats = document.getElementById('todoStats');
    }

    initEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        this.filters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.setFilter(e.target.dataset.filter);
            }
        });
    }

    addTodo() {
        const text = this.input.value.trim();
        if (text) {
            const todo = new Todo(text);
            this.todos.unshift(todo);
            this.saveTodos();
            this.input.value = '';
            this.render();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.toggle();
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filters.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        this.stats.textContent = `${total} total tasks • ${completed} completed`;
    }

    saveTodos() {
        this.todoService.saveTodos(this.todos);
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        
        this.list.innerHTML = '';
        if (filteredTodos.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'text-center py-8 text-gray-500';
            emptyMessage.textContent = 'No tasks found. Add some tasks to get started!';
            this.list.appendChild(emptyMessage);
        } else {
            filteredTodos.forEach(todo => {
                const todoElement = createTodoItem(
                    todo,
                    (id) => this.toggleTodo(id),
                    (id) => this.deleteTodo(id)
                );
                this.list.appendChild(todoElement);
            });
        }
        
        this.updateStats();
    }
}

// Initialize the app
new TodoApp();