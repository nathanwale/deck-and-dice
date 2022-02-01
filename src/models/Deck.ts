import { Card } from './Card'
import * as random from '../random'

/*
** Represents a deck of cards.
** Is NOT shuffled
*/
export type Deck = Card[];

/*
** Represents a shuffled deck of cards.
** Has been shuffled, and has an order
**      `index` represents 
*/
export class ShuffledDeck
{
    deck: Deck
    index: number = 0

    get is_exhausted(): boolean {
        return (this.index >= this.deck.length)
    }

    constructor(deck: Deck) {
        this.deck = deck
    }

    get dealt_cards(): Deck {
        return this.deck.slice(0, this.index);
    }

    get undealt_cards(): Deck {
        return this.deck.slice(this.index)
    }
}

export function as_string(deck: Deck): string
{
    let names = deck.map((card) => card.name);
    return names.join(", ")
}

/*
** Accepts a Deck. Shuffles it,
** and returns a ShuffledDeck
*/
export function shuffle(deck: Deck): ShuffledDeck 
{
    let shuffled_deck = random.shuffle(deck);
    return new ShuffledDeck(shuffled_deck)
}

/*
** Picks a random Card from the Deck
*/
export function pick(deck: Deck): Card 
{
    return random.pick(deck)
}

/*
** Deal the next Card from a ShuffledDeck
*/
export function deal(deck: ShuffledDeck): Card 
{
    if (!deck.is_exhausted) {
        deck.index++
    }
    return deck.deck[deck.index-1]
}

export function join(a: Deck, b: Deck)
{
    return a.concat(b);
}

/*
** Remove Card from a Deck
*/
export function remove(card: Card, deck: Deck): Deck 
{
    let index = deck.indexOf(card);
    if (index == -1) {
        return deck;
    } else {
        return join(deck.slice(0, index), deck.slice(index+1))
    }
}

/*
** Add Card to the end of the Deck return a new deck
*/
export function append(card: Card, deck: Deck): Deck
{
    let new_deck = deck.slice()
    new_deck.push(card);
    return new_deck;
}