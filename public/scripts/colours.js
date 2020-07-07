const standardColours = [
  "red",
  "blue",
  "green",
  "yellow",
  "pink",
  "orange",
  "black",
];
const pallet = document.getElementById("pallet");
const coloursList = document.getElementById("colours");

const makeColour = (colour) => {
  const item = document.createElement("li");
  item.classList.add("colour");
  item.style.backgroundColor = colour;
  item.addEventListener("click", () => {
    context.strokeStyle = colour;
    context.lineJoin = "round";
    context.lineWidth = 5;
  });
  coloursList.appendChild(item);
};

const setupPallet = (context) => {
  pallet.addEventListener("click", togglePallet);

  standardColours.map(makeColour);

  const input = document.createElement("input");
  input.type = "color";
  input.title = "Select a custom colour";
  input.addEventListener("change", ({ target: { value } }) => {
    makeColour(value);
    context.strokeStyle = value;
    context.lineJoin = "round";
    context.lineWidth = 5;
    togglePallet();
  });

  const item = document.createElement("li");
  item.classList.add("colour");
  item.appendChild(input);
  coloursList.appendChild(item);

  context.strokeStyle = standardColours[0];
  context.lineJoin = "round";
  context.lineWidth = 5;
};

const togglePallet = () => {
  coloursList.classList.toggle("hidden");
};

const hidePallet = () => {
  if (!coloursList.classList.contains("hidden")) {
    togglePallet();
  }
};

export { setupPallet, togglePallet, hidePallet };
