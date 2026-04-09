const scoreToWin = 200;
let winner = false;

let score = 0;
let pointsPerClick = 1;

let laser = 0;
let crew = 0;
let cargo = 0;

let drillBot = 0;
let betterDrill = 0;

let autobot = 0;
let drillPurchased =  false;


function updateDisplay() {
    document.getElementById("score-display").textContent = 'Minerals Collected: ' + score;
    document.getElementById("rate-display").textContent = 'Harvest Rate +' + pointsPerClick;
    document.getElementById("auto-display").textContent = 'Auto Mine: +' + autobot + '/sec';
};

document.getElementById('click-btn').addEventListener("click", function() {
    score += pointsPerClick;
    showFloatingText("+" + pointsPerClick);
    updateDisplay();
    checkWin();
    renderUpgrades();
});

const upgrades = [
  {
    id: 1,
    name: "Space Laser",
    cost: 10,
    bonus: pointsPerClick * 2
  },
  {
    id: 2,
    name: "Add Crew",
    cost: 20,
    bonus: pointsPerClick * 3
  },
  {
    id: 3,
    name: "Bigger Cargo Space",
    cost: 50,
    bonus: pointsPerClick * 5
  },
    {
    id: 4,
    name: "Drill Bot",
    cost: 40,
    bonus: 1,
    oneTime: true,
    bought: false
  },
  {
    id: 5,
    name: "Better Drill Bot",
    cost: 75,
    bonus: 2
  }
];


function renderUpgrades(){
  const upgradeRender = document.getElementById("upgrades");
  upgradeRender.innerHTML = "";


  upgrades.forEach(element => {
    if(element.bought && element.oneTime){
      return;
    }
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
    <p>Cost: ${element.cost}</p>  +${element.bonus} added
    
    
  `;
  upgradeRender.appendChild(div);
  upgradeRender.appendChild(button);

  });
};

function buyUpgrade(id) {
  const upgrade = upgrades.find(el => el.id === id);

  if (score >= upgrade.cost) {
    score -= upgrade.cost;
    showFloatingText("-" + upgrade.cost);
    

    
  
  if(upgrade.id === 1){
    pointsPerClick += upgrade.bonus;
    laser += 1;
    if(laser > 2){
      upgrade.cost *= 2;
    }
  }else 
  if(upgrade.id === 2){
    pointsPerClick += upgrade.bonus;
    crew += 1;
    if(crew > 2){
      upgrade.cost *= 2;
    }
  }else 
  if(upgrade.id === 3){
    pointsPerClick += upgrade.bonus;
    cargo += 1;
    if(cargo > 1){
      upgrade.cost *= 2;
    }
  }else 
  if (upgrade.id === 4) {
    drillBot += 1;
    autobot += upgrade.bonus;
    upgrade.bought = true;
    drillPurchased = true;
  } else if (upgrade.id === 5) {
    betterDrill += 1;
    autobot += upgrade.bonus;
     upgrade.cost *= 2;
  }
  
    updateDisplay();
    checkWin();
    renderUpgrades();
   trackUpgrades();
  }
}

function showFloatingText(amount) {
  const clickArea = document.getElementById("click-area");

  const text = document.createElement("span");
  text.textContent = amount;

  clickArea.appendChild(text);

  setTimeout(() => {
    text.remove();
  }, 500);
}

function checkWin() {
  if (score >= scoreToWin && !winner) {
    winner = true;

    const winMessage = document.createElement("h1");
    winMessage.textContent = "You Win!!!";
    winMessage.id = "win-message";

    document.body.appendChild(winMessage);
  }
}

function trackUpgrades(){

  document.getElementById("laser").textContent = 'Laser: ' + laser;
  document.getElementById("crew").textContent = 'Crew: ' + crew;
  document.getElementById("cargo").textContent = 'Cargo: ' + cargo;
  document.getElementById("drillBot").textContent = 'Drill Bot: ' + drillBot;
  document.getElementById("betterDrill").textContent = 'Better Drill Bot: ' + betterDrill;

};

setInterval(function () {
  score += autobot;
  updateDisplay();
  checkWin();
  renderUpgrades();
}, 1000);

updateDisplay();
trackUpgrades();
renderUpgrades();