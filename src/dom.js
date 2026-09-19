export const mobileSearchContainer = () => {
  const mobileSearchDiv = document.getElementById("mobile-search-container");
  mobileSearchDiv.classList.add(
    "ml-8",
    "flex",
    "h-8",
    "w-full",
    "grow",
    "items-center",
    "rounded-2xl",
    "bg-gray-200/40",
    "focus-within:outline-2",
    "focus-within:outline-offset-1",
    "focus-within:outline-black/70",
    "md:hidden",
    "dark:focus-within:outline-white/20",
  );
  const mobileSearchForm = document.createElement("form");
  mobileSearchForm.classList.add("flex-1");
  mobileSearchDiv.append(mobileSearchForm);

  const mobileSearchLabel = document.createElement("label");
  mobileSearchLabel.classList.add("sr-only");
  mobileSearchLabel.innerText = "Search tasks";
  mobileSearchLabel.htmlFor = "textId";
  mobileSearchForm.append(mobileSearchLabel);

  const mobileSearchInput = document.createElement("input");
  mobileSearchInput.type = "text";
  mobileSearchInput.id = "textId";
  mobileSearchInput.classList.add(
    "w-full",
    "pl-3",
    "outline-0",
    "placeholder:text-sm",
    "dark:text-white",
  );
  mobileSearchInput.placeholder = "Search...";
  mobileSearchForm.append(mobileSearchInput);

  const mobileSearchButton = document.createElement("button");
  mobileSearchButton.classList.add(
    "mr-3",
    "size-5",
    "shrink-0",
    "cursor-pointer",
  );
  mobileSearchButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>`;

  mobileSearchDiv.append(mobileSearchButton);

  return {
    mobileSearchDiv,
    mobileSearchForm,
    mobileSearchInput,
    mobileSearchButton,
  };
};

export const form = document.querySelector(".form-container");
export const wrapper = (task, _id) => {
  form.classList.add(
    "mx-5",
    "border",
    "border-gray-200/40",
    "shadow-2xs",
    "rounded-2xl",
    "z-2",
    "dark:border-gray-200/10",
  );

  const h2 = document.createElement("h2");
  h2.classList.add(
    "font-semibold",
    "text-2xl",
    "ml-2.5",
    "p-2",
    "dark:text-white",
    "wrap-break-word",
  );
  const span = document.createElement("span");
  span.classList.add(
    "mt-7",
    "mx-2",
    "border-t",
    "border-t-gray-200/50",
    "block",
    "dark:border-t-gray-200/10",
  );
  const childDiv = document.createElement("div");
  childDiv.classList.add(
    "m-5",
    "grid",
    "md:grid-cols-[90px_minmax(90px,1fr)_100px]",
    "gap-y-2",
  );
  form.append(h2, span, childDiv);
  h2.textContent = task;
  //form-section
  const formSelectDiv = document.createElement("form");
  formSelectDiv.classList.add("w-fit");
  childDiv.append(formSelectDiv);

  const select = document.createElement("select");
  select.name = "priority";
  select.id = _id;
  select.autocomplete = "on";
  select.classList.add(
    "outline-0",
    "w-fit",
    "capitalize",
    "dark:text-gray-200/80",
  );
  formSelectDiv.append(select);
  const priority = document.createElement("option");
  priority.text = "-Priority-";
  priority.value = ""; // nothing selected
  priority.disabled = true;
  priority.selected = true;
  select.append(priority);

  let arr = ["high", "medium", "low"];
  for (let i = 0; i < arr.length; i++) {
    const option = document.createElement("option");
    option.value = `${arr[i]}`;
    option.text = `${arr[i]}`;
    option.classList.add("dark:text-black");
    select.append(option);
  }

  const div2 = document.createElement("div");
  div2.classList.add(
    "flex",
    "items-center",
    "col-start-2",
    "md:col-start-auto",
  );
  div2.id = "placement";
  childDiv.append(div2);
  div2.innerHTML = `<svg 
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="opacity-45 w-5 ml-2 md:ml-5  dark:text-gray-200/80 dark:opacity-100"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                
              </svg>`;

  const label = document.createElement("label");
  label.htmlFor = _id;
  label.innerHTML = "date";
  label.classList.add("sr-only");
  div2.append(label);
  const input = document.createElement("input");
  input.type = "date";
  input.name = "date";
  input.id = _id;
  input.classList.add("text-sm", "ml-1.5", "w-27", "dark:text-gray-200/80");
  div2.append(input);

  const div4 = document.createElement("div");
  div4.classList.add(
    "flex",
    "justify-self-end",
    "mr-7",
    "group",
    "col-span-3",
    "mt-2.5",
    "md:col-auto",
    "md:mt-0",
    "sm:mr-0",
  );
  childDiv.append(div4);

  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.classList.add(
    "opacity-50",
    "rounded",
    "hover:bg-black/10",
    "dark:hover:bg-gray-400/20",
    "px-2",
    "cursor-pointer",
    "dark:text-gray-200/80",
    "dark:opacity-100",
  );

  const _buttonSvg = document.createElement("button");
  _buttonSvg.title = "Cancel";
  _buttonSvg.classList.add(
    "ml-3",
    "flex",
    "size-7",
    "items-center",
    "justify-center",
    "rounded-md",
    "bg-black",
  );
  _buttonSvg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="col-4 size-5 cursor-pointer">
    <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
    <path d="m9 10-5 5 5 5"></path>
  </svg>`;
  div4.append(submitButton, _buttonSvg);

  // usable @ main.js
  return { input, submitButton, _buttonSvg, select, h2, span, childDiv };
};

