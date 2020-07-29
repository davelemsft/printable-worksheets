let x, y, isPainting, width, height;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const scaleToFill = (img, ctx) => {
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const top = canvas.width / 2 - (img.width / 2) * scale;
  const left = canvas.height / 2 - (img.height / 2) * scale;
  width = img.width * scale;
  height = img.height * scale;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, top, left, width, height);
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

function paint(e) {
  if (isPainting) {
    let [newX, newY] = getCoordinates(e);
    drawLine(x, y, newX, newY);
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

export { setupCanvas, scaleToFill, context, setSize };
