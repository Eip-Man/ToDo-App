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
const circleAnimation = document.querySelector(".circle-animation");
const motivationText = document.getElementById("motivation-text");

// Date
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
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
let pendingAmount = 0;
let completedTaskCount = 0;
// Generate unique IDs for tasks and label to prevents duplication issues
let _id = 0;
let labelId = 0;
// Tracks wheter a task form is currently open
let isTaskFormOpen = false;

// Updates the progress display based on the amount of tasks
function updateTaskProgress() {
  const taskLength = tasks.length;
  // Reset progress when there are no tasks.
  if (taskLength === 0) {
    taskProgress.innerText = 0;
    // Reset the progress ring to its initial state.
    circleAnimation.style.strokeDasharray = 63;
    circleAnimation.style.strokeDashoffset = 63;
    return;
  }
  // Calculate the percentage of completed tasks
  const taskStatus = (completedTaskCount / taskLength) * 100;
  taskProgress.innerText = Math.round(taskStatus);

  // Ring animation
  // 2 * pi * svg radius(10) = 62.83(rounded)
  const circumference = 63;
  // Calculate how much circle should be hidden
  // based on the progress of completed tasks
  const strokeDashOffset =
    circumference * (1 - completedTaskCount / taskLength);
  circleAnimation.style.strokeDasharray = circumference;
  circleAnimation.style.strokeDashoffset = strokeDashOffset;
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
    // Validate required fields before allowing the task to be created
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
        divCard.pTaskCardTwo.classList.add(
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
    // Mark task as complete when its checkbox is checked
    const tasksId = tasks[tasks.length - 1].id;
    divCard.inputTaskCard.addEventListener("change", () => {
      // Find the matching task in the tasks array
      let currentTask = tasks.find((e) => e.id === tasksId);
      currentTask.completed = true;
      ++completedTaskCount;
      // Update completed/pending counts in the DOM
      completionState.innerText = completedTaskCount;
      completedId.innerText = completedTaskCount;
      pendingAmount--;
      pending.innerText = pendingAmount;
      tasksPending.innerText = pendingAmount;
      // Recalculate and display progress percentage
      updateTaskProgress();
    });
    // Increment pending count and hide the "no tasks" message
    ++pendingAmount;
    pending.innerText = pendingAmount;
    tasksAmount.innerText = pendingAmount;
    tasksPending.innerText = pendingAmount;
    pNotFound.style.display = "none";

    // Task trash Icon
    divCard.divTaskCard6.addEventListener("click", () => {
      divCard.subtaskContainer.remove();
      divCard.divTaskCardContainer.remove();
      // Delete subtask entries belonging to the same id
      const matchingSubtask = document.querySelectorAll(
        '[data-id="' + tasksId + '"]',
      );
      for (let matchingId of matchingSubtask) {
        matchingId.remove();
      }
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
      // Recalculate and display progress percentage
      updateTaskProgress();
    });
    // Recalculate and display progress percentage
    updateTaskProgress();

    // Fullscreen Icon
    // Enter focus mode for this task
    divCard.divTaskCard4.addEventListener("click", () => {
      const focusMode = fullscreenFocusMode(task);
      document.body.classList.add("overflow-y-hidden");

      focusMode.fullscreenCloseButton.addEventListener("click", () => {
        focusMode.fullscreenParent.remove();
        document.body.classList.remove("overflow-y-hidden");
      });
      // Exit focus mode and mark the task as complete
      focusMode.fullscreenInnerParentButton.addEventListener("click", () => {
        document.body.classList.remove("overflow-y-hidden");
        focusMode.fullscreenParent.remove();
        // Trigger a click on the task's checkbox
        divCard.inputTaskCard.click();
        motivationText.innerText = "Making good progress.";
      });
    });

    // Subtask icon
    // Toggle the subtask panel open/closed
    divCard.divTaskCard5.addEventListener("click", () => {
      divCard.divTaskCard5svg.classList.toggle("rotate-90");
      divCard.subtaskContainer.classList.toggle("py-11");
      divCard.subtaskContainer.classList.toggle("mt-1");
      divCard.subtaskContainer.classList.toggle("max-h-0");
      divCard.subtaskContainer.classList.toggle("opacity-0");
      divCard.subtaskContainer.classList.toggle("max-h-20");
      divCard.subtaskContainer.classList.toggle("opacity-100");
      divCard.subtaskInput.value = "";
    });

    divCard.subTaskButton.addEventListener("click", () => {
      const subtaskInputValue = divCard.subtaskInput.value;
      if (subtaskInputValue === "") {
        return (divCard.subtaskNotice.innerText = "Input field is required");
      } else {
        divCard.subtaskNotice.innerText = "";
        const subtaskResult = subtaskItem(subtaskInputValue, tasksId);
        const subtaskParent = subtaskResult.subtaskInnerParent;
        // Place subtaskParent right after divCard.subtaskContainer, as a sibling
        divCard.subtaskContainer.insertAdjacentElement(
          "afterend",
          subtaskParent,
        );
        // Subtask delete icon
        subtaskResult.subtaskTrashIcon.addEventListener("click", () => {
          subtaskParent.remove();
        });
      }
    });
  });

  // Cancel task creation and reset the form.
  domWrapper._buttonSvg.addEventListener("click", () => {
    // Mark the task form as closed
    isTaskFormOpen = false;
    // Remove the form's header, label, and input elements
    domWrapper.h2.remove();
    domWrapper.span.remove();
    domWrapper.childDiv.remove();
    form.classList = "";
    p2.innerText = "";
  });
});