//  container div card
export const cardDivItem = (taskData, labelId) => {
  const _divTask = document.getElementById("taskDiv");
  const divTaskCardContainer = document.createElement("div");
  divTaskCardContainer.classList.add(
    "mx-5",
    "py-3",
    "md:pt-3.5",
    "md:pb-4.5",
    "pl-2",
    "pr-2.5",
    "border",
    "border-gray-200",
    "dark:border-gray-200/10",
    "shadow-2xs",
    "hover:shadow-md",
    "rounded-2xl",
    "bg-white",
    "grid",
    "grid-cols-6",
    "items-center",
    "md:grid-cols-[auto_50px_minmax(0px,1fr)_50px_50px_50px]",
    "group",
    "has-checked:bg-gray-200/20",
    "dark:has-checked:bg-black/70",
    "dark:has-checked:border-gray-200/20",
    "mt-3",
    "dark:bg-transparent",
    "relative",
  );
  _divTask.append(divTaskCardContainer);

  const divTaskCard1 = document.createElement("div");
  divTaskCard1.classList.add("pl-3", "hidden", "md:block");
  divTaskCard1.innerHTML = ` <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="opacity-0 group-hover:opacity-35 dark:group-hover:opacity-75  dark:group-hover:text-white"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
`;
  // ID used to link the element to its task data for show/hide functionality
  divTaskCardContainer.dataset.id = labelId;
  divTaskCardContainer.append(divTaskCard1);

  const divTaskCard2 = document.createElement("div");
  divTaskCard2.classList.add("max-md:row-span-2", "flex", "justify-center");

  const labelTaskCard = document.createElement("label");
  labelTaskCard.classList.add("grid", "relative");
  labelTaskCard.htmlFor = labelId;

  const inputTaskCard = document.createElement("input");
  inputTaskCard.type = "radio";
  inputTaskCard.name = labelId;
  inputTaskCard.id = labelId;
  inputTaskCard.classList.add(
    "peer",
    "md:col-start-1",
    "md:row-start-1",
    "size-6",
    "cursor-pointer",
    "appearance-none",
    "rounded-full",
    "border-2",
    "border-gray-400",
    "bg-white",
    "transition-all",
    "dark:transition-none",
    "dark:duration-0",
    "checked:hidden",
    "hover:border-gray-500",
    "dark:bg-transparent",
  );

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "currentColor");
  svg.classList.add(
    "md:col-start-1",
    "md:row-start-1",
    "size-7",
    "self-center",
    "justify-self-center",
    "opacity-0",
    "absolute",
    "peer-checked:opacity-100",
    "dark:text-white",
    "transition-all",
    "duration-250",
    "dark:transition-none",
    "dark:duration-0",
    "ease-linear",
  );

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute(
    "d",
    "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
  );
  path.setAttribute("clip-rule", "evenodd");

  svg.append(path);

  labelTaskCard.append(inputTaskCard, svg);
  divTaskCard2.append(labelTaskCard);
  divTaskCardContainer.append(divTaskCard2);

  const divTaskCard3 = document.createElement("div");
  divTaskCard3.classList.add("ml-3", "max-md:col-start-2", "max-md:col-end-7");
  const h3TaskCard = document.createElement("h3");
  h3TaskCard.classList.add(
    "font-semibold",
    "text-xl",
    "mb-1.5",
    "group-has-checked:line-through",
    "dark:text-white",
    "wrap-break-word",
  );
  h3TaskCard.innerText = taskData.title;
  divTaskCardContainer.append(divTaskCard3);
  divTaskCard3.append(h3TaskCard);

  const pTaskCard = document.createElement("p");
  pTaskCard.classList.add(
    "hidden",
    "md:block",
    "w-fit",
    "px-2",
    "rounded-2xl",
    "text-[14px]",
    "capitalize",
  );

  pTaskCard.innerText = taskData.priority;
  divTaskCard3.append(pTaskCard);

  const pTaskCardTwo = document.createElement("p");
  pTaskCardTwo.classList.add(
    "col-2",
    "row-2",
    "md:hidden",
    "w-fit",
    "px-2",
    "rounded-2xl",
    "text-[14px]",
    "capitalize",
  );

  pTaskCardTwo.innerText = taskData.priority;
  divTaskCardContainer.append(pTaskCardTwo);

  // focus mode
  const divTaskCard4 = document.createElement("div");
  divTaskCard4.classList.add(
    "relative",
    "max-md:col-start-4",
    "max-md:row-2",
    "col-4",
    "rounded-xl",
    "flex",
    "items-center",
    "justify-center",
    "size-9",
    "hover:bg-black/10",
    "dark:hover:bg-gray-200/20",
    "cursor-pointer",
    "group/focus",
  );
  divTaskCard4.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-5 opacity-50 md:opacity-0 md:group-hover:opacity-35 hover:duration-200 dark:hover:text-white  group-hover/focus:dark:hover:opacity-100 dark:text-white"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            </svg>
