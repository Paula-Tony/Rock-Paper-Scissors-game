let containerElement = document.querySelector(".container");
let rulesBtn = document.querySelector(".rules");
let score = document.getElementById("score");

window.onload = function () {
  if (sessionStorage.getItem("score")) {
    score.innerHTML = sessionStorage.getItem("score");
  }
};

rulesBtn.onclick = function () {
  let popupOverlay = document.createElement("div");
  popupOverlay.className = "popup-overlay";
  containerElement.appendChild(popupOverlay);
  let popupRules = document.createElement("div");
  popupRules.className = "popup-rules";
  let popupHead = document.createElement("div");
  popupHead.className = "popup-head";
  let title = document.createElement("span");
  title.className = "title";
  title.innerHTML = "rules";
  popupHead.appendChild(title);
  let closeBtn = document.createElement("img");
  closeBtn.className = "close";
  closeBtn.src = "images/icon-close.svg";
  popupHead.appendChild(closeBtn);
  let rulesImg = document.createElement("img");
  rulesImg.className = "rules-img";
  rulesImg.src = "images/image-rules-bonus.svg";
  popupRules.appendChild(popupHead);
  popupRules.appendChild(rulesImg);
  containerElement.appendChild(popupRules);
  closeBtn.onclick = function () {
    popupOverlay.remove();
    popupRules.remove();
  };
};

let shapesObj = {
  scissors: ["paper", "lizard"],
  spock: ["scissors", "rock"],
  paper: ["rock", "spock"],
  rock: ["scissors", "lizard"],
  lizard: ["spock", "paper"],
};

let shapes = document.querySelectorAll("#step-one button");
shapes.forEach((shape, index) => {
  shape.addEventListener("click", function () {
    let pickedShape = shape.cloneNode(true);
    let shapesNotPicked = [...shapes];
    shapesNotPicked.splice(index, 1);
    let randomShape = shapesNotPicked[Math.trunc(Math.random() * 4)];
    let stepOne = document.getElementById("step-one");
    stepOne.style.display = "none";

    let stepTwo = document.createElement("div");
    stepTwo.className = "step-two";
    stepTwo.id = "step-two";

    let shapeYou = document.createElement("div");
    shapeYou.classList.add("shape");
    shapeYou.classList.add("you");
    let shapeYouTitle = document.createElement("p");
    shapeYouTitle.className = "title";
    shapeYouTitle.appendChild(document.createTextNode("You Picked"));
    shapeYou.appendChild(shapeYouTitle);
    pickedShape.classList.add("large-btn");
    shapeYou.appendChild(pickedShape);
    stepTwo.appendChild(shapeYou);

    let shapeHouse = document.createElement("div");
    shapeHouse.classList.add("shape");
    shapeHouse.classList.add("house");
    let shapeHouseTitle = document.createElement("p");
    shapeHouseTitle.className = "title";
    shapeHouseTitle.appendChild(document.createTextNode("The House Picked"));
    shapeHouse.appendChild(shapeHouseTitle);
    let circle = document.createElement("div");
    circle.className = "circle";
    shapeHouse.appendChild(circle);
    stepTwo.appendChild(shapeHouse);
    stepOne.after(stepTwo);
    setTimeout(() => {
      circle.remove();
      randomShape.classList.add("large-btn");
      shapeHouse.appendChild(randomShape);
    }, 1000);

    if (
      shapesObj[pickedShape.dataset.shape].includes(randomShape.dataset.shape)
    ) {
      setTimeout(() => {
        pickedShape.classList.add("win");
        score.innerHTML++;
        createWinMessage("you win");
      }, 2000);
    } else {
      setTimeout(() => {
        randomShape.classList.add("win");
        score.innerHTML--;
        createWinMessage("you lose");
      }, 2000);
    }
  });
});

function createWinMessage(text) {
  let message = document.createElement("div");
  message.className = "message";

  let span = document.createElement("span");
  span.appendChild(document.createTextNode(text));
  message.appendChild(span);

  let button = document.createElement("button");
  button.appendChild(document.createTextNode("play again"));
  button.id = "play-again";
  message.appendChild(button);

  document.querySelector(".you").after(message);
}

document.addEventListener("click", function (e) {
  if (e.target.id === "play-again") {
    let scoreValue = sessionStorage.setItem("score", score.innerHTML);
    location.reload();
  }
});
