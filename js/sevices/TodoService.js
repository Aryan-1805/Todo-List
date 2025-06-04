export class TodoService {
    constructor() {
        this.STORAGE_KEY = 'todos';
    }

    getTodos() {
        const todos = localStorage.getItem(this.STORAGE_KEY);
        return todos ? JSON.parse(todos) : [];
    }

    saveTodos(todos) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    }
}