`;
  divTaskCardContainer.append(divTaskCard4);

  const pTaskCard2 = document.createElement("p");
  pTaskCard2.classList.add(
    "absolute",
    "-bottom-6",
    "hidden",
    "rounded",
    "bg-black/70",
    "px-1.5",
    "py-0.5",
    "font-serif",
    "text-[11px]",
    "text-white",
    "md:group-hover/focus:block",
  );
  pTaskCard2.innerText = "Focus";
  divTaskCard4.append(pTaskCard2);

  // subtask
  const divTaskCard5 = document.createElement("div");
  divTaskCard5.classList.add(
    "relative",
    "max-md:col-5",
    "max-md:row-2",
    "rounded-xl",
    "flex",
    "items-center",
    "justify-center",
    "size-9",
    "hover:bg-black/10",
    "cursor-pointer",
    "group/subtask",
    "dark:hover:bg-gray-200/20",

    "js-subtask-icon",
  );

  const divTaskCard5svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  divTaskCard5svg.setAttribute("viewBox", "0 0 16 16");
  divTaskCard5svg.setAttribute("fill", "currentColor");
  divTaskCard5svg.classList.add(
    "size-5",
    "opacity-50",
    "md:opacity-0",
    "md:group-hover:opacity-35",
    "hover:duration-200",
    "dark:hover:text-white",
    "group-hover/subtask:dark:hover:opacity-100",
    "dark:text-white",
  );

  const divTaskCard5svgPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  divTaskCard5svgPath.setAttribute("fill-rule", "evenodd");
  divTaskCard5svgPath.setAttribute(
    "d",
    "M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z",
  );
  divTaskCard5svgPath.setAttribute("clip-rule", "evenodd");
  divTaskCard5svg.append(divTaskCard5svgPath);
  divTaskCard5.append(divTaskCard5svg);
  divTaskCardContainer.append(divTaskCard5);

  const pTaskCard3 = document.createElement("p");
  pTaskCard3.classList.add(
    "absolute",
    "hidden",
    "md:group-hover/subtask:block",
    "text-[11px]",
    "-bottom-6",
    "bg-black/70",
    "text-white",
    "px-1.5",
    "py-0.5",
    "rounded",
    "font-serif",
  );
  pTaskCard3.innerText = "Subtask";
  divTaskCard5.append(pTaskCard3);

  // trash
  const divTaskCard6 = document.createElement("div");
  divTaskCard6.classList.add(
    "group/trash",
    "relative",
    "max-md:col-start-6",
    "max-md:row-2",
    "flex",
    "size-9",
    "cursor-pointer",
    "items-center",
    "justify-center",
    "rounded-xl",
    "hover:bg-black/10",
    "dark:hover:bg-gray-200/20",
  );
  divTaskCard6.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 opacity-50 md:opacity-0 md:group-hover:opacity-35 hover:duration-200 dark:hover:text-white  group-hover/trash:dark:hover:opacity-100 dark:text-white dark:active:outline-gray-200/80"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>

`;
  divTaskCardContainer.append(divTaskCard6);

  const pTaskCard4 = document.createElement("p");
  pTaskCard4.classList.add(
    "absolute",
    "hidden",
    "md:group-hover/trash:block",
    "text-[11px]",
    "-bottom-6",
    "bg-black/70",
    "text-white",
    "px-1.5",
    "py-0.5",
    "rounded",
    "font-serif",
    "dark:hover:bg-gray-200/20",
  );
  pTaskCard4.innerText = "Delete";
  divTaskCard6.append(pTaskCard4);

  // Subtask Icon
  const subtaskContainer = document.createElement("div");
  subtaskContainer.dataset.id = labelId;
  subtaskContainer.classList.add(
    "max-h-0",
    "opacity-0",
    "overflow-hidden",
    "transition-[max-height,opacity,padding,margin]",
    "duration-300",
    "relative",
    "mx-5",
    "flex",
    "min-w-0",
    "items-center",
    "rounded-2xl",
    "border",
    "border-gray-200/40",
    "dark:border-gray-200/10",
    "px-2.5",
    "shadow-2xs",
  );
  _divTask.append(subtaskContainer);

  //  USER INPUT CONTAINER
  const subParentDiv = document.createElement("div");
  subParentDiv.classList.add(
    "min-h-0",
    "ml-7",
    "flex",
    "h-full",
    "items-center",
    "sm:ml-10",
    "wrap-break-word",
  );
  subtaskContainer.append(subParentDiv);
  const subTaskButton = document.createElement("button");
  subTaskButton.classList.add(
    "size-7",
    "flex",
    "items-center",
    "justify-center",
    "cursor-pointer",
    "hover:bg-black/10",
    "dark:hover:bg-gray-200/20",
    "rounded-xl",
  );
  subParentDiv.append(subTaskButton);
  subTaskButton.innerHTML = `<svg
          class="size-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>`;

  const subtaskFormContainer = document.createElement("form");
  subtaskFormContainer.classList.add("ml-2", "w-5/10", "min-h-0");
  subtaskContainer.append(subtaskFormContainer);

  const subtaskLabel = document.createElement("label");
  subtaskFormContainer.append(subtaskLabel);
  subtaskLabel.htmlFor = "subtask";

  const subtaskInput = document.createElement("input");
  subtaskInput.type = "text";
  subtaskInput.id = "subtask";
  subtaskInput.classList.add(
    "outline-0",
    "placeholder:opacity-60",
    "w-full",
    "dark:text-white",
    "dark:placeholder:text-gray-100/70",
  );
  subtaskInput.placeholder = "Add subtask...";
  subtaskFormContainer.append(subtaskInput);

  const subtaskNotice = document.createElement("p");
  subtaskNotice.classList.add(
    "absolute",
    "bottom-1",
    "left-20",
    "text-sm",
    "text-red-400",
  );
  subtaskContainer.append(subtaskNotice);

  return {
    pTaskCard,
    pTaskCardTwo,
    inputTaskCard,
    divTaskCard6,
    divTaskCardContainer,
    divTaskCard5,
    subtaskContainer,
    subParentDiv,
    subtaskInput,
    subTaskButton,
    subtaskNotice,
    subtaskFormContainer,
    _divTask,
    divTaskCard4,
    divTaskCard5svg,
  };
};

