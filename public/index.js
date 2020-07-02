"use strict";
(async () => {
  let x, y, isPainting;
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const { setupPallet } = await import("./scripts/colours.js");

  const scaleToFill = (img, ctx) => {
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const top = canvas.width / 2 - (img.width / 2) * scale;
    const left = canvas.height / 2 - (img.height / 2) * scale;
    ctx.drawImage(img, top, left, img.width * scale, img.height * scale);
  };

  const setSize = () => {
    // set dimensions on the canvas
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    const img = new Image();
    img.src = "images/colouring-01.png";
    img.addEventListener("load", () => {
      scaleToFill(img, context);
    });
  };

  setSize();
  setupPallet(context);

  window.addEventListener("resize", setSize);

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
})();
