interface Gift {
    name: string;
    price: number;
    size: number;
    //Prints a string where all information of the gift is available
    print(): string;
}

interface Player<T extends Gift> {
    readonly name: string;
    readonly age: number;
    gift: T | undefined; // Fix: Initialize gift as undefined
    addGift(gift: T): void;
    removeGift(): T | undefined;
}

interface Game<T extends Player<U>, U extends Gift> {
    players: T[];
    currentPlayer: T;
    table: U[]; // Fix: Use U instead of []
    addPlayer(player: T): void;
    startGame(): void;
    nextTurn(): void;
    selectGift(player: T, gift: U): void;
    stealGift(toPlayer: T, fromPlayer: T): void;
}

function addToTable(gift: Gift): void {
    const gameBoard = document.getElementById('gameBoard');
    if (gameBoard) {
        const giftElement = document.createElement('div');
        giftElement.textContent = gift.print();
        giftElement.classList.add('game-box');
        gameBoard.appendChild(giftElement);
    }
}

function addToPlayerDisplay(player: Player<Gift>): void {
    const playersDiv = document.getElementById('players');
    if (playersDiv) {
        const playerElement = document.createElement('div');
        playerElement.textContent = `Name: ${player.name}, Age: ${player.age}, Gift: ${player.gift ? player.gift.print() : 'No gift'}`;
        playerElement.classList.add('player');
        playersDiv.appendChild(playerElement);
    }
}

function updateDisplay(game: Game<Player<Gift>, Gift>): void {
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

class Wichtel implements Gift {
    constructor(public name: string, public price: number, public size: number) {}

    print(): string {
        return `Name: ${this.name}, Price: ${this.price}, Size: ${this.size}`;
    }
}

class WichtelPlayer implements Player<Wichtel> {
    constructor(public name: string, public age: number, public gift: Wichtel | undefined) {}

    addGift(gift: Wichtel): void {
        this.gift = gift;
    }

    removeGift(): Wichtel | undefined {
        const removedGift = this.gift;
        this.gift = undefined;
        return removedGift;
    }
}

class WichtelGame implements Game<WichtelPlayer, Wichtel> {
    players: WichtelPlayer[] = [];
    currentPlayer!: WichtelPlayer; // Fix: Use definite assignment assertion
    table: Wichtel[] = [];

    addPlayer(player: WichtelPlayer): void {
        this.players.push(player);
    }

    startGame(): void {
        this.players.sort((a, b) => a.age - b.age); // Sortiere die Spieler nach Alter
        this.currentPlayer = this.players[0];
    }

    nextTurn(): void {
        const currentIndex = this.players.indexOf(this.currentPlayer);
        const nextIndex = (currentIndex + 1) % this.players.length;
        this.currentPlayer = this.players[nextIndex];
    }

    selectGift(player: WichtelPlayer, gift: Wichtel): void {
        const index = this.table.indexOf(gift);
        if (index !== -1) {
            player.addGift(gift);
            this.table.splice(index, 1);
        }
    }

    stealGift(toPlayer: WichtelPlayer, fromPlayer: WichtelPlayer): void {
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
