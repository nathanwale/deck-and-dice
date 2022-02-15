import 'jest';
import * as Oracle from '../models/Oracle';
import { pick } from '../random';

test('Shuffled Deck initiated properly', () => {
    let cards = Oracle.options_from_names(["a", "b", "c"]);
    let a, b, c = cards;
    let deck = Oracle.shuffled_deck("Test deck", cards);
    expect(new Set(deck.options)).toEqual(new Set(cards));
    expect(deck.style).toEqual(Oracle.Style.Cards);
})

test('ShuffledDeck dealing cards', () => {
    let cards = Oracle.options_from_names(["a", "b", "c", "d"])
    let [a, b, c, d] = cards;
    let deck: Oracle.Oracle = { 
        style: Oracle.Style.Cards,
        options: cards,
        name: "Test deck"
    };

    // initial
    expect(Oracle.dealt_cards(deck, 0)).toEqual([]);
    expect(Oracle.undealt_cards(deck, 0)).toEqual([a, b, c, d]);
    expect(Oracle.is_exhausted(deck, 0)).toEqual(false);

    // deal 1
    let [next_card, next_index] = Oracle.next(deck, 0);
    expect(next_card).toEqual(a);
    expect(next_index).toEqual(1);
    expect(Oracle.dealt_cards(deck, next_index)).toEqual([a]);
    expect(Oracle.undealt_cards(deck, next_index)).toEqual([b, c, d]);
    expect(Oracle.is_exhausted(deck, next_index)).toEqual(false);

    // deal 2
    [next_card, next_index] = Oracle.next(deck, 1);
    expect(next_card).toEqual(b);
    expect(next_index).toEqual(2);
    expect(Oracle.dealt_cards(deck, next_index)).toEqual([a, b]);
    expect(Oracle.undealt_cards(deck, next_index)).toEqual([c, d]);
    expect(Oracle.is_exhausted(deck, next_index)).toEqual(false);

    // deal 3
    [next_card, next_index] = Oracle.next(deck, 2);
    expect(next_card).toEqual(c);
    expect(next_index).toEqual(3);
    expect(Oracle.dealt_cards(deck, next_index)).toEqual([a, b, c]);
    expect(Oracle.undealt_cards(deck, next_index)).toEqual([d]);
    expect(Oracle.is_exhausted(deck, next_index)).toEqual(false);

    // deal 4
    [next_card, next_index] = Oracle.next(deck, 3);
    expect(next_card).toEqual(d);
    expect(next_index).toEqual(4);
    expect(Oracle.dealt_cards(deck, next_index)).toEqual([a, b, c, d]);
    expect(Oracle.undealt_cards(deck, next_index)).toEqual([]);
    expect(Oracle.is_exhausted(deck, next_index)).toEqual(true);

    // deal 5
    [next_card, next_index] = Oracle.next(deck, 4);
    expect(next_card).toEqual(d);
    expect(next_index).toEqual(4);
    expect(Oracle.dealt_cards(deck, next_index)).toEqual([a, b, c, d]);
    expect(Oracle.undealt_cards(deck, next_index)).toEqual([]);
    expect(Oracle.is_exhausted(deck, next_index)).toEqual(true);
})

test('dice', () => {
    let die = Oracle.die_from_range("Test die", 1, 6);
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
    let roll = Oracle.pick(die).value
    // console.log(`Rolled ${roll}`)
    expect([1, 2, 3, 4, 5, 6].includes(roll!)).toEqual(true);
});

test('oracle summaries', () => {
    let options = Oracle.options_from_names(["a"])
    let opt_a = options[0];
    let deck = Oracle.shuffled_deck("Test deck", options);
    let table = Oracle.table_from_options("Test table", options);
    let die = Oracle.die_from_range("Test die", 1,1);

    expect(Oracle.summarise(Oracle.pick(deck), deck)).toEqual("Test deck: a");
    expect(Oracle.summarise(Oracle.pick(table), table)).toEqual("Test table: a");
    expect(Oracle.summarise(Oracle.pick(die), die)).toEqual("Test die: 1");
});
