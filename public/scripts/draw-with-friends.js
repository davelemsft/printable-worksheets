async function parseUrl() {
  const matches = /\/(.+?)-(\d+?)-(.+?)$/.exec(window.location.pathname);
  let pageType = "colouring";
  let index = 0;
  let sessionId;
  if (matches) {
    pageType = matches[1];
    index = parseInt(matches[2]);
    sessionId = matches[3];
  }

  const { loadFile, files } = await import({
    colouring: "./imagination-and-colour.js",
    connectthedots: "./connect-the-dots.js",
    differences: "./differences.js",
    maze: "./maze.js"
  }[pageType]);

  const load = function() {
    return loadFile(files[index]);
  }

  return {
    load,
    loadFile,
    files,
    pageType,
    index,
    sessionId
  };
}

async function generateSessionId() {
  const { default: uuid } = await import("https://cdn.jsdelivr.net/npm/uuid@8.2.0/dist/esm-browser/v4.js");
  return uuid().replace(/-/g, "");
}

export {
  parseUrl,
  generateSessionId
};