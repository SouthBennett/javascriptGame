

let score = 0;
let pointsPerClick = 1;


function updateDisplay() {
    document.getElementById("score-display").textContent = 'Score: ' + score;
    document.getElementById("rate-display").textContent = 'Points per click: ' + pointsPerClick;
};

document.getElementById('click-btn').addEventListener("click", function() {
    score += pointsPerClick;
    updateDisplay();
    renderUpgrades();
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

  const button = document.createElement('button');
  button.textContent = 'Buy';
  button.onclick = () => buyUpgrade(element.id);
  if(score < element.cost){
      button.disabled = true;
  } else {
    button.disabled = false; 
  }




  div.innerHTML = `
    <strong> ${element.name}</strong>
    Cost: ${element.cost} | +${element.bonus} per click
    
    
  `;
  upgradeRender.appendChild(div);
  upgradeRender.appendChild(button);

  });
};

function buyUpgrade(id) {
  const upgrade = upgrades.find(el => el.id === id);

  if (score >= upgrade.cost) {
    score -= upgrade.cost;
    pointsPerClick += upgrade.bonus;
    updateDisplay();
    renderUpgrades();
  }

}

renderUpgrades();