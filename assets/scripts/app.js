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
    let todoInput = document
      .getElementById("todoInput")
      .value.toLowerCase()
      .trim();

    if (todoInput) {
      // retrieve old task if available 0r create a new one
      let taskStorage = localStorage.getItem("newTask");

      let taskList = taskStorage ? JSON.parse(taskStorage) : [];
      const allTaskList = taskList.find(function (item) {
        return item.task === todoInput;
      });
      if (allTaskList) {
        alert("Task already exist :)");
      } else {
        taskList.push({ task: todoInput, isComplete: false });
      }

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
    if (taskStorage) {
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

      const completedTasks = taskList.filter(function (taskItem) {
        return taskItem.isComplete === true;
      });

      const completedCount = completedTasks.length;

      const totalCount = taskList.length;
      if (taskBox.innerHTML) {
        taskCountBox.innerHTML = `<p>${completedCount} / ${totalCount} completed</p>`;
      } else {
        taskCountBox.innerHTML = "";
      }
    } else {
      taskBox.innerHTML = "";
    }
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
