"use strict";
(async () => {
  const { setupCanvas, scaleToFill, context, setSize } = await import(
    "./scripts/canvas.js"
  );
  const { setupPallet, hidePallet } = await import("./scripts/colours.js");
  const { setupMenu, hideMenu } = await import("./scripts/menu.js");
  const { loadFile: loadColouring, files: colouringFiles } = await import(
    "./scripts/imagination-and-colour.js"
  );
  const {
    loadFile: loadConnectTheDots,
    files: connectTheDotsFiles,
  } = await import("./scripts/connect-the-dots.js");
  const { loadFile: loadDifferences, files: differencesFiles } = await import(
    "./scripts/differences.js"
  );
  const { loadFile: loadMaze, files: mazeFiles } = await import(
    "./scripts/maze.js"
  );
  const { parseUrl } = await import("./scripts/draw-with-friends.js");

  const bindClick = (file, fn) => async () => {
    img = await fn(file);
    scaleToFill(img, context);
    hidePallet();
    hideMenu();
  };

  setupMenu(
    [
      {
        label: "Colouring",
        files: colouringFiles.map((f) => {
          return {
            ...f,
            click: bindClick(f, loadColouring),
          };
        }),
      },
      {
        label: "Connect the dots",
        files: connectTheDotsFiles.map((f) => {
          return {
            ...f,
            click: bindClick(f, loadConnectTheDots),
          };
        }),
      },
      {
        label: "Find the differences",
        files: differencesFiles.map((f) => {
          return {
            ...f,
            click: bindClick(f, loadDifferences),
          };
        }),
      },
      {
        label: "Mazes",
        files: mazeFiles.map((f) => {
          return {
            ...f,
            click: bindClick(f, loadMaze),
          };
        }),
      },
    ],
    context
  );

  let img = await loadColouring(colouringFiles[parseUrl().colouringFileIndex]);
  setupCanvas(img);
  setupPallet(context);

  window.addEventListener("resize", () => setSize(img));

  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      hideMenu();
      hidePallet();
    }
  });
})();
