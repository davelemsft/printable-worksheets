const files = [
  { label: "🔎 Find the differences #1", path: "Circle the Difference 1.svg" },
  { label: "🔎 Find the differences #2", path: "Circle the Difference 2.svg" },
  { label: "🔎 Find the differences #3", path: "Circle the Difference 3.svg" },
  { label: "🔎 Find the differences #4", path: "Circle the Difference 4.svg" },
  { label: "🔎 Find the differences #5", path: "Circle the Difference 5.svg" },
].map((f) => ({ ...f, path: `images/differences/${f.path}` }));

const loadFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = file.path;

    img.addEventListener("load", () => resolve(img));
  });
};

export { loadFile, files };
