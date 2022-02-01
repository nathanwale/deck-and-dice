import 'jest';
import * as Deck from '../models/Deck';
import * as Card from '../models/Card';



test('Shuffled Deck initiated properly', () => {
    let cards = Card.from_names(["a", "b", "c"])
    let deck = new Deck.ShuffledDeck(cards); 
    expect(deck.deck).toEqual(cards);
    expect(deck.index).toEqual(0);
    expect(Deck.as_string(deck.deck)).toEqual("a, b, c");
})

test('appending cards to a deck', () => {
    let cards = Card.from_names(["a", "b", "c"])
    let [a, b, c] = cards;
    let d = {name: "d"}
    let e = {name: "e"}
    let deck = cards;
    expect(Deck.append(d, deck)).toEqual([a, b, c, d]);
    expect(Deck.append(e, deck)).toEqual([a, b, c, e]);
    expect(Deck.append(e, deck)).not.toEqual(deck);
})

test('removing cards from a deck', () => {
    let cards = Card.from_names(["a", "b", "c"])
    cards.push({name: "a"});
    let [a, b, c, other_a] = cards;
    let d = {name: "d"}
    let deck = cards;
    expect(Deck.remove(a, deck)).toEqual([b, c, other_a]);
    expect(Deck.remove(b, deck)).toEqual([a, c, other_a]);
    expect(Deck.remove(c, deck)).toEqual([a, b, other_a]);
    expect(Deck.remove(other_a, deck)).toEqual([a, b, c]);
    expect(Deck.remove(d, deck)).toEqual([a, b, c, other_a]);
})


test('ShuffledDeck dealing cards', () => {
    let cards = Card.from_names(["a", "b", "c"])
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