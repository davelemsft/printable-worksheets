const standardColours = [
  "red",
  "blue",
  "green",
  "yellow",
  "pink",
  "orange",
  "black",
];

const setupPallet = (context) => {
  const pallet = document.getElementById("pallet");
  const coloursList = document.getElementById("colours");
  pallet.addEventListener("click", () => {
    coloursList.classList.toggle("hidden");
  });

  standardColours.map((colour) => {
    const item = document.createElement("li");
    item.classList.add("colour");
    item.style.backgroundColor = colour;
    item.addEventListener("click", () => {
      context.strokeStyle = colour;
      context.lineJoin = "round";
      context.lineWidth = 5;
    });
    coloursList.appendChild(item);
  });

  context.strokeStyle = standardColours[0];
  context.lineJoin = "round";
  context.lineWidth = 5;
};

export { setupPallet };
