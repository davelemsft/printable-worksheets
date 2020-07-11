let x, y, isPainting;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let imgLocation = {};

const scaleToFill = (img, ctx) => {
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const left = canvas.width / 2 - (img.width / 2) * scale;
  const top = canvas.height / 2 - (img.height / 2) * scale;
  const width = img.width * scale;
  const height = img.height * scale;
  ctx.clearRect(left, top, width, height);
  ctx.drawImage(img, left, top, width, height);
  imgLocation = { left, top, width, height };
};

const setSize = (img) => {
  canvas.setAttribute("width", window.innerWidth - 20);
  canvas.setAttribute("height", window.innerHeight - 20);
  scaleToFill(img, context);
};

function getCoordinates(event) {
  // check to see if mobile or desktop
  if (["mousedown", "mousemove"].includes(event.type)) {
    // click events
    return [event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop];
  } else {
    // touch coordinates
    return [
      event.touches[0].pageX - canvas.offsetLeft,
      event.touches[0].pageY - canvas.offsetTop,
    ];
  }
}

function startPaint(e) {
  // change the old coordinates to the new ones
  isPainting = true;
  let coordinates = getCoordinates(e);
  x = coordinates[0];
  y = coordinates[1];
}

canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("touchstart", startPaint);

function drawLine(firstX, firstY, secondX, secondY) {
  context.beginPath();
  context.moveTo(secondX, secondY);
  context.lineTo(firstX, firstY);
  context.closePath();
  context.stroke();
}

function saveLine(x1, y1, x2, y2) {
  if (!window.currentFile || !window.currentFile.sessionId) return;

  if (!window.lineBuffer) {
    window.lineBuffer = [];
  }

  // convert to relative coordinates
  x1 = Math.round((x1 - imgLocation.left) / imgLocation.width * 10000);
  y1 = Math.round((y1 - imgLocation.top) / imgLocation.height * 10000);
  x2 = Math.round((x2 - imgLocation.left) / imgLocation.width * 10000);
  y2 = Math.round((y2 - imgLocation.top) / imgLocation.height * 10000);

  const c = context.strokeStyle;
  window.lineBuffer.push({ x1, y1, x2, y2, c });
}

function drawLineRelative(x1, y1, x2, y2, colour) {
  if (colour) {
    context.strokeStyle = colour;
  }
  x1 = (x1 / 10000 * imgLocation.width) + imgLocation.left;
  y1 = (y1 / 10000 * imgLocation.height) + imgLocation.top;
  x2 = (x2 / 10000 * imgLocation.width) + imgLocation.left;
  y2 = (y2 / 10000 * imgLocation.height) + imgLocation.top;
  drawLine(x1, y1, x2, y2);
}

function paint(e) {
  if (isPainting) {
    let [newX, newY] = getCoordinates(e);
    drawLine(x, y, newX, newY);
    saveLine(x, y, newX, newY);
    x = newX;
    y = newY;
  }
}

canvas.addEventListener("mousemove", paint);
canvas.addEventListener("touchmove", paint);

function exit() {
  isPainting = false;
}

canvas.addEventListener("mouseup", exit);
canvas.addEventListener("mouseleave", exit);
canvas.addEventListener("touchend", exit);

const setupCanvas = (img) => {
  setSize(img);
};

export { setupCanvas, scaleToFill, context, setSize, drawLineRelative };
