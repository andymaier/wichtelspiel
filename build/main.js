function addToTable(gift) {
    var gameBoard = document.getElementById('gameBoard');
    if (gameBoard) {
        var giftElement = document.createElement('div');
        giftElement.textContent = gift.print();
        giftElement.classList.add('game-box');
        gameBoard.appendChild(giftElement);
    }
}
function addToPlayerDisplay(player) {
    var playersDiv = document.getElementById('players');
    if (playersDiv) {
        var playerElement = document.createElement('div');
        playerElement.textContent = "Name: ".concat(player.name, ", Age: ").concat(player.age, ", Gift: ").concat(player.gift ? player.gift.print() : 'No gift');
        playerElement.classList.add('player');
        playersDiv.appendChild(playerElement);
    }
}
function updateDisplay(game) {
    // Leere die Anzeigen
    var gameBoard = document.getElementById('gameBoard');
    var playersDiv = document.getElementById('players');
    if (gameBoard && playersDiv) {
        gameBoard.innerHTML = '';
        playersDiv.innerHTML = '';
        // Füge Geschenke zum Tisch hinzu
        game.table.forEach(function (gift) { return addToTable(gift); });
        // Füge Spieler zur Anzeige hinzu
        game.players.forEach(function (player) { return addToPlayerDisplay(player); });
    }
}
var Wichtel = /** @class */ (function () {
    function Wichtel(name, price, size) {
        this.name = name;
        this.price = price;
        this.size = size;
    }
    Wichtel.prototype.print = function () {
        return "Name: ".concat(this.name, ", Price: ").concat(this.price, ", Size: ").concat(this.size);
    };
    return Wichtel;
}());
var WichtelPlayer = /** @class */ (function () {
    function WichtelPlayer(name, age, gift) {
        this.name = name;
        this.age = age;
        this.gift = gift;
    }
    WichtelPlayer.prototype.addGift = function (gift) {
        this.gift = gift;
    };
    WichtelPlayer.prototype.removeGift = function () {
        var removedGift = this.gift;
        this.gift = undefined;
        return removedGift;
    };
    return WichtelPlayer;
}());
var WichtelGame = /** @class */ (function () {
    function WichtelGame() {
        this.players = [];
        this.table = [];
    }
    WichtelGame.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    WichtelGame.prototype.startGame = function () {
        this.players.sort(function (a, b) { return a.age - b.age; }); // Sortiere die Spieler nach Alter
        this.currentPlayer = this.players[0];
    };
    WichtelGame.prototype.nextTurn = function () {
        var currentIndex = this.players.indexOf(this.currentPlayer);
        var nextIndex = (currentIndex + 1) % this.players.length;
        this.currentPlayer = this.players[nextIndex];
    };
    WichtelGame.prototype.selectGift = function (player, gift) {
        var index = this.table.indexOf(gift);
        if (index !== -1) {
            player.addGift(gift);
            this.table.splice(index, 1);
        }
    };
    WichtelGame.prototype.stealGift = function (toPlayer, fromPlayer) {
        var stolenGift = fromPlayer.removeGift();
        if (stolenGift) {
            toPlayer.addGift(stolenGift);
        }
    };
    return WichtelGame;
}());
// Beispiel für die Verwendung:
var game = new WichtelGame();
// Spieler hinzufügen
var player1 = new WichtelPlayer("Alice", 25, undefined);
var player2 = new WichtelPlayer("Bob", 30, undefined);
var player3 = new WichtelPlayer("Charlie", 22, undefined);
game.addPlayer(player1);
game.addPlayer(player2);
game.addPlayer(player3);
// Geschenke auf den Tisch legen
var gift1 = new Wichtel("Elektronik", 50, 3);
var gift2 = new Wichtel("Buch", 20, 2);
var gift3 = new Wichtel("Kleidung", 30, 1);
game.table.push(gift1, gift2, gift3);
// Spiel starten
game.startGame();
// Beispiel für einen Spielzug
game.selectGift(player1, gift1);
game.nextTurn();
game.stealGift(player2, player1);
// Aktualisiere die Anzeige
updateDisplay(game);
