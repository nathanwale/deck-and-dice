import 'jest';
import * as Deck from '../models/Deck';
import * as Card from '../models/Card';



test('Shuffled Deck initiated properly', () => {
    const cards = Card.from_names(["a", "b", "c"])
    const deck: Deck.ShuffledDeck = { cards: cards, index: 0 };
    expect(deck.cards).toEqual(cards);
    expect(deck.index).toEqual(0);
    expect(Deck.as_string(deck)).toEqual("a, b, c");
})

test('appending cards to a deck', () => {
    const cards = Card.from_names(["a", "b", "c"])
    const [a, b, c] = cards;
    const d = {name: "d"}
    const e = {name: "e"}
    const deck = { cards: cards };
    expect(Deck.append(d, deck)).toEqual({cards: [a, b, c, d]}); 
    expect(Deck.append(e, deck)).toEqual({cards: [a, b, c, e]});
    expect(Deck.append(e, deck)).not.toEqual(deck);
})

test('removing cards from a deck', () => {
    const cards = Card.from_names(["a", "b", "c"])
    cards.push({name: "a"});
    const [a, b, c, other_a] = cards;
    const d = {name: "d"}
    const deck = { 
        cards: cards,
        latest: c
     };
    expect(Deck.remove(a, deck)).toEqual({ cards: [b, c, other_a], latest: c });
    expect(Deck.remove(b, deck)).toEqual({ cards: [a, c, other_a], latest: c });
    expect(Deck.remove(c, deck)).toEqual({ cards: [a, b, other_a], latest: undefined });
    expect(Deck.remove(other_a, deck)).toEqual({ cards: [a, b, c], latest: c });
    expect(Deck.remove(d, deck)).toEqual({ cards: [a, b, c, other_a], latest: c });
})


test('ShuffledDeck dealing cards', () => {
    const cards = Card.from_names(["a", "b", "c"])
    const [a, b, c] = cards;
    const deck: Deck.ShuffledDeck = { cards: cards, index: 0 };

    function expect_deck (
        index: number, 
        undealt_cards: Card.Card[], 
        dealt_cards: Card.Card[], 
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
        undealt_cards: Card.Card[], dealt_cards: Card.Card[], 
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