function parseUrl() {
  const colouringFileIndex = parseInt(window.location.pathname.substring(1)) || 0;
  return {
    colouringFileIndex
  };
}

export { parseUrl };