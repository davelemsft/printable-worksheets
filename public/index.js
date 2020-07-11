"use strict";
(async () => {
  const { setupCanvas, scaleToFill, context, setSize, drawLineRelative } = await import(
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
    // reset draw-with-friends mode
    window.history.replaceState(null, document.title, "/");
    document.body.classList.remove("draw-with-friends");

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
  if (routeInfo.sessionId) {
    document.body.classList.add("draw-with-friends");

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`/api/sessions/${routeInfo.sessionId}`)
      .withAutomaticReconnect()
      .build();

    connection.on("newLines", function(data) {
      const isFromThisClient = data.clientId === routeInfo.clientId;
      if (isFromThisClient) return;

      for (const line of data.lines) {
        drawLineRelative(line.x1, line.y1, line.x2, line.y2, line.c);
      }
    });

    await connection.start();

    setInterval(async () => {
      if (window.lineBuffer && window.lineBuffer.length) {
        console.log({
          user: "1",
          lines: window.lineBuffer
        });

        const payload = {
          clientId: routeInfo.clientId,
          lines: window.lineBuffer
        };
        window.lineBuffer = [];

        await fetch(`/api/sessions/${routeInfo.sessionId}/draw`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }
    }, 250);
  }

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
