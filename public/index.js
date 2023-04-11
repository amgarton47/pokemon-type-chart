const chart = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
  [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
  [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
];

const types = [
  "NORMAL",
  "FIRE",
  "WATER",
  "ELECTRIC",
  "GRASS",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DRAGON",
  "DARK",
  "STEEL",
  "FAIRY",
];

const createCell = function (parentId, html) {
  const cell = document.createElement("div");
  cell.innerHTML = html;
  document.getElementById(parentId).appendChild(cell);
  return cell;
};

const createFancyCell = function (parentId, html) {
  //   <div class="type-label fire">
  //   <div class="icon-label">
  //     <img src="icons/fire.svg" draggable="false" />
  //   </div>
  //   <div>FIRE</div>
  // </div>
  const cell = document.createElement("div");
  cell.classList.add("type-label", html.toLowerCase());

  const emblem = document.createElement("div");
  emblem.classList.add("icon-label");

  const img = document.createElement("img");
  img.src = `icons/${html.toLowerCase()}.svg`;
  img.draggable = "false";

  const innerDiv = document.createElement("div");
  innerDiv.innerHTML = html;

  emblem.appendChild(img);
  cell.appendChild(emblem);
  cell.appendChild(innerDiv);
  document.getElementById(parentId).appendChild(cell);
};

const clearGrid = () => {
  const grid = document.getElementById("chart");
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
};

let toggled = ["FIRE", "WATER", "GRASS"];
const buttons = Array.from(document.getElementsByClassName("icon"));

const populate = function () {
  // ensure pokemon types are always listed in the same order
  let temp = [];
  for (let i = 0; i < toggled.length; i++) {
    temp[types.indexOf(toggled[i])] = toggled[i];
  }
  temp = temp.filter((elm) => elm);
  toggled = temp;

  const grid = document.getElementById("chart");
  grid.style.gridTemplateColumns = `repeat(${toggled.length + 1}, 1fr)`;
  createCell("chart", "Attacker\\\\Defender");

  for (let i = 0; i < toggled.length; i++) {
    createFancyCell("chart", toggled[i]);
  }

  for (let i = 0; i < toggled.length; i++) {
    let row_idx = types.indexOf(toggled[i]);
    let row = chart[row_idx];

    createFancyCell("chart", toggled[i]);

    for (let j = 0; j < toggled.length; j++) {
      let col_idx = types.indexOf(toggled[j]);
      let col = row[col_idx];

      const cell = createCell("chart", `${col}`);

      if (col == 0) {
        cell.classList.toggle("no-effect");
      } else if (col == 1) {
        cell.classList.toggle("neutral");
      } else if (col == 2) {
        cell.classList.toggle("effective");
      } else if (col == 0.5) {
        cell.classList.toggle("ineffective");
      }
    }
  }
};

const handleClick = function () {
  this.classList.toggle("not-selected");
  clearGrid();
  const idx = toggled.indexOf(this.id.toUpperCase());
  if (idx > -1) {
    toggled.splice(idx, 1);
  } else {
    toggled.push(this.id.toUpperCase());
  }
  populate();
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = handleClick;
}

// initial population
populate();

const allButton = document.getElementById("all-btn");
const noneButton = document.getElementById("none-btn");

allButton.onclick = () => {
  toggled = [...types];
  clearGrid();

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("not-selected");
  }
  populate();
};

noneButton.onclick = () => {
  toggled = [];
  clearGrid();

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add("not-selected");
  }
  populate();
};
