import { Task, TaskManager } from './taskManager.js';
import { fetchTasks } from './api.js';

const manager = new TaskManager();

const loadTasksBtn = document.getElementById('loadTasksBtn');
const statusMessage = document.getElementById('statusMessage');
const taskListContainer = document.getElementById('taskList');

loadTasksBtn.addEventListener('click', handleLoadTasks);

async function handleLoadTasks() {
    statusMessage.textContent = "Loading tasks...";
    statusMessage.style.color = "#666";
    taskListContainer.innerHTML = "";

    try {
        const rawData = await fetchTasks();

        const jsonString = JSON.stringify(rawData);
        const parsedData = JSON.parse(jsonString);

        const taskInstances = parsedData.map(item => new Task(item.id, item.title, item.completed));

        manager.setTasks(taskInstances);

        renderTasks();
        statusMessage.textContent = "";
    } catch (error) {
        statusMessage.textContent = "Failed to load tasks. Please try again.";
        statusMessage.style.color = "red";
    }
}

function renderTasks() {
    taskListContainer.innerHTML = "";

    manager.tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task ${task.completed ? 'completed' : ''}`;

        const titleSpan = document.createElement('span');
        titleSpan.className = 'task-title';
        titleSpan.textContent = task.title;

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn-toggle';
        toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
        toggleBtn.addEventListener('click', () => {
            manager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            manager.removeTask(task.id);
            renderTasks();
        });

        taskDiv.appendChild(titleSpan);
        taskDiv.appendChild(toggleBtn);
        taskDiv.appendChild(deleteBtn);

        taskListContainer.appendChild(taskDiv);
    });
}
