// Selectors
const $ = document;
const todoInput = $.querySelector('.todo-input');
const todoButton = $.querySelector('.todo-button');
const todoList = $.querySelector('.todo-list');
const filterOption = $.querySelector('.todo-filter');

// Event Listeners
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click' , deleteCheck);
filterOption.addEventListener('click' , filterTodo);
$.addEventListener('DOMContentLoaded' , getTodos);

//Functions
function addTodo(event){
    // Prevent from submiting
    event.preventDefault();
    // Check Input Value
    if(todoInput.value === ''){
        alert("You did'nt enter any names for your TODO!")
    }else{    
    // Div
    const todoDiv = $.createElement('div');
    todoDiv.classList.add('todo');
    // Li
    const newTodo = $.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD todo to LocalStorage
    saveLocalTodos(todoInput.value);
    // Check Button
    const checkedButton = $.createElement('button');
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add('complete-button');
    todoDiv.appendChild(checkedButton);
    // Trash Button
    const trashButton = $.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);
    // Append List
    todoList.appendChild(todoDiv);
    }
    // Clear Input
    todoInput.value = '';
};

function deleteCheck(e){
    const itemTarget = e.target;
    // Delete Item
    if(itemTarget.classList[0] === 'trash-button'){
        const todo = itemTarget.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend' , function(){
            todo.remove();
        });
    }
    // Complete Item
    if(itemTarget.classList[0] === 'complete-button'){
        const todo = itemTarget.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
                case 'uncompleted':
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    } else{
                        todo.style.display = 'none';
                    }
        }
    });
}

function saveLocalTodos(todo){
    // CHECK TODO
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos));
}

function getTodos(){
    // CHECK TODO
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    // Div
    const todoDiv = $.createElement('div');
    todoDiv.classList.add('todo');
    // Li
    const newTodo = $.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Check Button
    const checkedButton = $.createElement('button');
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add('complete-button');
    todoDiv.appendChild(checkedButton);
    // Trash Button
    const trashButton = $.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);
    // Append List
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    // CHECK TODO
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) , 1);
    localStorage.setItem('todos' , JSON.stringify(todos));
}