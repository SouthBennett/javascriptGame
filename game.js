

let score = 0;
let pointsPerClick = 1;


function updateDisplay() {
    document.getElementById("score-display").textContent = 'Score: ' + score;
    document.getElementById("rate-display").textContent = 'Points per click: ' + pointsPerClick;
};

document.getElementById('click-btn').addEventListener("click", function() {
    score += pointsPerClick;
    updateDisplay();
});

const upgrades = [
  {
    id: 1,
    name: "double points per click",
    cost: 10,
    bonus: pointsPerClick * 2
  },
  {
    id: 2,
    name: "triple points per click",
    cost: 20,
    bonus: pointsPerClick * 3
  },
  {
    id: 3,
    name: "x5 points per click",
    cost: 50,
    bonus: pointsPerClick * 5
  }
];


function renderUpgrades(){
  const upgradeRender = document.getElementById("upgrades");
  upgradeRender.innerHTML = "";

  upgrades.forEach(element => {
  const div = document.createElement('div');

  div.innerHTML = `
  <strong> ${element.name}</strong>
  Cost: ${element.cost} | +${element.bonus} per click
  <button onclick="buyUpgrade(${element.id})">Buy</button>
  
  `;
  upgradeRender.appendChild(div);

  });
};

renderUpgrades();