const menu = document.getElementById("menu");
const menuItems = document.getElementById("menu-options");

const setupMenu = (files) => {
  menu.addEventListener("click", toggleMenu);

  files.map((file) => {
    const item = document.createElement("li");
    item.innerHTML = file.label;
    item.title = `Select ${file.label}`;
    item.classList.add("file");

    item.addEventListener("click", file.click);

    menuItems.appendChild(item);
  });
};

const toggleMenu = () => {
    menuItems.classList.toggle("hidden")
}

const hideMenu = () => {
    if (!menuItems.classList.contains("hidden")) {
      toggleMenu();
    }
  }

export { setupMenu, toggleMenu, hideMenu };
