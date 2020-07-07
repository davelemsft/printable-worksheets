const files = [
  { label: "Connecet the dots", path: "Connect the dots 1.svg" },
].map((f) => ({ ...f, path: `images/connect-the-dots/${f.path}` }));

const loadFile = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = file.path;

    img.addEventListener("load", () => resolve(img));
  });
};

export { loadFile, files };
