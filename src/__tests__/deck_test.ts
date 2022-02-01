import 'jest';
import * as Deck from '../models/Deck';
import * as Card from '../models/Card';

let cards = Card.from_names(["a", "b", "c"])

test('Shuffled Deck initiated properly', () => {
    let deck = new Deck.ShuffledDeck(cards); 
    expect(deck.deck).toEqual(cards);
    expect(deck.index).toEqual(0);
    expect(Deck.as_string(deck.deck)).toEqual("a, b, c");
})


test('ShuffledDeck dealing cards', () => {
    let [a, b, c] = cards;
    let deck = new Deck.ShuffledDeck(cards); 
    expect(deck.deck).toEqual(cards);
    expect(deck.undealt_cards).toEqual(cards);
    expect(deck.dealt_cards).toEqual([]);
    expect(deck.is_exhausted).toEqual(false);
    expect(deck.index).toEqual(0);

    // deal
    expect(Deck.deal(deck)).toEqual(a);
    expect(deck.index).toEqual(1);
    expect(deck.deck).toEqual(cards);
    expect(deck.undealt_cards).toEqual([b, c]);
    expect(deck.dealt_cards).toEqual([a]);
    expect(deck.is_exhausted).toEqual(false);

    // deal
    expect(Deck.deal(deck)).toEqual(b);
    expect(deck.index).toEqual(2);
    expect(deck.deck).toEqual(cards);
    expect(deck.undealt_cards).toEqual([c]);
    expect(deck.dealt_cards).toEqual([a, b]);
    expect(deck.is_exhausted).toEqual(false);

    // deal
    expect(Deck.deal(deck)).toEqual(c);
    expect(deck.index).toEqual(3);
    expect(deck.deck).toEqual(cards);
    expect(deck.undealt_cards).toEqual([]);
    expect(deck.dealt_cards).toEqual([a, b, c]);
    expect(deck.is_exhausted).toEqual(true);

    // deal
    expect(Deck.deal(deck)).toEqual(c);
    expect(deck.index).toEqual(3);
    expect(deck.deck).toEqual(cards);
    expect(deck.undealt_cards).toEqual([]);
    expect(deck.dealt_cards).toEqual([a, b, c]);
    expect(deck.is_exhausted).toEqual(true);
})

test('Deck shuffling', () => {
    let [a, b, c] = cards;
    let deck = new Deck.ShuffledDeck(cards);
})