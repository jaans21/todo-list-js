// Simple Responsive To-Do List with Dark Mode
// HTML structure
document.body.innerHTML = `
  <style>
    :root {
      --bg-color: #f4f6fb;
      --container-bg: #fff;
      --text-color: #2d3748;
      --text-muted: #a0aec0;
      --border-color: #e2e8f0;
      --item-bg: #f7fafc;
      --item-completed-bg: #e2e8f0;
      --primary-color: #3182ce;
      --primary-hover: #2563eb;
      --delete-color: #e53e3e;
      --delete-hover-bg: #ffe5e5;
    }

    [data-theme="dark"] {
      --bg-color: #1a202c;
      --container-bg: #2d3748;
      --text-color: #f7fafc;
      --text-muted: #718096;
      --border-color: #4a5568;
      --item-bg: #4a5568;
      --item-completed-bg: #2d3748;
      --primary-color: #63b3ed;
      --primary-hover: #4299e1;
      --delete-color: #fc8181;
      --delete-hover-bg: #553c3c;
    }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: var(--bg-color);
      color: var(--text-color);
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .todo-container {
      background: var(--container-bg);
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
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    [data-theme="dark"] .todo-container {
      box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    }

    .todo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .todo-title {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-color);
      margin: 0;
      transition: color 0.3s ease;
    }

    .theme-toggle {
      background: none;
      border: 2px solid var(--border-color);
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 1rem;
      color: var(--text-color);
      transition: all 0.3s ease;
    }

    .theme-toggle:hover {
      background: var(--item-bg);
      transform: scale(1.05);
    }
    .todo-form {
      display: flex;
      gap: 8px;
    }
    .todo-input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 1rem;
      outline: none;
      background: var(--container-bg);
      color: var(--text-color);
      transition: all 0.3s ease;
    }
    .todo-input:focus {
      border: 1.5px solid var(--primary-color);
    }
    .todo-add-btn {
      background: var(--primary-color);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 0 18px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .todo-add-btn:hover {
      background: var(--primary-hover);
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
      background: var(--item-bg);
      border-radius: 6px;
      padding: 10px 12px;
      transition: all 0.3s ease;
    }
    .todo-item.completed {
      text-decoration: line-through;
      color: var(--text-muted);
      background: var(--item-completed-bg);
    }
    .todo-checkbox {
      margin-right: 12px;
      accent-color: var(--primary-color);
      width: 18px;
      height: 18px;
    }
    .todo-delete-btn {
      margin-left: auto;
      background: none;
      border: none;
      color: var(--delete-color);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 2px 8px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    .todo-delete-btn:hover {
      background: var(--delete-hover-bg);
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
    <div class="todo-header">
      <div class="todo-title">To-Do List</div>
      <button class="theme-toggle" title="Toggle Dark Mode">🌙</button>
    </div>
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
const themeToggle = document.querySelector('.theme-toggle');

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

themeToggle.addEventListener('click', toggleTheme);

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

// Initialize theme and render
initTheme();
renderTodos();
