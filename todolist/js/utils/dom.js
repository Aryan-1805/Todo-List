export function createElement(tag, className, content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

export function createTodoItem(todo, onToggle, onDelete) {
    const item = createElement('div', 'todo-item');
    
    const checkbox = createElement('div', `todo-checkbox${todo.completed ? ' checked' : ''}`);
    checkbox.addEventListener('click', () => onToggle(todo.id));

    const text = createElement('span', `todo-text${todo.completed ? ' completed' : ''}`, todo.text);

    const deleteBtn = createElement('button', 'todo-delete');
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>';
    deleteBtn.addEventListener('click', () => onDelete(todo.id));

    item.append(checkbox, text, deleteBtn);
    return item;
}