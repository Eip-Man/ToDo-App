export const form = document.querySelector(".form-container");

export const wrapper = (task, _id) => {
  form.classList.add(
    "mx-5",
    "border",
    "border-gray-200/40",
    "shadow-2xs",
    "rounded-2xl",
    "z-2",
  );

  const h2 = document.createElement("h2");
  h2.classList.add("font-semibold", "text-2xl", "ml-2.5", "p-2");
  const span = document.createElement("span");
  span.classList.add(
    "mt-7",
    "mx-2",
    "border-t",
    "border-t-gray-200/50",
    "block",
  );
  const childDiv = document.createElement("div");
  childDiv.id = "grid-card";
  childDiv.classList.add(
    "m-5",
    "grid",
    "grid-cols-[90px_minmax(90px,1fr)_100px]",
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
  select.classList.add("outline-0", "w-fit", "capitalize");
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
    select.append(option);
  }

  const div2 = document.createElement("div");
  div2.classList.add("flex", "col-start-2", "md:col-start-auto");
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
                class="opacity-45 w-5 ml-2 md:ml-5"
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
  input.classList.add("text-sm", "ml-1.5", "w-27");
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
    "hover:bg-gray-200/50",
    "rounded-xs",
    "px-1.5",
    "cursor-pointer",
  );

  const _buttonSvg = document.createElement("button");
  _buttonSvg.title = "Cancel";
  _buttonSvg.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-3 cursor-pointer bg-black rounded-sm px-0.5 col-4"
            >
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
              <path d="m9 10-5 5 5 5" />
            </svg>`;
  div4.append(submitButton, _buttonSvg);

  // usable @ main.js
  return { input, submitButton, _buttonSvg, select, h2, span, childDiv };
};

//  container div card

export const cardDivItem = (tasks, labelId) => {
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
    "border-gray-200/40",
    "shadow-2xs",
    "hover:drop-shadow-md",
    "rounded-2xl",
    "bg-white",
    "grid",
    "grid-cols-6",
    "md:grid-cols-[auto_50px_minmax(0px,1fr)_50px_50px_50px]",
    "group",
    "has-checked:bg-gray-200/20",
    "my-3",
  );
  _divTask.append(divTaskCardContainer);

  const divTaskCard1 = document.createElement("div");
  divTaskCard1.classList.add("m-auto", "pl-3", "hidden", "md:block");
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
              class="opacity-0 group-hover:opacity-35"
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
  const labelTaskCard = document.createElement("label");
  labelTaskCard.classList.add("peer");
  labelTaskCard.htmlFor = labelId;
  labelTaskCard.classList.add("peer");
  const inputTaskCard = document.createElement("input");
  inputTaskCard.type = "radio";
  inputTaskCard.name = labelId;
  inputTaskCard.id = labelId;
  inputTaskCard.classList.add(
    "size-6",
    "h-full",
    "ml-4",
    "cursor-pointer",
    "opacity-75",
    "hover:opacity-100",
    "accent-black",
    "checked:hidden",
  );

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "currentColor");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute(
    "d",
    "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
  );
  path.setAttribute("clip-rule", "evenodd");
  svg.classList.add(
    "size-7",
    "hidden",
    "peer-has-checked:block",
    "ml-3",
    "h-full",
  );

  divTaskCardContainer.append(divTaskCard2);
  divTaskCard2.append(labelTaskCard, svg);
  svg.append(path);
  labelTaskCard.append(inputTaskCard);

  const divTaskCard3 = document.createElement("div");
  divTaskCard3.classList.add(
    "ml-3",
    "capitalize",
    "group-has-checked:opacity-60",
  );
  const h3TaskCard = document.createElement("h3");
  h3TaskCard.classList.add(
    "font-semibold",
    "text-xl",
    "mb-1.5",
    "group-has-checked:line-through",
    "text-clip",
  );
  h3TaskCard.innerText = tasks.title;
  divTaskCardContainer.append(divTaskCard3);
  divTaskCard3.append(h3TaskCard);

  const pTaskCard = document.createElement("p");
  pTaskCard.classList.add("w-fit", "px-2", "rounded-2xl", "text-[14px]");

  pTaskCard.innerText = tasks.priority;
  divTaskCard3.append(pTaskCard);
  // focus
  const divTaskCard4 = document.createElement("div");
  divTaskCard4.classList.add("m-auto", "relative", "col-4");
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
              class=" md:block opacity-0 group-hover:opacity-35 size-5 cursor-pointer peer"
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
    "hidden",
    "peer-hover:block",
    "text-[11px]",
    "-right-3",
    "mt-0.5",
    "bg-black/70",
    "text-white",
    "px-1.5",
    "py-0.5",
    "rounded",
    "font-serif",
  );
  pTaskCard2.innerText = "Focus";
  divTaskCard4.append(pTaskCard2);

  // subtask
  const divTaskCard5 = document.createElement("div");
  divTaskCard5.classList.add("m-auto", "relative", "size-5");
  divTaskCard5.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="opacity-0 group-hover:opacity-35 peer cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
`;
  divTaskCardContainer.append(divTaskCard5);

  const pTaskCard3 = document.createElement("p");
  pTaskCard3.classList.add(
    "absolute",
    "hidden",
    "peer-hover:block",
    "text-[11px]",
    "-right-2",
    "md:-right-4",
    "mt-0.5",
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
  divTaskCard6.classList.add("m-auto", "relative", "size-5", "cursor-pointer");
  divTaskCard6.innerHTML = ` <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="opacity-0 group-hover:opacity-35 peer"
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
    "peer-hover:block",
    "text-[11px]",
    "-right-2",
    "bg-black/70",
    "text-white",
    "px-1.5",
    "py-0.5",
    "rounded",
    "font-serif",
    "top-6",
  );
  pTaskCard4.innerText = "Delete";
  divTaskCard6.append(pTaskCard4);

  return { pTaskCard, inputTaskCard };
};
