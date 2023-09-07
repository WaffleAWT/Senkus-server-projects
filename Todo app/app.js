document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.querySelector(".add-button");
    const inputTask = document.querySelector(".task-input");
    const descriptionInput = document.querySelector(".description-input");
    const taskList = document.querySelector(".task-list");

    addButton.addEventListener("click", addTask);
    inputTask.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    taskList.addEventListener("click", handleTaskListClick);

    loadTasksFromLocalStorage();

    function loadTasksFromLocalStorage() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

        savedTasks.forEach(task => {
            const listItem = createListItem(task.text, task.description, task.completed);
            taskList.appendChild(listItem);
        });

        applyCompletedStyles();
    }

    function applyCompletedStyles() {
        const checkboxes = taskList.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(checkbox => {
            const listItem = checkbox.closest("li");
            listItem.classList.toggle("completed", checkbox.checked);
        });
    }

    function addTask() {
        const taskText = inputTask.value.trim();
        const taskDescription = descriptionInput.value.trim();
        if (taskText !== "") {
            const listItem = createListItem(taskText, taskDescription, false);
            taskList.appendChild(listItem);
            inputTask.value = "";
            descriptionInput.value = "";

            saveTaskToLocalStorage(taskText, taskDescription, false);
        }
    }

    function createListItem(taskText, taskDescription, completed) {
        const listItem = document.createElement("li");
        
        const maxCharactersPerLine = 45;
        const lines = [];
        for (let i = 0; i < taskDescription.length; i += maxCharactersPerLine) {
            lines.push(taskDescription.substr(i, maxCharactersPerLine));
        }
    
        const descriptionHTML = lines.join("<br>");
        
        listItem.innerHTML = `
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <div class="task-details">
                <span>${taskText}</span>
                <p class="task-description">${descriptionHTML}</p>
            </div>
            <button class="delete-button">Delete</button>
        `;
    
        return listItem;
    }    

    function handleTaskListClick(event) {
        const target = event.target;

        if (target.classList.contains("delete-button")) {
            deleteTask(target);
        } else if (target.type === "checkbox") {
            toggleCompleted(target);
        }
    }

    function deleteTask(target) {
        const listItem = target.closest("li");
        const taskText = listItem.querySelector("span").textContent;
        listItem.remove();

        removeTaskFromLocalStorage(taskText);
    }

    function toggleCompleted(checkbox) {
        const listItem = checkbox.closest("li");
        listItem.classList.toggle("completed", checkbox.checked);

        const taskText = listItem.querySelector("span").textContent;
        updateTaskInLocalStorage(taskText, taskText, checkbox.checked);
    }

    function updateTaskInLocalStorage(oldText, newText, completed) {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        const taskIndex = savedTasks.findIndex(task => task.text === oldText);
        if (taskIndex !== -1) {
            savedTasks[taskIndex].text = newText;
            savedTasks[taskIndex].completed = completed;
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
        }
    }

    function saveTaskToLocalStorage(taskText, taskDescription, completed) {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push({ text: taskText, description: taskDescription, completed });
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    function removeTaskFromLocalStorage(taskText) {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = savedTasks.filter(task => task.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
});
