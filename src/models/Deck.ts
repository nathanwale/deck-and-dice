import { Card } from './Card'
import * as random from '../random'

/*
** Represents a deck of cards.
** Is NOT shuffled
*/
type Deck = Card[];

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
    return deck[deck.index-1]
}
