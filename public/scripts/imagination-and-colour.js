const files = [
  { label: "Bit's Birthday", path: "Imagination and Colour 1.svg" },
].map((f) => ({ ...f, path: `images/imagination-and-colour/${f.path}` }));

const loadFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = file.path;

    img.addEventListener("load", () => resolve(img));
  });
};

export { loadFile, files };
