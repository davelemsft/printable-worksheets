const files = [
  { label: "✏ Connecet the dots #1", path: "Connect the dots 1.svg" },
  { label: "✏ Connecet the dots #2", path: "Connect the dots 2.svg" },
  { label: "✏ Connecet the dots #3", path: "Connect the dots 3.svg" },
  { label: "✏ Connecet the dots #4", path: "Connect the dots 4.svg" },
  { label: "✏ Connecet the dots #5", path: "Connect the dots 5.svg" },
].map((f) => ({ ...f, path: `images/connect-the-dots/${f.path}` }));

const loadFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = file.path;

    img.addEventListener("load", () => resolve(img));
  });
};

export { loadFile, files };
