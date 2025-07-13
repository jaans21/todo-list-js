// Simple Responsive To-Do List
// HTML structure
document.body.innerHTML = `
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f4f6fb;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .todo-container {
      background: #fff;
      margin-top: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      padding: 32px 24px 24px 24px;
      width: 100%;
      max-width: 400px;
      min-width: 280px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .todo-title {
      font-size: 2rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 8px;
      text-align: center;
    }
    .todo-form {
      display: flex;
      gap: 8px;
    }
    .todo-input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 1rem;
      outline: none;
      transition: border 0.2s;
    }
    .todo-input:focus {
      border: 1.5px solid #3182ce;
    }
    .todo-add-btn {
      background: #3182ce;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 0 18px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .todo-add-btn:hover {
      background: #2563eb;
    }
    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .todo-item {
      display: flex;
      align-items: center;
      background: #f7fafc;
      border-radius: 6px;
      padding: 10px 12px;
      transition: background 0.2s;
    }
    .todo-item.completed {
      text-decoration: line-through;
      color: #a0aec0;
      background: #e2e8f0;
    }
    .todo-checkbox {
      margin-right: 12px;
      accent-color: #3182ce;
      width: 18px;
      height: 18px;
    }
    .todo-delete-btn {
      margin-left: auto;
      background: none;
      border: none;
      color: #e53e3e;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 2px 8px;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .todo-delete-btn:hover {
      background: #ffe5e5;
    }
    @media (max-width: 500px) {
      .todo-container {
        padding: 18px 6px 16px 6px;
        max-width: 98vw;
      }
      .todo-title {
        font-size: 1.3rem;
      }
    }
  </style>
  <div class="todo-container">
    <div class="todo-title">To-Do List</div>
    <form class="todo-form">
      <input class="todo-input" type="text" placeholder="Add a new task..." maxlength="60" required />
      <button class="todo-add-btn" type="submit">+</button>
    </form>
    <ul class="todo-list"></ul>
  </div>
`;

// JS logic
const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const list = document.querySelector('.todo-list');

function renderTodos() {
  list.innerHTML = '';
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', () => {
      todos[idx].completed = !todos[idx].completed;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.style.flex = '1';

    const delBtn = document.createElement('button');
    delBtn.className = 'todo-delete-btn';
    delBtn.innerHTML = '&times;';
    delBtn.title = 'Delete';
    delBtn.addEventListener('click', () => {
      todos.splice(idx, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.push({ text, completed: false });
  localStorage.setItem('todos', JSON.stringify(todos));
  input.value = '';
  renderTodos();
});

// Initial render
renderTodos();
