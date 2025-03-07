let counter = 0;
let perClickAmount = 1;
let perSecond = 0;

let upgrade1Count = 0;
let upgrade2Count = 0;
let upgrade3Count = 0;

let baseMultiplier = 1.5;
let baseMultiplier2 = 1.3;

let currentCost = 25;
let currentCost2 = 125;
let currentCost3 = 200;
let firstUpgradeIncrement = 0;
let secondUpgradeIncrement = 0;

const countDisplay = document.getElementById('count');
const incrementButton = document.getElementById('increment-btn');
const shopButton = document.querySelector('.rectangle');
const dropdown = document.querySelector('.dropdown');
const dropdown2 = document.querySelector('.dropdown2');
const perClickButton = document.getElementById('perClickButton');
const perSecondButton = document.getElementById('perSecondButton')
const upgradeButton1 = document.getElementById('special-btn');
const upgradeButton2 = document.querySelector('.dropdown button:nth-child(2)');
const upgradeButton3 = document.getElementById('special-btn-3');
const notification = document.getElementById('notification');
const purchaseCountDisplay = upgradeButton1.querySelector('.purchase-count');
const costDisplay = upgradeButton1.querySelector('.cost');
const incrementDisplay = upgradeButton1.querySelector('.info span:first-child');
const testButton = document.querySelector('.test-button');

const purchaseCountDisplay2 = upgradeButton2.querySelector('.purchase-count');
const costDisplay2 = upgradeButton2.querySelector('.cost');
const incrementDisplay2 = upgradeButton2.querySelector('.info span:first-child');

const purchaseCountDisplay3 = upgradeButton3.querySelector('.purchase-count')
const costDisplay3 = upgradeButton3.querySelector('.cost');
const incrementDisplay3 = upgradeButton3.querySelector('.info span:first-child');

const perClickDisplay = perClickButton.querySelector('.cost');
const perClickTitle = perClickButton.querySelector('.info span:first-child')
const perSecondDisplay = perSecondButton.querySelector('.cost');
const perSecondTitle = perSecondButton.querySelector('.info span:first-child')

function saveGameState() {
    const gameState = {
        counter,
        perClickAmount,
        perSecond,
        upgrade1Count,
        upgrade2Count,
        upgrade3Count,
        currentCost,
        currentCost2,
        currentCost3,
    };
    localStorage.setItem('pndqClickerGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem('pndqClickerGameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        counter = gameState.counter || 0;
        perClickAmount = gameState.perClickAmount || 1;
        perSecond = gameState.perSecond || 0;
        upgrade1Count = gameState.upgrade1Count || 0;
        upgrade2Count = gameState.upgrade2Count || 0;
        upgrade3Count = gameState.upgrade3Count || 0;
        currentCost = gameState.currentCost || 25;
        currentCost2 = gameState.currentCost2 || 125;
        currentCost3 = gameState.currentCost3 || 200;

        countDisplay.textContent = counter;

        purchaseCountDisplay.textContent = upgrade1Count;
        purchaseCountDisplay2.textContent = upgrade2Count;
        purchaseCountDisplay3.textContent = upgrade3Count;

        updateButtonText();
        updateupgradeButton1State();
    }
}

window.addEventListener('load', loadGameState);

function calculateCost() {
    return currentCost;
}

function calculateCost2() {
    return currentCost2;
}

function calculateCost3() {
    return currentCost3;
}

function updateCost() {
    const decreaseAmount = Math.floor((upgrade1Count) / 2) * 0.1;
    const currentMultiplier = Math.max(1.1, 1.5 - decreaseAmount);
    currentCost = Math.floor(currentCost * currentMultiplier);
}

function updateCost2() {
    const decreaseAmount2 = Math.floor((upgrade2Count) / 2) * 0.1;
    const currentMultiplier2 = Math.max(1.1, 1.5 - decreaseAmount2);
    currentCost2 = Math.floor(currentCost2 * currentMultiplier2);
}

function updateCost3() {
    const decreaseAmount3 = Math.floor((upgrade3Count) / 2) * 0.1;
    const currentMultiplier3 = Math.max(1.1, 1.5 - decreaseAmount3);
    currentCost3 = Math.floor(currentCost3 * currentMultiplier3);
}

function calculateIncrementBonus() {
    if (upgrade1Count === 0) return 0;
    return Math.floor((upgrade1Count - 1) / 5) + 1;
}

function calculateIncrementBonus2() {
    if (upgrade2Count === 0) return 5;
    return 5 + (Math.floor((upgrade2Count - 1) / 5) * 2);
}

