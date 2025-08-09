document.addEventListener("DOMContentLoaded", () => {
  // important variables

  const messageBox = document.getElementById("messageBox");
  const taskBox = document.getElementById("taskBox");
  const form = document.getElementById("form");
  const taskCount = document.getElementById("taskCount");

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

  // Get task from storage manipulate all and show on screen
  function renderTask() {
    const getTask = JSON.parse(localStorage.getItem("newTask"));
    console.log(getTask);
    const arrangeGetTask = getTask
      .map(function (taskItem, index) {
        return `<p><input class="CheckState" data-index =${index} type="checkbox"> ${taskItem.task} <button data-index =${index} class="deleteBtn">delete</button></p>`;
      })
      .join("");
    taskBox.innerHTML = arrangeGetTask;
    messageBox.innerHTML = "";

    // delete a task
    const allTask = document.querySelectorAll(".deleteBtn");
    allTask.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteTask(Number(btn.dataset.index));
      });
    });

    // implementing task completion counter
    const CheckState = document.querySelectorAll(".CheckState");
    CheckState.forEach(function (checkItem) {
      checkItem.addEventListener("change", (e) => {
        let taskCounter = 0;
        CheckState.forEach((checkItem) => {
          if (checkItem.checked) taskCounter++;
        });
        taskCount.innerHTML = `${taskCounter} / ${CheckState.length} tasks completed`;
      });
    });
  }

  // Get task from storage > delete selected one >  show the rest on screen

  function deleteTask(index) {
    const fromStorage = localStorage.getItem("newTask");
    let taskList = fromStorage ? JSON.parse(fromStorage) : [];
    taskList.splice(index, 1);
    localStorage.setItem("newTask", JSON.stringify(taskList));
    renderTask();
  }
});
