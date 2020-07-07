const menu = document.getElementById("menu");
const menuItems = document.getElementById("menu-options");

const setupMenu = (files, context) => {
  menu.addEventListener("click", toggleMenu);

  files.map((file) => {
    const item = document.createElement("li");
    item.innerHTML = file.label;
    item.title = `Select ${file.label}`;
    item.classList.add("file");

    item.addEventListener("click", file.click);

    menuItems.appendChild(item);
  });

  const save = document.createElement("li");
  save.classList.add("file");
  const link = document.createElement("a");
  link.innerHTML = "💾 Save";
  link.title = "Save drawing";
  link.setAttribute("download", "drawing.png");
  link.addEventListener(
    "click",
    () => (link.href = context.canvas.toDataURL("image/png"))
  );
  save.appendChild(link);
  menuItems.appendChild(save);

  const reset = document.createElement("li");
  reset.classList.add("file");
  reset.innerHTML = "🧹 Reset";
  reset.title = "Reset";
  reset.addEventListener("click", () =>
    window.dispatchEvent(new Event("resize"))
  );
  menuItems.appendChild(reset);
};

const toggleMenu = () => menuItems.classList.toggle("hidden");

const hideMenu = () => {
  if (!menuItems.classList.contains("hidden")) {
    toggleMenu();
  }
};

export { setupMenu, toggleMenu, hideMenu };
