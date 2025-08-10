document.addEventListener("DOMContentLoaded", () => {
  // important variables

  const messageBox = document.getElementById("messageBox");
  const taskBox = document.getElementById("taskBox");
  const form = document.getElementById("form");
  const taskCountBox = document.getElementById("taskCountBox");

  // show available task
  renderTask();

  // listen and render new  task submission

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoInput = document.getElementById("todoInput").value;

    if (todoInput) {
      // retrieve old task if available 0r create a new one
      const storedTask = localStorage.getItem("newTask");
      let taskList = storedTask ? JSON.parse(storedTask) : [];
      taskList.push({ task: todoInput });

      localStorage.setItem("newTask", JSON.stringify(taskList));
      document.getElementById("todoInput").value = "";

      renderTask();
    } else {
      messageBox.innerHTML = `<p> Please input a task in the box above</p>
`;
    }
  });

  // show available task in storage
  function renderTask() {
    const getTask = JSON.parse(localStorage.getItem("newTask"));
    const CleanUpTask = getTask
      .map(function (taskItem, index) {
        return `<p><input class="checkBOX" data-index =${index} type="checkbox"> ${taskItem.task} <button data-index =${index} class="deleteBtn">delete</button></p>`;
      })
      .join("");
    taskBox.innerHTML = CleanUpTask;
    messageBox.innerHTML = "";
  }

  // Get task from storage > delete selected one >  show the rest on screen
  function deleteTask() {
    const allTask = document.querySelectorAll(".deleteBtn");
    allTask.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = btn.dataset.index;
        const fromStorage = localStorage.getItem("newTask");
        let taskList = fromStorage ? JSON.parse(fromStorage) : [];
        taskList.splice(index, 1);
        localStorage.setItem("newTask", JSON.stringify(taskList));
      });
    });
  }

  function CountCompletedTaskAndRender() {
    let taskCounter = 0;
    const checkBOX = document.querySelectorAll(".checkBOX");
    checkBOX.forEach(function (checkBoxItem) {
      checkBoxItem.addEventListener("change", () => {
        if (checkBoxItem.checked) taskCounter++;
      });
    });
    taskCountBox.innerHTML = `<p> ${taskCounter} / ${checkBOX.length} completed</p>`;
  }
});
