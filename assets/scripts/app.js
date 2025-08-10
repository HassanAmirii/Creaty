document.addEventListener("DOMContentLoaded", () => {
  // important variables

  const messageBox = document.getElementById("messageBox");
  const taskBox = document.getElementById("taskBox");
  const form = document.getElementById("form");
  const taskCountBox = document.getElementById("taskCountBox");
  let taskStorage;

  // show available task
  renderTask();

  // listen and render new  task submission

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoInput = document.getElementById("todoInput").value;

    if (todoInput) {
      // retrieve old task if available 0r create a new one

      let taskList = taskStorage ? JSON.parse(taskStorage) : [];
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
    taskStorage = localStorage.getItem("newTask");
    const getTask = JSON.parse(taskStorage);
    const CleanUpTask = getTask
      .map(function (taskItem, index) {
        return `<p><input class="checkBOX" data-index =${index} type="checkbox"> ${taskItem.task} <button data-index =${index} class="deleteBtn">delete</button></p>`;
      })
      .join("");
    taskBox.innerHTML = CleanUpTask;
    messageBox.innerHTML = "";

    deleteTask();
    CountCompletedTaskAndRender();
  }

  function deleteTask() {
    const allTask = document.querySelectorAll(".deleteBtn");
    allTask.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = btn.dataset.index;
        let taskList = taskStorage ? JSON.parse(taskStorage) : [];
        taskList.splice(index, 1);
        localStorage.setItem("newTask", JSON.stringify(taskList));
        renderTask();
      });
    });
  }

  function CountCompletedTaskAndRender() {
    let taskCounter;
    const checkBOX = document.querySelectorAll(".checkBOX");
    checkBOX.forEach(function (checkBoxItem) {
      checkBoxItem.addEventListener("change", (e) => {
        taskCounter =
          checkBoxItem.checked == true ? taskCounter++ : taskCounter--;
        taskCountBox.innerHTML = `<p> ${taskCounter} / ${checkBOX.length} completed</p>`;
        renderTask();
      });
    });
  }
});
