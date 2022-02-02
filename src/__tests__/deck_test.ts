import 'jest';
import * as Deck from '../models/Deck';
import * as Card from '../models/Card';



test('Shuffled Deck initiated properly', () => {
    let cards = Card.from_names(["a", "b", "c"])
    let deck: Deck.ShuffledDeck = { cards: cards, index: 0 };
    expect(deck.cards).toEqual(cards);
    expect(deck.index).toEqual(0);
    expect(Deck.as_string(deck.cards)).toEqual("a, b, c");
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
    let deck: Deck.ShuffledDeck = { cards: cards, index: 0 };

    function expect_deck (
        index: number, 
        undealt_cards: Deck.Deck, 
        dealt_cards: Deck.Deck, 
        exhausted: boolean) 
    {
        expect(deck.index).toEqual(index);
        expect(deck.cards).toEqual(cards);
        expect(Deck.undealt_cards(deck)).toEqual(undealt_cards);
        expect(Deck.dealt_cards(deck)).toEqual(dealt_cards);
        expect(Deck.is_exhausted(deck)).toEqual(exhausted);
    }

    function expect_deal (
        dealt_card: Card.Card, index: number, 
        undealt_cards: Deck.Deck, dealt_cards: Deck.Deck, 
        exhausted: boolean) 
    {
        expect(Deck.deal(deck)).toEqual([dealt_card, { index: index, cards: cards }]);
        expect_deck(index, undealt_cards, dealt_cards, exhausted);   
    }

    expect_deck(0, [a, b, c], [], false);
    expect_deal(a, 1, [b, c], [a], false);
    expect_deal(b, 2, [c], [a, b], false);
    expect_deal(c, 3, [], [a, b, c], true);
    expect_deal(c, 3, [], [a, b, c], true);
})