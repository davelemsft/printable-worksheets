const files = [
  { label: "🖌 Bit's Birthday", path: "Imagination and Colour 1.svg" },
  { label: "🖌 Bit's Robot", path: "Imagination and Colour 2.svg" },
  { label: "🖌 Bit's Castle", path: "Imagination and Colour 3.svg" },
  { label: "🖌 Bit and Felix", path: "Imagination and Colour 4.svg" },
  { label: "🖌 Bit's Favourite Season", path: "Imagination and Colour 5.svg" },
].map((f) => ({ ...f, path: `images/imagination-and-colour/${f.path}` }));

const loadFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = file.path;

    img.addEventListener("load", () => resolve(img));
  });
};

export { loadFile, files };
