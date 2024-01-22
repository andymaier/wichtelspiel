"use strict";
function addToTable(gift) {
    const gameBoard = document.getElementById('gameBoard');
    if (gameBoard) {
        const giftElement = document.createElement('div');
        giftElement.textContent = gift.print();
        giftElement.classList.add('game-box');
        gameBoard.appendChild(giftElement);
    }
}
function addToPlayerDisplay(player) {
    const playersDiv = document.getElementById('players');
    if (playersDiv) {
        const playerElement = document.createElement('div');
        playerElement.textContent = `Name: ${player.name}, Age: ${player.age}, Gift: ${player.gift ? player.gift.print() : 'No gift'}`;
        playerElement.classList.add('player');
        playersDiv.appendChild(playerElement);
    }
}
function updateDisplay(game) {
    // Leere die Anzeigen
    const gameBoard = document.getElementById('gameBoard');
    const playersDiv = document.getElementById('players');
    if (gameBoard && playersDiv) {
        gameBoard.innerHTML = '';
        playersDiv.innerHTML = '';
        // Füge Geschenke zum Tisch hinzu
        game.table.forEach(gift => addToTable(gift));
        // Füge Spieler zur Anzeige hinzu
        game.players.forEach(player => addToPlayerDisplay(player));
    }
}
class Wichtel {
    name;
    price;
    size;
    constructor(name, price, size) {
        this.name = name;
        this.price = price;
        this.size = size;
    }
    print() {
        return `Name: ${this.name}, Price: ${this.price}, Size: ${this.size}`;
    }
}
class WichtelPlayer {
    name;
    age;
    gift;
    constructor(name, age, gift) {
        this.name = name;
        this.age = age;
        this.gift = gift;
    }
    addGift(gift) {
        this.gift = gift;
    }
    removeGift() {
        const removedGift = this.gift;
        this.gift = undefined;
        return removedGift;
    }
}
class WichtelGame {
    players = [];
    currentPlayer; // Fix: Use definite assignment assertion
    table = [];
    addPlayer(player) {
        this.players.push(player);
    }
    startGame() {
        this.players.sort((a, b) => a.age - b.age); // Sortiere die Spieler nach Alter
        this.currentPlayer = this.players[0];
    }
    nextTurn() {
        const currentIndex = this.players.indexOf(this.currentPlayer);
        const nextIndex = (currentIndex + 1) % this.players.length;
        this.currentPlayer = this.players[nextIndex];
    }
    selectGift(player, gift) {
        const index = this.table.indexOf(gift);
        if (index !== -1) {
            player.addGift(gift);
            this.table.splice(index, 1);
        }
    }
    stealGift(toPlayer, fromPlayer) {
        const stolenGift = fromPlayer.removeGift();
        if (stolenGift) {
            toPlayer.addGift(stolenGift);
        }
    }
}
// Beispiel für die Verwendung:
const game = new WichtelGame();
// Spieler hinzufügen
const player1 = new WichtelPlayer("Alice", 25, undefined);
const player2 = new WichtelPlayer("Bob", 30, undefined);
const player3 = new WichtelPlayer("Charlie", 22, undefined);
game.addPlayer(player1);
game.addPlayer(player2);
game.addPlayer(player3);
// Geschenke auf den Tisch legen
const gift1 = new Wichtel("Elektronik", 50, 3);
const gift2 = new Wichtel("Buch", 20, 2);
const gift3 = new Wichtel("Kleidung", 30, 1);
game.table.push(gift1, gift2, gift3);
// Spiel starten
game.startGame();
// Beispiel für einen Spielzug
game.selectGift(player1, gift1);
game.nextTurn();
game.stealGift(player2, player1);
// Aktualisiere die Anzeige
updateDisplay(game);
