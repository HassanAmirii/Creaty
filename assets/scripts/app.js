document.addEventListener("DOMContentLoaded", () => {
  // important variables

  const messageBox = document.getElementById("messageBox");
  const taskBox = document.getElementById("taskBox");
  const todoInput = document.getElementById("todoInput").value;

  // listen for task submission
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    if (todoInput) {
      // retrieve old task if available 0r create a new one
      const storedTask = localStorage.getItem("newTask");
      let taskList = storedTask ? JSON.parse(storedTask) : [];
      taskList.push({ task: todoInput });

      localStorage.setItem("newTask", JSON.stringify(taskList));
      const getTask = JSON.parse(localStorage.getItem("newTask"));

      // manipulate the above objects list, add check box, delete button, and arrange each object as a list
      const arrangeGetTask = getTask
        .map(function (taskItem) {
          return `<p><input id="taskCheckBox" type="checkbox"> ${taskItem.task} <button id="deleteTask">delete</button></p>`;
        })
        .join("");
      // render task on screen
      taskBox.innerHTML = arrangeGetTask;

      // remove task row from list if delete button is clicked
      const deleteTask = document.getElementById("deleteTask");
      deleteTask.addEventListener("click", function (e) {
        taskList.splice();
      });
    } else {
      messageBox.innerHTML = `<p> Please input a task in the box above</p>
`;
    }
  });
});
