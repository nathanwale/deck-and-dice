import 'jest';
import * as Oracle from '../models/Oracle';

test('Shuffled Deck initiated properly', () => {
    let cards = Oracle.options_from_names(["a", "b", "c"]);
    let a, b, c = cards;
    let deck = Oracle.shuffled_deck(cards);
    expect(new Set(deck.options)).toEqual(new Set(cards));
    expect(deck.index).toEqual(0);
    expect(deck.style).toEqual(Oracle.Style.Cards);
})

test('ShuffledDeck dealing cards', () => {
    let cards = Oracle.options_from_names(["a", "b", "c"])
    let [a, b, c] = cards;
    let deck: Oracle.Oracle = { 
        style: Oracle.Style.Cards,
        options: cards, 
        index: 0, 
    };

    // initial
    expect(deck.index).toEqual(0);
    expect(Oracle.dealt_cards(deck)).toEqual([]);
    expect(Oracle.undealt_cards(deck)).toEqual([a, b, c]);
    expect(Oracle.is_exhausted(deck)).toEqual(false);

    // deal 1
    let [next_card, next_deck] = Oracle.next_shuffled(deck);
    expect(next_card).toEqual(a);
    expect(next_deck.index).toEqual(1);
    expect(Oracle.dealt_cards(next_deck)).toEqual([a]);
    expect(Oracle.undealt_cards(next_deck)).toEqual([b, c]);
    expect(Oracle.is_exhausted(next_deck)).toEqual(false);

    // deal 2
    [next_card, next_deck] = Oracle.next_shuffled(next_deck);
    expect(next_card).toEqual(b);
    expect(next_deck.index).toEqual(2);
    expect(Oracle.dealt_cards(next_deck)).toEqual([a, b]);
    expect(Oracle.undealt_cards(next_deck)).toEqual([c]);
    expect(Oracle.is_exhausted(next_deck)).toEqual(false);

    // deal 3
    [next_card, next_deck] = Oracle.next_shuffled(next_deck);
    expect(next_card).toEqual(c);
    expect(next_deck.index).toEqual(3);
    expect(Oracle.dealt_cards(next_deck)).toEqual([a, b, c]);
    expect(Oracle.undealt_cards(next_deck)).toEqual([]);
    expect(Oracle.is_exhausted(next_deck)).toEqual(true);

    // deal 4
    [next_card, next_deck] = Oracle.next_shuffled(next_deck);
    expect(next_card).toEqual(null);
    expect(next_deck.index).toEqual(3);
    expect(Oracle.dealt_cards(next_deck)).toEqual([a, b, c]);
    expect(Oracle.undealt_cards(next_deck)).toEqual([]);
    expect(Oracle.is_exhausted(next_deck)).toEqual(true);
})

test('dice', () => {
    let die = Oracle.die_from_range(1, 6);
    let expected_options: Oracle.Option[] = [
        { name: "1", value: 1 },
        { name: "2", value: 2 },
        { name: "3", value: 3 },
        { name: "4", value: 4 },
        { name: "5", value: 5 },
        { name: "6", value: 6 },
    ]
    expect(die.style).toEqual(Oracle.Style.Die);
    expect(die.options).toEqual(expected_options);
    expect(Oracle.pick(die)[0].value in [1, 2, 3, 4, 5, 6]).toEqual(true);
});
