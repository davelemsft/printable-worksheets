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

  const bindClick = (file, fn, pageType, index) => async () => {
    window.currentFile = {
      pageType,
      index
    };
    img = await fn(file);
    scaleToFill(img, context);
    hidePallet();
    hideMenu();
  };

  setupMenu(
    [
      {
        label: "Colouring",
        files: colouringFiles.map((f, i) => {
          return {
            ...f,
            click: bindClick(f, loadColouring, "colouring", i),
          };
        }),
      },
      {
        label: "Connect the dots",
        files: connectTheDotsFiles.map((f, i) => {
          return {
            ...f,
            click: bindClick(f, loadConnectTheDots, "connectthedots", i),
          };
        }),
      },
      {
        label: "Find the differences",
        files: differencesFiles.map((f, i) => {
          return {
            ...f,
            click: bindClick(f, loadDifferences, "differences", i),
          };
        }),
      },
      {
        label: "Mazes",
        files: mazeFiles.map((f, i) => {
          return {
            ...f,
            click: bindClick(f, loadMaze, "maze", i),
          };
        }),
      },
    ],
    context
  );

  const routeInfo = await parseUrl();
  window.currentFile = routeInfo;

  let img = await routeInfo.load();
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
