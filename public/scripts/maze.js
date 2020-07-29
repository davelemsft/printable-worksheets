const files = [
  // { label: "🗺 Maze #1", path: "Maze 1.svg" },
  // { label: "🗺 Maze #2", path: "Maze 2.svg" },
  { label: "🗺 Bit at the zoo", path: "Maze 3.svg" },
  // { label: "🗺 Maze #4", path: "Maze 4.svg" },
  // { label: "🗺 Maze #5", path: "Maze 5.svg" },
].map((f) => ({ ...f, path: `images/maze/${f.path}` }));

const loadFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = file.path;

    img.addEventListener("load", () => resolve(img));
  });
};

export { loadFile, files };
