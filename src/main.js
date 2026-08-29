import "./style.css";
import { nav } from "./nav";
import {
  wrapper,
  form,
  cardDivItem,
  subtaskItem,
  mobileSearchContainer,
  fullscreenFocusMode,
} from "./dom";

nav();

let tasks = [];

const create = document.getElementById("create");
const p = document.getElementById("preventEmptyText");
const p2 = document.getElementById("preventEmptyText2");
const pNotFound = document.getElementById("removeTask");
const completionState = document.getElementById("completion");
const pending = document.getElementById("pending");
const completedId = document.getElementById("completeId");
const tasksAmount = document.getElementById("tasksAmount");
const tasksPending = document.getElementById("tasksPending");
let nIcon = document.getElementById("mediaQuery");
let readInput = document.getElementById("createTask");
const taskProgress = document.getElementById("task-progress");
const searchWrapper = document.getElementById("search-wrapper");
const searchBoxMobile = document.getElementById("search-box");
const dashboard = document.getElementById("dashboard-js");

// Date
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
// const hours = date.getHours();
// console.log(hours);
// // Format the selected date as YYYY-MM-DD.
const monthString = month.toString().padStart(2, "0");
const dayString = day.toString().padStart(2, "0");
const yearMonthDay = `${year}-${monthString}-${dayString}`;
const monthJs = document.getElementById("month-js");
const dayJs = document.getElementById("day-js");

// Update the page with the current date.
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDate = date.getDate();
const currentMonth = monthNames[date.getMonth()];
const currentDay = dayNames[date.getDay()];
monthJs.innerText = `${currentMonth} ${currentDate}`;
dayJs.innerText = currentDay;

// Show or hide the N icon based on whether the field is empty.
readInput.addEventListener("input", (e) => {
  nIcon.hidden = e.target.value !== "";
});
// Generate unique IDs for tasks and label to prevents duplication issues
let pendingAmount = 0;
let completedTaskCount = 0;
let _id = 0;
let labelId = 0;
// Tracks wheter a task form is currently open
let isTaskFormOpen = false;

function updateTaskProgress() {
  const taskLength = tasks.length;
  if (taskLength === 0) {
    taskProgress.innerText = 0;
    return;
  }
  const taskStatus = (completedTaskCount / taskLength) * 100;
  taskProgress.innerText = Math.round(taskStatus);
}
// Reads and handle task creation when the button is clicked
create.addEventListener("click", () => {
  const task = readInput.value.trim();
  if (task === "") {
    p.innerText = "Input field is required";
    // Prevents creating a task with empty users input
    return;
  } else {
    p.innerText = "";
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

    // Removes div container on submit
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

    // Get the last item in the array and link it to its ID.
    const divCard = cardDivItem(tasks[tasks.length - 1], labelId);

    switch (domWrapper.select.value) {
      case "medium":
        divCard.pTaskCard.classList.add(
          "text-yellow-500",
          "bg-yellow-100/30",
          "dark:text-yellow-500/50",
          "dark:bg-yellow-700/20",
        );
        divCard.pTaskCardTwo.classList.add(
          "text-yellow-500",
          "bg-yellow-100/30",
          "dark:text-yellow-500/50",
          "dark:bg-yellow-700/20",
        );
        break;
      case "low":
        divCard.pTaskCard.classList.add(
          "text-green-500/70",
          "bg-green-100/40",
          "dark:text-green-400",
          "dark:bg-green-700/20",
        );
        ivCard.pTaskCardTwo.classList.add(
          "text-green-500/70",
          "bg-green-100/40",
          "dark:text-green-400",
          "dark:bg-green-700/20",
        );
        break;
      default:
        divCard.pTaskCard.classList.add(
          "text-red-500",
          "bg-red-100/40",
          "dark:text-red-300",
          "dark:bg-red-700/20",
        );
        divCard.pTaskCardTwo.classList.add(
          "text-red-500",
          "bg-red-100/40",
          "dark:text-red-300",
          "dark:bg-red-700/20",
        );
    }
    // Increment the label ID for the next task
    ++labelId;
    // Toggle complete state
    const tasksId = tasks[tasks.length - 1].id;
    divCard.inputTaskCard.addEventListener("change", () => {
      // Find the matching task in the tasks array
      let currentTask = tasks.find((e) => e.id === tasksId);
      currentTask.completed = true;
      ++completedTaskCount;
      completionState.innerText = completedTaskCount;
      completedId.innerText = completedTaskCount;
      pendingAmount--;
      pending.innerText = pendingAmount;
      tasksPending.innerText = pendingAmount;
      // Tasks status
      updateTaskProgress();
    });
    ++pendingAmount;
    pending.innerText = pendingAmount;
    tasksAmount.innerText = pendingAmount;
    tasksPending.innerText = pendingAmount;
    pNotFound.style.display = "none";

    // Delete Icon
    divCard.divTaskCard6.addEventListener("click", () => {
      divCard.subtaskContainer.remove();
      divCard.divTaskCardContainer.remove();
      // Decrement the pending or completed counter based on the task's status
      let locateTasksId = tasks.find((e) => e.id === tasksId);
      let completeStatus = locateTasksId.completed;
      if (completeStatus === false) {
        pendingAmount--;
        pending.innerText = pendingAmount;
        tasksPending.innerText = pendingAmount;
        tasksAmount.innerText = pendingAmount;
      } else {
        completedTaskCount--;
        completionState.innerText = completedTaskCount;
        completedId.innerText = completedTaskCount;
        tasksAmount.innerText = pendingAmount;
      }
      // Remove the task from the page and the tasks array.
      let updatedTasks = tasks.filter((e) => e.id !== tasksId);
      tasks = updatedTasks;
      // Tasks status
      updateTaskProgress();
    });
    // Tasks status
    updateTaskProgress();

    // Fullscreen Icon
    divCard.divTaskCard4.addEventListener("click", () => {
      fullscreenFocusMode(tasks[tasks.length - 1].title);
    });

    // Subtask icon
    divCard.divTaskCard5.addEventListener("click", () => {
      divCard.subtaskContainer.classList.toggle("hidden");
    });
    divCard.subTaskButton.addEventListener("click", () => {
      const subtaskInputValue = divCard.subtaskInput.value;
      if (subtaskInputValue === "") {
        return (divCard.subtaskNotice.innerText = "Input field is required");
      } else {
        divCard.subtaskNotice.innerText = "";
        const subtaskResult = subtaskItem(subtaskInputValue, tasksId);
        const subtaskParent = subtaskResult.subtaskInnerParent;
        const taskContainer = divCard["_divTask"];
        taskContainer.append(subtaskParent);
        // TRASH
        subtaskResult.subtaskTrashIcon.addEventListener("click", () => {
          subtaskParent.remove();
        });
      }
    });
  });

  // Cancel task creation and reset the form.
  domWrapper._buttonSvg.addEventListener("click", () => {
    // Mark the task form as closed.
    isTaskFormOpen = false;
    // removes container
    domWrapper.h2.remove();
    domWrapper.span.remove();
    domWrapper.childDiv.remove();
    form.classList = "";
    p2.innerText = "";
  });
});

