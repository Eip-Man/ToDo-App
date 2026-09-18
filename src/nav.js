export const nav = () => {
  const loop = document.querySelectorAll(".js-class");
  for (let i = 0; i < loop.length; i++) {
    const element = loop[i];
    element.classList.add(
      "group",
      "flex",
      "gap-4",
      "font-serif",
      "w-full",
      "p-2.5",
      "rounded-xl",
      "pl-5",
      "ml-3",
      "tracking-wide",
      "hover:bg-gray-200/50",
      "focus:bg-white",
      "focus:drop-shadow-md",
      "focus:opacity-100",
      "cursor-pointer",
      "duration-200",
      "dark:hover:bg-gray-200/20",
      "dark:focus:bg-gray-100/35",
    );
  }
};
