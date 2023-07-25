// タスクの一覧を保持する
let tasks = [];

// ページロード時にローカルストレージからタスクを取得
window.onload = function () {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        displayTasks();
    }
};

// タスクを追加する関数
function addTask() {
    const taskInput = document.getElementById("newTaskInput");
    const newTask = taskInput.value.trim(); // 余分な空白を削除

    if (newTask === "") {
        alert("タスクを入力してください。");
        return;
    }

    tasks.push({ task: newTask, completed: false });
    taskInput.value = ""; // 入力フィールドをクリア
    displayTasks();
    saveTasksToLocalStorage();
}

// タスクを表示する関数
function displayTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // 一覧を一度クリア

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = function () {
            toggleTaskCompletion(index);
        };

        const taskText = document.createTextNode(task.task);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.onclick = function () {
            deleteTask(index);
        };

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        taskListElement.appendChild(li);
    });
}

// タスクの完了状態を切り替える関数
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    saveTasksToLocalStorage();
}

// タスクを削除する関数
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
    saveTasksToLocalStorage();
}

// タスクをローカルストレージに保存する関数
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}






