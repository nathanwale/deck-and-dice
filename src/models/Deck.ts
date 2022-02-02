import { Card } from './Card'
import * as random from '../random'
import { createReadStream } from 'fs';

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

export type ShuffledDeck = {
    cards: Deck,
    index: number
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
    let shuffled_cards = random.shuffle(deck);
    return {
        cards: shuffled_cards,
        index: 0
    }
}

/*
** Picks a random Card from the Deck
*/
export function pick(deck: Deck): Card 
{
    return random.pick(deck)
}

/*
** Has deck finished dealing?
*/
export function is_exhausted(deck: ShuffledDeck): boolean
{
    let { cards, index } = deck;
    return (index >= cards.length)
}

/*
** Deal the next Card from a ShuffledDeck
*/
export function deal(deck: ShuffledDeck): [Card, ShuffledDeck]
{
    let { cards, index } = deck;
    if (!is_exhausted(deck)) {
        deck.index++
    }
    return [cards[deck.index-1], deck]
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

/*
** Cards that haven't been dealt yet
*/
export function undealt_cards(deck: ShuffledDeck): Deck
{
    let { cards, index } = deck;
    return cards.slice(index)
}

/*
** Cards that have been dealt already
*/
export function dealt_cards(deck: ShuffledDeck): Deck
{
    let { cards, index } = deck;
    return cards.slice(0, index)
}