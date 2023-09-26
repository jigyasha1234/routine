const list = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const todoText = document.getElementById("todo-text");
const clearButton =document.querySelector(".clearButton");
const totalTasks = document.querySelector(".total-tasks");

let todos = [];

function saveTodosInMemory() {
  console.log("saving in memory");
  localStorage.setItem("todosInMemory", JSON.stringify(todos));  
}

function renderTodos() {
  // empty HTML inside the list
  list.innerHTML = "";

  // loop over all todos
  todos.forEach((todo) => {
    if (todo.isDeleted === 0) {
      renderTodo(todo);
    }
  });
}

function renderTodo(todo) {
  list.innerHTML += `
        <li style="font-size: 30px">
          <div class="form-check" style="display: flex;">
          <div style="margin: 0px">
            <input onclick="completeTodo(${todo.id});" class="form-check-input" type="checkbox" />
            <label class="form-check-label" for="flexCheckDefault">
              ${todo.text}
            </label>
            </div>            
            <div onclick="deleteTodo(${todo.id});" style='font-size:20px; margin-right: 0px'>&#10006;</div>            
          </div>
        </li>
      `;          
}

function addTodo(todo) {
  todos.push({
    id: todo.id,
    text: todo.text,
    complete: todo.complete,
    isDeleted: todo.isDeleted,
  });
  renderTodo(todo);
  saveTodosInMemory();
}

function completeTodo(removeId) {
  //Find index of specific object using findIndex method.
  todoIndex = todos.findIndex((todo) => todo.id == removeId);

  //Update object's complete property.
  todos[todoIndex].complete = true;  

}

function clearAllTodos() { 

  // deleting all todos
  todos.forEach((todo) => {
    if (todo.isDeleted === 0) {
      todo.isDeleted=1;
    }
  });

  // Just to re render
  saveTodosInMemory();
  renderTodos();
}

function deleteTodo(removeId) {
  //Find index of specific object using findIndex method.
  todoIndex = todos.findIndex((todo) => todo.id == removeId);

  //Update object's isSeleted property.
  todos[todoIndex].isDeleted = 1;  

  // Just to re render
  saveTodosInMemory();
  renderTodos();
}

// listen for form to be submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo({
    id: todos.length + 1,
    text: todoText.value,
    complete: false,
    isDeleted: 0,
  });

  // reset value of input field
  todoText.value = "";
});

// on page load - the following functions will run
todos = JSON.parse(localStorage.getItem("todosInMemory")) || [];
clearButton.innerHTML +=`<button onclick="clearAllTodos();"> Clear All</button>`;   
renderTodos();