export const subtaskItem = (subtaskInputValue, tasksId) => {
  const subtaskInnerParent = document.createElement("div");
  subtaskInnerParent.dataset.id = tasksId;
  subtaskInnerParent.classList.add(
    "relative",
    "mt-1",
    "mx-5",
    "ml-10",
    "pl-10",
    "min-h-20",
    "grid",
    "grid-cols-[_minmax(0,1fr)_auto]",
    "items-center",
    "justify-between",
    "gap-4",
    "rounded-2xl",
    "border",
    "border-gray-200/40",
    "px-2.5",
    "py-2",
    "pr-5",
    "shadow-2xs",
    "dark:border-gray-200/10",
    "dark:bg-transparent",
  );
  const subtaskH4 = document.createElement("h4");
  subtaskH4.innerText = subtaskInputValue;
  subtaskH4.classList.add(
    "ml-7",
    "wrap-break-word",
    "dark:text-white",
    "dark:placeholder:text-gray-100/70",
  );
  const subtaskTrashIcon = document.createElement("div");
  subtaskTrashIcon.classList.add(
    "group/x",
    "flex",
    "size-9",
    "shrink-0",
    "cursor-pointer",
    "items-center",
    "justify-center",
    "rounded-xl",
    "hover:bg-black/10",
    "dark:hover:bg-gray-200/20",
  );
  subtaskTrashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 opacity-35 dark:text-white active:size-5.5 dark:group-hover:text-white dark:group-hover:opacity-75 dark:hover:opacity-100 dark:active:outline-gray-200/80">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
    </svg>`;
  const subtaskParagraph = document.createElement("p");
  subtaskParagraph.classList.add(
    "absolute",
    "-bottom-1",
    "hidden",
    "rounded",
    "bg-black/70",
    "px-1.5",
    "py-0.5",
    "font-serif",
    "text-[10px]",
    "text-white",
    "md:group-hover/x:block",
  );
  subtaskParagraph.innerText = "Delete";
  subtaskInnerParent.append(subtaskH4, subtaskTrashIcon);
  subtaskTrashIcon.append(subtaskParagraph);

  return {
    subtaskInnerParent,
    subtaskTrashIcon,
  };
};

// Fullscreen capture mode
export const fullscreenFocusMode = (task) => {
  const fullscreenOuterParent = document.getElementById("outer-parent");
  const fullscreenParent = document.createElement("div");
  fullscreenParent.classList.add(
    "fixed",
    "z-10",
    "inset-0",
    "h-dvh",
    "overflow-hidden",
    "bg-darkMode",
    "opacity-0",
    "transition-all",
    "duration-200",
    "ease-out",
  );

  fullscreenOuterParent.append(fullscreenParent);

  setTimeout(() => {
    fullscreenParent.classList.add("opacity-100");
  }, 100);

  const fullscreenCloseButton = document.createElement("button");
  fullscreenParent.append(fullscreenCloseButton);

  fullscreenCloseButton.classList.add(
    "absolute",
    "top-6",
    "right-5",
    "cursor-pointer",
    "rounded-full",
    "p-1",
    "hover:bg-gray-200/10",
  );

  fullscreenCloseButton.innerHTML = `
    <svg
      class="size-7 text-gray-200/50"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18 17.94 6M18 18 6.06 6"
      />
    </svg>
  `;

  const fullscreenInnerParent = document.createElement("div");
  fullscreenInnerParent.classList.add(
    "flex",
    "min-h-dvh",
    "max-w-full",
    "min-w-0",
    "items-center",
    "justify-center",
    "px-4",
    "py-20",
  );

  fullscreenParent.append(fullscreenInnerParent);

  const fullscreenInnerParent2 = document.createElement("div");
  fullscreenInnerParent2.classList.add("max-w-full", "min-w-0", "text-center");

  fullscreenInnerParent.append(fullscreenInnerParent2);

  const fullscreenTime = document.createElement("p");
  fullscreenTime.classList.add(
    "mb-12",
    "font-serif",
    "text-[17px]",
    "tracking-wider",
    "text-gray-200/30",
  );

  fullscreenTime.innerText = "23:14";
  fullscreenInnerParent2.append(fullscreenTime);

  const fullscreenInnerParent3 = document.createElement("div");
  fullscreenInnerParent3.classList.add(
    "space-y-10",
    "opacity-0",
    "transition-transform",
    "duration-300",
    "-translate-y-4",
    "ease-out",
  );

  setTimeout(() => {
    fullscreenInnerParent3.classList.add("opacity-100", "translate-y-1");
  }, 300);

  fullscreenInnerParent2.append(fullscreenInnerParent3);

  const fullscreenInnerParent3Text = document.createElement("p");
  fullscreenInnerParent3Text.classList.add(
    "mx-auto",
    "mb-5",
    "w-fit",
    "rounded-2xl",
    "bg-gray-200/10",
    "px-3",
    "py-0.5",
    "text-[12.5px]",
    "tracking-widest",
    "text-gray-200/60",
    "uppercase",
  );

  fullscreenInnerParent3Text.innerText = "current focus";

  const fullscreenInnerParentH4 = document.createElement("h4");
  fullscreenInnerParentH4.classList.add(
    "mt-5",
    "font-serif",
    "text-5xl",
    "tracking-wide",
    "wrap-break-word",
    "text-white",
    "text-center",
  );

  fullscreenInnerParentH4.innerText = task;

  const fullscreenInnerParentButton = document.createElement("button");
  fullscreenInnerParentButton.classList.add(
    "mx-auto",
    "mt-17",
    "flex",
    "cursor-pointer",
    "items-center",
    "justify-center",
    "gap-x-3",
    "rounded-full",
    "bg-white",
    "px-8.5",
    "py-4",
    "duration-300",
    "ease-in-out",
    "hover:scale-105",
  );

  fullscreenInnerParentButton.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-6 shrink-0"
    >
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  `;

  fullscreenInnerParent3.append(
    fullscreenInnerParent3Text,
    fullscreenInnerParentH4,
    fullscreenInnerParentButton,
  );

  const fullscreenInnerParentText4 = document.createElement("p");
  fullscreenInnerParentText4.classList.add(
    "text-[17px]",
    "min-w-0",
    "font-medium",
    "tracking-wide",
    "wrap-anywhere",
    "md:text-xl",
  );

  fullscreenInnerParentText4.innerText = "Complete Task";

  fullscreenInnerParentButton.append(fullscreenInnerParentText4);

  return {
    fullscreenCloseButton,
    fullscreenParent,
    fullscreenInnerParentButton,
  };
};
