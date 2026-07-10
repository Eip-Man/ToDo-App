import "./style.css";
import { nav } from "./nav";
import { wrapper, form, cardDivItem } from "./dom";

nav();
let tasks = [];

const create = document.getElementById("create");
const p = document.getElementById("preventEmptyText");
const p2 = document.getElementById("preventEmptyText2");
const pNotFound = document.getElementById("removeTask");
// const pNsign = document.getElementById("mediaQuery")

// Date
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
// // Format the selected date as YYYY-MM-DD.
const monthString = month.toString().padStart(2, "0");
const dayString = day.toString().padStart(2, "0");
const yearMonthDay = `${year}-${monthString}-${dayString}`;

// Generate unique IDs for tasks and label to prevents duplicated IDs
let _id = 0;
let labelId = 0;
// Tracks wheter a task form is currently open
let isTaskFormOpen = false;
// Reads and handle task creation when the button is clicked
create.addEventListener("click", () => {
  const task = document.getElementById("createTask").value.trim();
  if (task === "") {
    p.innerText = "Input field is required";
    // prevents creating a task with empty users input
    return;
  } else {
    p.innerText = "";
    pNotFound.style.display = "none";
  }
  // Allow only one open task form at a time
  if (isTaskFormOpen) {
    p2.innerText = "Please submit this task before creating another.";
    return;
  } else {
    isTaskFormOpen = true;
  }
  const domWrapper = wrapper(task, _id);
  domWrapper.submitButton.addEventListener("click", () => {
    // Allows user to create task after submit
    isTaskFormOpen = false;
    if (domWrapper.select.value === "" || domWrapper.input.value === "") {
      p2.innerText = "Please complete all fields before submitting.";
      return;
    }
    domWrapper.h2.remove();
    domWrapper.span.remove();
    domWrapper.childDiv.remove();
    form.classList = "";
    p2.innerText = "";
    // Store the new task and its properties
    tasks.push({
      title: task,
      id: _id++,
      priority: domWrapper.select.value,
      date: domWrapper.input.value,
      completed: false,
    });
    const divCard = cardDivItem(tasks[tasks.length - 1], labelId);
    switch (domWrapper.select.value) {
      case "medium":
        divCard.pTaskCard.classList.add("text-yellow-500", "bg-yellow-100/30");
        break;
      case "low":
        divCard.pTaskCard.classList.add("text-green-500/70", "bg-green-100/40");
        break;
      default:
        divCard.pTaskCard.classList.add("text-red-500", "bg-red-100/40");
    }
    // Increment the label ID for the next task
    ++labelId;
  });
  //cancel
  domWrapper._buttonSvg.addEventListener("click", () => {
    // allows user to create task after cancelling
    isTaskFormOpen = false;
    domWrapper.h2.remove();
    domWrapper.span.remove();
    domWrapper.childDiv.remove();
    form.classList = "";
    pNotFound.style.display = "";
    p2.innerText = "";
  });
});
// Nav bar
const navJs = document.querySelectorAll(".js-class");
const titleJs = document.querySelector(".js-title");
for (let i = 0; i < navJs.length; i++) {
  const resultNav = navJs[i];
  resultNav.addEventListener("click", (e) => {
    const _result = e.currentTarget.textContent.trim();
    if (_result === "All Tasks") {
      titleJs.innerText = "My Tasks";
    } else {
      titleJs.innerText = _result;
    }
    let filter;
    const taskCards = document.querySelectorAll("[data-id]");
    switch (_result) {
      // always returns true
      case "All Tasks":
        filter = tasks.filter((x) => true);
        break;
      case "Today":
        filter = tasks.filter((item) => item.date === yearMonthDay);
        break;
      case "Upcoming":
        filter = tasks.filter((x) => x.date > yearMonthDay);
        break;
      case "Completed":
        filter = tasks.filter((x) => x.completed === true);
        break;
    }
    for (let j = 0; j < taskCards.length; j++) {
      const taskCardsResult = taskCards[j];
      // Check if the task card's ID exists in the array
      if (
        filter.some(
          // same datatype
          (elem) => elem.id === parseInt(taskCardsResult.dataset.id),
        )
      ) {
        taskCardsResult.style.display = "";
      } else {
        taskCardsResult.style.display = "none";
      }
    }
  });
}
