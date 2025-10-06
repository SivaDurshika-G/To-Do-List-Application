const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const li = document.createElement('li');
  li.textContent = taskText;

  const delBtn = document.createElement('button');
  delBtn.textContent = "Delete";
  delBtn.classList.add('delete-btn');
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.classList.add('delete-btn');
    delBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.onclick = () => {
      li.classList.toggle('completed');
      saveTasks();
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}