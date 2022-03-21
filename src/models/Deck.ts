import { Card } from './Card'
import * as random from '../random'

/*
** Represents a deck of cards.
** Is NOT shuffled
*/
export type Deck = {
    cards: Card[],
    latest?: Card 
}

/*
** Represents a shuffled deck of cards.
** Has been shuffled, and has an order
**      `index` represents 
*/

export type ShuffledDeck = {
    cards: Card[],
    index: number
}

export function as_string(deck: Deck): string
{
    const names = deck.cards.map((card) => card.name);
    return names.join(", ")
}

/*
** Accepts a Deck. Shuffles it,
** and returns a ShuffledDeck
*/
export function shuffle(deck: Deck): ShuffledDeck 
{
    const shuffled_cards = random.shuffle(deck.cards);
    return {
        cards: shuffled_cards,
        index: 0
    }
}

/*
** Picks a random Card from the Deck
*/
export function pick(deck: Deck): Deck 
{
    return {
        cards: deck.cards,
        latest: random.pick(deck.cards)
    }
}

/*
** Has deck finished dealing?
*/
export function is_exhausted(deck: ShuffledDeck): boolean
{
    const { cards, index } = deck;
    return (index >= cards.length)
}

/*
** Deal the next Card from a ShuffledDeck
*/
export function deal(deck: ShuffledDeck): [Card, ShuffledDeck]
{
    if (!is_exhausted(deck)) {
        deck.index++
    }
    return [deck.cards[deck.index-1], deck]
}

export function join<T>(a: T[], b: T[]): T[]
{
    return a.concat(b);
}

/*
** Remove Card from a Deck
*/
export function remove(card: Card, deck: Deck): Deck 
{
    const index = deck.cards.indexOf(card);
    if (index == -1) {
        return deck;
    } else {
        const cards = join(deck.cards.slice(0, index), deck.cards.slice(index+1));
        return {
            cards: cards,
            latest: (card == deck.latest) ? undefined : deck.latest, // null if latest card happens to be the one we removed
        }
    }
}

/*
** Add Card to the end of the Deck return a new deck
*/
export function append(card: Card, deck: Deck): Deck
{
    const new_cards = deck.cards.slice()
    new_cards.push(card);
    return {
        cards: new_cards,
        latest: deck.latest
    }
}

/*
** Cards that haven't been dealt yet
*/
export function undealt_cards(deck: ShuffledDeck): Card[]
{
    const { cards, index } = deck;
    return cards.slice(index)
}

/*
** Cards that have been dealt already
*/
export function dealt_cards(deck: ShuffledDeck): Card[]
{
    const { cards, index } = deck;
    return cards.slice(0, index)
}