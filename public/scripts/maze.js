const files = [
  { label: "🗺 Maze", path: "Maze 3.svg" },
].map((f) => ({ ...f, path: `images/maze/${f.path}` }));

const loadFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = file.path;

    img.addEventListener("load", () => resolve(img));
  });
};

export { loadFile, files };
