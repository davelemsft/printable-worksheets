const menu = document.getElementById("menu");
const menuItems = document.getElementById("menu-options");

const setupMenu = (groups, context) => {
  menu.addEventListener("click", toggleMenu);

  groups.map((group) => {
    const files = group.files;
    const subMenu = document.createElement("ul");
    subMenu.classList.add("hidden");

    files.map((file) => {
      const item = document.createElement("li");
      item.innerHTML = file.label;
      item.title = `Select ${file.label}`;

      item.addEventListener("click", file.click);

      subMenu.appendChild(item);
    });
    const li = document.createElement("li");
    li.classList.add("file");
    li.classList.add("closed");
    li.innerText = group.label;
    li.appendChild(subMenu);
    li.addEventListener("click", () => {
      subMenu.classList.toggle("hidden");
      li.classList.toggle("open");
      li.classList.toggle("closed");
    });
    menuItems.append(li);
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
  reset.addEventListener("click", () =>
    window.dispatchEvent(new Event("resize"))
  );
  menuItems.appendChild(reset);

  const about = document.createElement("li");
  about.classList.add("file");
  about.innerHTML = "💡 About";
  about.title = "About this app";
  about.addEventListener("click", () => {
    window.open("https://github.com/aaronpowell/printable-worksheets");
  });
  menuItems.append(about);
};

const toggleMenu = () => menuItems.classList.toggle("hidden");

const hideMenu = () => {
  if (!menuItems.classList.contains("hidden")) {
    toggleMenu();
  }
};

export { setupMenu, toggleMenu, hideMenu };
