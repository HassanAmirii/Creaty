document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("messageBox");
  document.addEventListener("submit", (e) => {
    const todoInput = document.getElementById("todoInput").value();
    if (todoInput) {
      localStorage.setItem("newTask", todoInput);
    } else {
    }
  });
});
