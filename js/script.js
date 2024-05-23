const taskForm = document.getElementById('taskForm');
const taskName = document.getElementById('taskName');
const taskDate = document.getElementById('taskDate');
const taskPriority = document.getElementById('taskPriority');
const taskList = document.getElementById('taskList');

let tasks = [];

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var request = indexedDB.open("tasks", 1);
var db;
request.onupgradeneeded = function(event) {
    var d = event.target.result;
    var objectStore = d.createObjectStore("variables", { keyPath: "id", autoIncrement:true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("date", "date", { unique: false });
    objectStore.createIndex("priority", "priority", { unique: false });
    objectStore.createIndex("countdown", "countdown", { unique: false });
    objectStore.createIndex("status", "status", { unique: false });
};
request.onsuccess = function() {
    db = request.result;
    console.log("База данных открыта успешно");
    loadTasks();
};
request.onerror = function() {
    console.log("Ошибка при открытии базы данных");
};


taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTask = {
        name: taskName.value,
        date: taskDate.value,
        priority: taskPriority.value,
        countdown: calculateCountdown(taskDate.value),
        status: 'Pending'
    };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskForm.reset();
});

function loadTasks() {
    var transaction = db.transaction(["variables"], "readonly");
    var objectStore = transaction.objectStore("variables");
    var request = objectStore.getAll();
    request.onsuccess = () => {
        tasks = request.result;
        displayTasks();
    };
}

function displayTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        taskList.innerHTML = '<p class="p-3 mb-2 bg-danger text-white">No tasks available</p>';
    } else {
        const table = document.createElement('table');
        table.classList.add("table", "table-striped", "table-bordered", "mt-5", "text-center", "text-break", "align-middle");
        table.innerHTML = `
        <thead>
            <tr>
                <th>Task Name</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Countdown</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        `;
        tasks.forEach((task, index) => {
            row = `
            <td>${task.name}</td>
            <td>${task.date}</td>
            <td>${task.priority}</td>
            <td>${task.countdown}</td>
            <td>${task.status}</td>
            <td><button type="submit" onclick="editTask(${index})" class="btn btn-warning m-2">Edit</button>
            <button type="submit" onclick="deleteTask(${index})" class="btn btn-danger m-2">Delete</button></td>
            `;
            table.innerHTML += row;
        });
        taskList.appendChild(table);
    }
}

function saveTasks() {
    var transaction = db.transaction(["variables"], "readwrite");
    var store = transaction.objectStore("variables");
    store.clear();
    tasks.forEach((task) => {
        const t = {
            name: task.name,
            date: task.date,
            priority: task.priority,
            countdown: task.countdown,
            status: task.status
        };
        store.add(t);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function editTask(index) {
    const newStatus = prompt('Enter new status for the task: ', tasks[index].status);
    if (newStatus) {
        tasks[index].status = newStatus;
        saveTasks();
        displayTasks();
    }
}

function calculateCountdown(date) {
    const now = new Date();
    const dueDate = new Date(date);
    const difference = dueDate.getTime() - now.getTime();
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    return `${daysDifference} days`;
}
