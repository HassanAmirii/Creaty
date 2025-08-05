document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("messageBox");
  const taskBox = document.getElementById("taskBox");
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoInput = document.getElementById("todoInput").value;
    if (todoInput) {
      localStorage.setItem("newTask", todoInput);

      const getTask = localStorage.getItem("newTask");
      console.log(getTask);
      taskBox.innerHTML = `<p> <input type="checkbox" name="" id=""> ${getTask}</p>`;
    } else {
      messageBox.innerHTML = `<p> Please input a task in the box above</p>
`;
    }
  });
});
