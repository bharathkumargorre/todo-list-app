const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");

// Load saved tasks
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTask(task.text, task.completed);
    });

    updateCount();
};

function saveTasks() {
    const tasks = [];

    document.querySelectorAll(".task-item").forEach(item => {
        tasks.push({
            text: item.querySelector(".task-text").textContent,
            completed: item.querySelector(".task-text")
                .classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
    totalTasks.textContent =
        document.querySelectorAll(".task-item").length;
}

function createTask(taskText, completed = false) {

    const li = document.createElement("li");
    li.classList.add("task-item");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");

    if (completed) {
        span.classList.add("completed");
    }

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateCount();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    updateCount();
    saveTasks();
}

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(taskText);

    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});