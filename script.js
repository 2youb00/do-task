document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addTodoBtn = document.getElementById('add-todo');
    const newTodoContainer = document.getElementById('new-todo-container');
    const newTodoInput = document.getElementById('new-todo-input');
    const submitNewTodoBtn = document.getElementById('submit-new-todo');

    let todos = JSON.parse(localStorage.getItem('todos')) || [
        {text: "للتفكير للملقد", completed: true},
        {text: "للمعايرة", completed: true},
        {text: "للاعلام", completed: true},
        {text: "للمشاركة المجتمعية", completed: true},
        {text: "للمجتمع السوري", completed: true},
        {text: "للتطور الاجتماعي والثقافي", completed: true},
        {text: "للادارة المحلية", completed: true},
        {text: "للهوية الوطنية", completed: true}
    ];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="checkbox ${todo.completed ? 'checked' : ''}"></div>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn">×</button>
                <div class="reorder">
                    <button class="reorder-btn" data-action="up">▲</button>
                    <button class="reorder-btn" data-action="down">▼</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const todoText = newTodoInput.value.trim();
        if (todoText) {
            todos.push({text: todoText, completed: false});
            saveTodos();
            renderTodos();
            newTodoInput.value = '';
            newTodoContainer.classList.add('hidden');
        }
    }

    function reorderTodo(index, direction) {
        if (direction === 'up' && index > 0) {
            [todos[index], todos[index - 1]] = [todos[index - 1], todos[index]];
        } else if (direction === 'down' && index < todos.length - 1) {
            [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];
        }
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    todoList.addEventListener('click', (e) => {
        const li = e.target.closest('.todo-item');
        const index = Array.from(todoList.children).indexOf(li);

        if (e.target.classList.contains('reorder-btn')) {
            reorderTodo(index, e.target.dataset.action);
        } else if (e.target.classList.contains('checkbox')) {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        } else if (e.target.classList.contains('delete-btn')) {
            deleteTodo(index);
        }
    });

    addTodoBtn.addEventListener('click', () => {
        newTodoContainer.classList.toggle('hidden');
        newTodoInput.focus();
    });

    submitNewTodoBtn.addEventListener('click', addTodo);

    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    renderTodos();
});