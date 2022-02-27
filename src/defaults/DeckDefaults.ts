export type DeckConfig = [string, string[]];

const ranks = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];

const hearts = ranks.map(rank => rank + "♥️");
const diamonds = ranks.map(rank => rank + "♦️");
const spades = ranks.map(rank => rank + "♠️");
const clubs = ranks.map(rank => rank + "♣️");

const full_deck = hearts.concat(diamonds, spades, clubs);

export const decks: DeckConfig[] = [
    ["Full Deck", full_deck],
    ["Hearts only", hearts],
    ["Diamonds only", diamonds],
    ["Spades only", spades],
    ["Clubs only", clubs],
    ["Clubs + Spades", clubs.concat(spades)],
    ["Hearts + Diamonds", hearts.concat(diamonds)],
]