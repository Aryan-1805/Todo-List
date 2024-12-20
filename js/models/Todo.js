export class Todo {
    constructor(text) {
        this.id = crypto.randomUUID();
        this.text = text;
        this.completed = false;
        this.createdAt = Date.now();
    }

    toggle() {
        this.completed = !this.completed;
    }
}