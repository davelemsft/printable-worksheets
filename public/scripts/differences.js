const files = [
  { label: "🔎 Find the differences", path: "Circle the Difference 1.svg" },
].map((f) => ({ ...f, path: `images/differences/${f.path}` }));

const loadFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = file.path;

    img.addEventListener("load", () => resolve(img));
  });
};

export { loadFile, files };
