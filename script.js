const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyText = document.getElementById("emptyText");

// Show/hide "No tasks" message
function updateEmptyState() {
  emptyText.style.display = taskList.children.length === 0 ? "block" : "none";
}

// Create one task item
function createTaskItem(taskText) {
  const li = document.createElement("li");
  li.className = "task-item";

  li.innerHTML = `
    <div class="task-left">
      <span class="task-text"></span>
    </div>

    <div class="task-actions">
      <button class="small-btn done-btn" data-action="done">Done</button>
      <button class="small-btn delete-btn" data-action="delete">Delete</button>
    </div>
  `;

  li.querySelector(".task-text").textContent = taskText;
  return li;
}

// Add task function
function addTask() {
  const text = taskInput.value.trim();

  // Prevent empty tasks
  if (text === "") {
    alert("Please type a task first!");
    taskInput.focus();
    return;
  }

  // Add task to UI
  const taskItem = createTaskItem(text);
  taskList.appendChild(taskItem);

  // Reset input
  taskInput.value = "";
  taskInput.focus();

  updateEmptyState();
}

// Button click
addBtn.addEventListener("click", addTask);

// Enter key support
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Event delegation for Done/Delete
taskList.addEventListener("click", (e) => {
  const actionBtn = e.target.closest("button");
  if (!actionBtn) return;

  const action = actionBtn.dataset.action;
  const taskItem = actionBtn.closest(".task-item");

  if (action === "done") {
    taskItem.classList.toggle("completed");
  }

  if (action === "delete") {
    taskItem.remove();
    updateEmptyState();
  }
});

// Initial
updateEmptyState();
