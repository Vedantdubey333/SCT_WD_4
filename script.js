document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const taskInput = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const todoList = document.getElementById('todo-list');

  function createTaskElement(task, date, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    const left = document.createElement('div');
    left.className = 'left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed');
    });

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task;

    left.appendChild(checkbox);
    left.appendChild(text);

    if (date) {
      const dateSpan = document.createElement('span');
      dateSpan.className = 'task-date';
      dateSpan.textContent = `⏰ ${new Date(date).toLocaleString()}`;
      left.appendChild(dateSpan);
    }

    const right = document.createElement('div');
    right.className = 'right';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(li, text, date ? left.querySelector('.task-date') : null));
    right.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => li.remove());
    right.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(right);
    return li;
  }

  function editTask(li, textElem, dateElem) {
    const newText = prompt('Edit your task:', textElem.textContent);
    if (newText !== null && newText.trim() !== '') {
      textElem.textContent = newText.trim();
    }
    if (dateElem) {
      const currentDate = dateElem.textContent.replace('⏰ ', '');
      const newDate = prompt('Edit date & time (e.g., 2025-10-06T10:30):', currentDate);
      if (newDate) {
        dateElem.textContent = `⏰ ${new Date(newDate).toLocaleString()}`;
      }
    }
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const task = taskInput.value;
    const date = taskDate.value;
    if (task.trim() === '') return;
    const li = createTaskElement(task, date);
    todoList.appendChild(li);
    form.reset();
  });
});