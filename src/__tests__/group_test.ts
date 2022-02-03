import 'jest';
import * as Deck from '../models/Deck';
import * as Card from '../models/Card';
import * as Group from '../models/Group';
import * as Geo from '../models/Geometry';



test('Group basics', () => {
    let deck: Deck.Deck = {
        cards: Card.from_names("ABCD".split(""))
    };
    let shuffled_deck: Deck.ShuffledDeck = {
        index: 0,
        cards: Card.from_names("WXYZ".split(""))
    }
    let group: Group.Group = {
        title: "Test Group",
        items: [deck, shuffled_deck],
        frame: { 
            origin: {x: 2, y: 3},
            end: {x: 12, y: 13},
         }
    };

    expect(group.title).toEqual("Test Group");
    expect(group.items).toEqual([deck, shuffled_deck]);
    expect(group.frame.origin).toEqual({x: 2, y: 3});
    expect(group.frame.end).toEqual({x: 12, y: 13});
});

test('run all', () => {
    let deck: Deck.Deck = {
        cards: Card.from_names("ABCD".split(""))
    };
    let shuffled_deck: Deck.ShuffledDeck = {
        index: 0,
        cards: Card.from_names("WXYZ".split(""))
    }
    let group: Group.Group = {
        title: "Test Group",
        items: [deck, shuffled_deck],
        frame: { 
            origin: {x: 2, y: 3},
            end: {x: 12, y: 13},
         }
    };

    // expect(Group.runall(group)).toEqual([])
});

