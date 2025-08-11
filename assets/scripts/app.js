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
      let taskStorage = localStorage.getItem("newTask");

      let taskList = taskStorage ? JSON.parse(taskStorage) : [];
      taskList.push({ task: todoInput, isComplete: false });

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
    let taskStorage = localStorage.getItem("newTask");
    const getTask = JSON.parse(taskStorage);
    const CleanUpTask = getTask
      .map(function (taskItem, index) {
        const isChecked = taskItem.isComplete ? "checked" : "";
        return `<p><input class="checkBOX" data-index =${index} type="checkbox" ${isChecked}> ${taskItem.task} <button data-index =${index} class="deleteBtn">delete</button></p>`;
      })
      .join("");
    taskBox.innerHTML = CleanUpTask;
    messageBox.innerHTML = "";

    let taskList = taskStorage ? JSON.parse(taskStorage) : [];
    taskList.filter(function (checedItem) {
      return checedItem.lenght;
    });

    deleteTask();
    CountCompletedTaskAndRender();
  }

  function deleteTask() {
    const allTask = document.querySelectorAll(".deleteBtn");
    allTask.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = btn.dataset.index;
        let taskStorage = localStorage.getItem("newTask");
        let taskList = taskStorage ? JSON.parse(taskStorage) : [];
        taskList.splice(index, 1);
        localStorage.setItem("newTask", JSON.stringify(taskList));
        renderTask();
      });
    });
  }

  function CountCompletedTaskAndRender() {
    const checkBOX = document.querySelectorAll(".checkBOX");
    checkBOX.forEach(function (checkBoxItem) {
      checkBoxItem.addEventListener("change", (e) => {
        if (checkBoxItem.checked == true) {
          let index = checkBoxItem.dataset.index;
          let taskStorage = localStorage.getItem("newTask");
          let taskList = taskStorage ? JSON.parse(taskStorage) : [];
          taskList[index].isComplete = true;
          localStorage.setItem("newTask", JSON.stringify(taskList));

          renderTask();
        } else {
          let taskStorage = localStorage.getItem("newTask");
          let taskList = taskStorage ? JSON.parse(taskStorage) : [];
          let index = checkBoxItem.dataset.index;
          taskList[index].isComplete = false;
          localStorage.setItem("newTask", JSON.stringify(taskList));
          renderTask();
        }
      });
    });
  }
});