// Nav bar
// Update the page title and filter tasks by category
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
    switch (selectedCategory) {
      case "All Tasks":
        // Include all tasks unfiltered
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
    tasksAmount.innerText = filteredTasks.length;
    const taskCards = document.querySelectorAll("[data-id]");
    for (let j = 0; j < taskCards.length; j++) {
      const taskCardsResult = taskCards[j];
      // Show the card if its ID is in filteredTasks, otherwise hide it
      if (
        filteredTasks.some(
          // Convert dataset.id (string) to a number to match elem.id's type
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
// Show tasks matching the search query, hide the rest
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
// Run the search filter whenever the desktop search input changes
searchWrapper.addEventListener("input", (e) => {
  updateSearchFilter(e.target.value);
});

// Open the mobile search overlay when the search icon is tapped
searchBoxMobile.addEventListener("click", () => {
  dashboard.hidden = true;
  searchBoxMobile.hidden = true;
  const mobileSearch = mobileSearchContainer();
  // Close the mobile search overlay and restore the dashboard
  mobileSearch.mobileSearchButton.addEventListener("click", () => {
    dashboard.hidden = false;
    searchBoxMobile.hidden = false;
    mobileSearch.mobileSearchDiv.classList = "";
    mobileSearch.mobileSearchForm.remove();
    mobileSearch.mobileSearchInput.remove();
    mobileSearch.mobileSearchButton.remove();
  });
  // Run the search filter as the user types in mobile search
  mobileSearch.mobileSearchInput.addEventListener("input", (e) => {
    updateSearchFilter(e.target.value);
  });
});

// Open the mobile nav menu
const navBar = document.getElementById("js-nav");
const header = document.getElementById("js-header");
const closeButton = document.getElementById("close-button");
navBar.addEventListener("click", () => {
  header.classList.add(
    "translate-x-0",
    "duration-300",
    "transition-transform",
    "bg-lighter",
    "rounded-sm",
    "xl:rounded-none",
    "xl:shadow-none",
    "dark:bg-darkMode",
    "max-md:border-b",
    "border-r",
    "border-r-gray-200",
    "border-b-gray-200",
    "dark:border-gray-500/50",
  );
  header.classList.remove("-translate-x-full");
});
// Closes the mobile nav menu
closeButton.addEventListener("click", () => {
  header.classList.remove("translate-x-0");
  header.classList.add("-translate-x-full");
});

// Toggle dark mode
const darkmodeToggle = document.getElementById("js-darkmode");
darkmodeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
