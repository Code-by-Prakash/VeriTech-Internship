document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach(item => {
            tasks.push({
                text: item.querySelector(".task-text").innerText,
                completed: item.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTaskToDOM(text, completed = false) {
        const taskItem = document.createElement("li");
        taskItem.className = `list-group-item d-flex justify-content-between align-items-center task-item ${completed ? 'completed' : ''}`;

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.innerText = text;
        taskItem.appendChild(taskText);

        const taskStatus = document.createElement("select");
        taskStatus.className = "form-control form-control-sm ml-2 status-select";
        const optionPending = document.createElement("option");
        optionPending.value = "pending";
        optionPending.innerText = "Pending";
        const optionCompleted = document.createElement("option");
        optionCompleted.value = "completed";
        optionCompleted.innerText = "Completed";
        taskStatus.appendChild(optionPending);
        taskStatus.appendChild(optionCompleted);
        taskStatus.value = completed ? "completed" : "pending";
        taskStatus.addEventListener("change", () => {
            if (taskStatus.value === "completed") {
                taskItem.classList.add("completed");
            } else {
                taskItem.classList.remove("completed");
            }
            saveTasks();
        });
        taskItem.appendChild(taskStatus);

        const taskButtons = document.createElement("div");
        taskButtons.className = "task-buttons btn-group";

        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm";
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            const newText = prompt("Edit Task", taskText.innerText);
            if (newText) {
                taskText.innerText = newText;
                saveTasks();
            }
        });
        taskButtons.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });
        taskButtons.appendChild(deleteButton);

        taskItem.appendChild(taskButtons);
        taskList.appendChild(taskItem);
        saveTasks();
    }

    addTaskButton.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (text) {
            addTaskToDOM(text);
            taskInput.value = "";
        }
    });

    loadTasks();
});