// Nav bar
const navItems = document.querySelectorAll(".js-class");
const pageTitle = document.querySelector(".js-title");
for (let i = 0; i < navItems.length; i++) {
  const navItem = navItems[i];
  navItem.addEventListener("click", (e) => {
    const selectedCategory = e.currentTarget.textContent.trim();
    if (selectedCategory === "All Tasks") {
      pageTitle.innerText = "My Tasks";
    } else {
      pageTitle.innerText = selectedCategory;
    }

    // Filter tasks based on the selected nav title.
    let filteredTasks;
    const taskCards = document.querySelectorAll("[data-id]");
    switch (selectedCategory) {
      // Shows every task
      case "All Tasks":
        filteredTasks = tasks.filter(() => true);
        break;
      case "Today":
        filteredTasks = tasks.filter((task) => task.date === yearMonthDay);
        break;
      case "Upcoming":
        filteredTasks = tasks.filter((task) => task.date > yearMonthDay);
        break;
      case "Completed":
        filteredTasks = tasks.filter((task) => task.completed === true);
        break;
    }
    for (let j = 0; j < taskCards.length; j++) {
      const taskCardsResult = taskCards[j];
      // Check if the task card's ID exists in the array
      if (
        filteredTasks.some(
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
// Hides/Show tasks based on users input
function updateSearchFilter(searchQuery) {
  const matchingTask = tasks.filter((e) => e.title.includes(searchQuery));
  const taskCards = document.querySelectorAll("[data-id]");
  for (let taskCard of taskCards) {
    const taskCardResult = taskCard;
    if (
      matchingTask.some(
        (elem) => elem.id === parseInt(taskCardResult.dataset.id),
      )
    ) {
      taskCardResult.style.display = "";
    } else {
      taskCardResult.style.display = "none";
    }
  }
}
// Desktop search bar
searchWrapper.addEventListener("input", (e) => {
  updateSearchFilter(e.target.value);
});

// Mobile search box
searchBoxMobile.addEventListener("click", () => {
  dashboard.hidden = true;
  searchBoxMobile.hidden = true;
  const mobileSearch = mobileSearchContainer();
  mobileSearch.mobileSearchButton.addEventListener("click", () => {
    dashboard.hidden = false;
    searchBoxMobile.hidden = false;
    mobileSearch.mobileSearchDiv.classList = "";
    mobileSearch.mobileSearchForm.remove();
    mobileSearch.mobileSearchInput.remove();
    mobileSearch.mobileSearchButton.remove();
  });
  mobileSearch.mobileSearchInput.addEventListener("input", (e) => {
    updateSearchFilter(e.target.value);
  });
});

// Nav bar mobile
const navBar = document.getElementById("js-nav");
const header = document.getElementById("js-header");
const closeButton = document.getElementById("close-button");
navBar.addEventListener("click", () => {
  header.classList.remove("hidden");
  closeButton.classList.remove("hidden");
  header.classList.add(
    "absolute",
    "xl:relative",
    "bg-white",
    "xl:bg-transparent",
    "dark:xl:bg-darkMode",
    "z-1",
    "fixed",
    "rounded-sm",
    "xl:rounded-none",
    "shadow-sm",
    "xl:shadow-none",
    "dark:bg-black",
  );
});
closeButton.addEventListener("click", () => {
  header.classList.add("hidden");
});

// Dark Mode
const darkmodeToggle = document.getElementById("js-darkmode");
darkmodeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