function calculateIncrementBonus3() {
    if (upgrade3Count === 0) return 1;
    return 1 + (Math.floor((upgrade3Count - 1) / 5) * 2);
}

function getNextIncrementBonus() {
    return Math.floor(upgrade1Count / 5) + 1;
}

function getNextIncrementBonus2() {
    return (Math.floor(upgrade2Count / 5) * 2) + 5;
}

function getNextIncrementBonus3() {
    return Math.floor(upgrade3Count / 5) + 1;
}

function updateButtonText() {
    const cost = calculateCost();
    const nextBonus = getNextIncrementBonus();
    costDisplay.textContent = `Cost: ${cost}`;
    incrementDisplay.textContent = `+${nextBonus} per click`;

    const cost2 = calculateCost2();
    const bonus2 = getNextIncrementBonus2();
    costDisplay2.textContent = `Cost: ${cost2}`;
    incrementDisplay2.textContent = `+${bonus2} per click`;

    const cost3 = calculateCost3();
    const bonus3 = getNextIncrementBonus3();
    costDisplay3.textContent = `Cost: ${cost3}`;
    incrementDisplay3.textContent = `+${bonus3} per second`;

    perClickDisplay.textContent = `${perClickAmount}`;
    perClickTitle.textContent = 'Amount per click: ';
    perSecondDisplay.textContent = `${perSecond}`;
    perSecondTitle.textContent = 'Amount per second: ';
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

function updateupgradeButton1State() {
    const cost = calculateCost();
    const cost2 = calculateCost2();
    const cost3 = calculateCost3();

    if (counter < cost) {
        upgradeButton1.disabled = true;
        upgradeButton1.title = `Need at least ${cost} points`;
    } else {
        upgradeButton1.disabled = false;
        upgradeButton1.title = `Click to trade ${cost} points for increased increment`;
    }

    if (counter < cost2) {
        upgradeButton2.disabled = true;
        upgradeButton2.title = `Need at least ${cost2} points`;
    } else {
        upgradeButton2.disabled = false;
        upgradeButton2.title = `Click to trade ${cost2} points for increased increment`;
    }

    if (counter < cost3) { 
        upgradeButton3.disabled = true;
        upgradeButton3.title = `Need at least ${cost3} points`;
    } else {
        upgradeButton3.disabled = false;
        upgradeButton3.title = `Click to trade ${cost3} points for increased increment`;
    }

    updateButtonText();
}

incrementButton.addEventListener('click', () => {
    counter += perClickAmount;
    countDisplay.textContent = counter;
    updateupgradeButton1State();
    saveGameState();
});

shopButton.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});

upgradeButton1.addEventListener('click', () => {
    const cost = calculateCost();
    if (counter >= cost) {
        counter -= cost;
        upgrade1Count += 1;
        updateCost();
        const bonus = calculateIncrementBonus();
        perClickAmount += bonus;
        countDisplay.textContent = counter;
        purchaseCountDisplay.textContent = upgrade1Count;
        showNotification(`Purchased! Now clicking gives +${perClickAmount}!`);
        updateupgradeButton1State();
        saveGameState();
    }
});

upgradeButton2.addEventListener('click', () => {
    const cost = calculateCost2();
    if (counter >= cost) {
        counter -= cost;
        upgrade2Count += 1;
        updateCost2();
        const bonus = calculateIncrementBonus2();
        perClickAmount += bonus;
        countDisplay.textContent = counter;
        purchaseCountDisplay2.textContent = upgrade2Count;
        showNotification(`Purchased! Now clicking gives +${perClickAmount}!`);
        updateupgradeButton1State();
        saveGameState();
    }
});

upgradeButton3.addEventListener('click', () => {
    console.log('test')
    const cost = calculateCost3();
    if (counter >= cost) {
        counter -= cost;
        upgrade3Count += 1;
        updateCost3();
        const bonus = calculateIncrementBonus3();
        perSecond += bonus;
        countDisplay.textContent = counter;
        purchaseCountDisplay3.textContent = upgrade3Count;
        showNotification(`Purchased! Earning ${perSecond} per second!`);
        updateupgradeButton1State();
        saveGameState();
    }
});

setInterval(() => {
    if (perSecond > 0) {
        counter += perSecond;
        countDisplay.textContent = counter;
        updateupgradeButton1State();
        saveGameState();
    }
}, 1000);

testButton.addEventListener('click', () => {
    dropdown2.classList.toggle('show');
});

updateupgradeButton1State(); 