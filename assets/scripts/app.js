document.addEventListener("DOMContentLoaded", () => {
  // important variables

  const messageBox = document.getElementById("messageBox");
  const taskBox = document.getElementById("taskBox");
  const form = document.getElementById("form");

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
  function renderTask() {
    const getTask = JSON.parse(localStorage.getItem("newTask"));
    console.log(getTask);
    // manipulate the above objects list, add check box, delete button, and arrange each object as a list
    const arrangeGetTask = getTask
      .map(function (taskItem) {
        return `<p><input id="taskCheckBox" type="checkbox"> ${taskItem.task} <button id="deleteTask">delete</button></p>`;
      })
      .join("");
    // render task on screen
    taskBox.innerHTML = arrangeGetTask;
  }
});
