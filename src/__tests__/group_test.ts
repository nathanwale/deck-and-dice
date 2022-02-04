import 'jest';
import * as Oracle from '../models/Oracle';
import * as Group from '../models/Group';
import * as Geo from '../models/Geometry';

function quickopts (text: string) {
    return Oracle.options_from_names(text.split(""))
}

test('Group basics', () => {
    let shuffled_deck: Oracle.Oracle = {
        index: 0,
        options: quickopts("ABCD"),
        style: Oracle.Style.Cards
    }

    let table = Oracle.table_from_options(quickopts("WXYZ"))

    let group: Group.Group = {
        title: "Test Group",
        oracles: [table, shuffled_deck],
        frame: { 
            origin: {x: 2, y: 3},
            end: {x: 12, y: 13},
         }
    };

    expect(group.title).toEqual("Test Group");
    expect(group.oracles).toEqual([table, shuffled_deck]);
    expect(group.frame.origin).toEqual({x: 2, y: 3});
    expect(group.frame.end).toEqual({x: 12, y: 13});
});

test('run all', () => {
    let shuffled_deck: Oracle.Oracle = {
        index: 0,
        options: quickopts("ABCD"),
        style: Oracle.Style.Cards
    }

    let table = Oracle.table_from_options(quickopts("WXYZ"))
    let die = Oracle.die_from_range(1, 6);

    let group: Group.Group = {
        title: "Test Group",
        oracles: [table, shuffled_deck, die],
        frame: { 
            origin: {x: 2, y: 3},
            end: {x: 12, y: 13},
         }
    };

    let results: Oracle.Result[] = Group.pickall(group)
    expect(results.length).toEqual(3)
    let [[table_result, _table2], [card, _deck], [die_roll, _die]] = results;
    expect("WXYZ".includes(table_result.name)).toEqual(true);
    expect("ABCD".includes(card.name)).toEqual(true);
    expect([1, 2, 3, 4, 5, 6].includes(die_roll.value)).toEqual(true);
    expect(Group.sum(results)).toBeGreaterThanOrEqual(1);
    expect(Group.sum(results)).toBeLessThanOrEqual(6);
    expect([1, 2, 3, 4, 5, 6].includes(Group.sum(results))).toEqual(true);
});

