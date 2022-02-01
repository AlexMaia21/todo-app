const inputCreateNewTodo = document.querySelector('.container__input-create-todo--create');
const iconCreateTodo = document.querySelector('.container__icon-create-todo');
const containerTodos = document.querySelector('.container__todos');

let contLabelFor = 0;

function createTodoAndCreateListeners() {
    if (inputCreateNewTodo.value.length) {
        const valueInputCreate = inputCreateNewTodo.value.trim();
        const liTemplate = `
        <div style="display: flex; align-items: center;">
            <label class="todos__checkbox--check" for="todo__input-checkbox-${contLabelFor}">
                <input type="checkbox" id="todo__input-checkbox-${contLabelFor}">
                <span class="checkmark">
                    <img src="./images/icon-check.svg" alt="icon-checkbox">
                </span>
            </label>
            <span class="todos__todo-text">${valueInputCreate}</span>
        </div>
        <span class="todos__icon-delete-todo--delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </span>
        `;
        liElement = document.createElement('li');
        liElement.innerHTML = liTemplate;
        liElement.classList.add('todos__todo');
        liElement.addEventListener('click', deleteTodo);
        liElement.addEventListener('click', completeTodo);

        containerTodos.appendChild(liElement);

        inputCreateNewTodo.value = '';
        contLabelFor++;
        updateLengthTodo();
    }
}

iconCreateTodo.addEventListener('click', createTodoAndCreateListeners);

function deleteTodo(event) {
    // BTN DELETE TODO REFERENCE
    if (event.target === event.currentTarget.lastElementChild.children[0]) {
        event.currentTarget.remove();
        updateLengthTodo();
    }
}

function completeTodo(event) {
    // BTN COMPLETE TODO REFERENCE
    if (event.target.id.search(/todo__input-checkbox/i) === 0) {
        let hasClasseComplete = false;
        event.currentTarget.classList.forEach(className => {
            hasClasseComplete = true ? className === 'completed' : false;
        })

        if (hasClasseComplete) {
            event.currentTarget.classList.remove('completed')
        } else {
            event.currentTarget.classList.add('completed');
        }
        updateLengthTodo();
    }
}

function updateLengthTodo() {
    const todoLenghtInfo = document.querySelector('.controls__todo-length-info');
    const todoCompleted = document.querySelectorAll('.todos__todo.completed');
    todoLenghtInfo.innerText = `${containerTodos.childElementCount - todoCompleted.length} items left`;
}

updateLengthTodo();

// BTNS CONTROL
const showAllTodos = document.querySelector('.filters__show-all-todo');
const showTodosActive = document.querySelector('.filters__show-todo-active');
const showTodoCompleted = document.querySelector('.filters__show-todo-completed');
const clearCompleted = document.querySelector('.controls__clear-completed');

const controlsFilters = document.querySelectorAll('.controls__filters li');
controlsFilters[0].style.color = 'hsl(220, 98%, 61%)';

showAllTodos.addEventListener('click', (event) => {
    defineColor(event);
    const todos = document.querySelectorAll('.todos__todo');

    if (todos) {
        todos.forEach(todo => {
            todo.classList.remove('hide-todo')
        });
    }
});
showTodosActive.addEventListener('click', (event) => {
    defineColor(event);
    // SHOW TODO NOT COMPLETED AND HIDE TODO COMPLETED
    const todos = document.querySelectorAll('.todos__todo');
    const todoCompleted = document.querySelectorAll('.todos__todo.completed');

    if (todoCompleted) {
        todos.forEach(todo => {
            todo.classList.remove('hide-todo');
        });
        todoCompleted.forEach(todo => {
            todo.classList.add('hide-todo');
        });
    }
});
showTodoCompleted.addEventListener('click', (event) => {
    defineColor(event);
    // HIDE ALL TODOS AND SHOW ONLY TODO COMPLETED
    const todos = document.querySelectorAll('.todos__todo');
    const todoCompleted = document.querySelectorAll('.todos__todo.completed');

    if (todoCompleted) {
        todos.forEach(todo => {
            todo.classList.add('hide-todo');
        });
        todoCompleted.forEach(todo => {
            todo.classList.remove('hide-todo');
        });
    }
});
clearCompleted.addEventListener('click', () => {
    const todoCompleted = document.querySelectorAll('.todos__todo.completed');

    if (todoCompleted) {
        todoCompleted.forEach(todo => {
            todo.remove();
        });
        updateLengthTodo();
    }
});

function defineColor(event) {
    controlsFilters.forEach(c => c.style.color = '');
    event.currentTarget.style.color = 'hsl(220, 98%, 61%)';
}

const btnDarkMode = document.querySelector('.container__dark-mode--dark');
btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('class-dark-mode');
})