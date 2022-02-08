import 'jest';
import * as Oracle from '../models/Oracle';
import * as Group from '../models/Group';
import * as Geo from '../models/Geometry';

function quickopts (text: string) {
    return Oracle.options_from_names(text.split(""))
}

function test_group() 
{
    let shuffled_deck: Oracle.Oracle = {
        index: 0,
        options: quickopts("ABCD"),
        style: Oracle.Style.Cards,
        name: "Test deck",
    }

    let table = Oracle.table_from_options("Test table", quickopts("WXYZ"))
    let die = Oracle.die_from_range("Test die", 1, 6);

    let group: Group.Group = {
        title: "Test Group",
        oracles: [table, shuffled_deck, die],
        frame: { 
            origin: {x: 2, y: 3},
            end: {x: 12, y: 13},
         }
    };
    
    return group;
}

test('Group basics', () => {
    let shuffled_deck: Oracle.Oracle = {
        index: 0,
        options: quickopts("ABCD"),
        style: Oracle.Style.Cards,
        name: "Test deck"
    }

    let table = Oracle.table_from_options("Test table", quickopts("WXYZ"))

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
        style: Oracle.Style.Cards,
        name: "Test deck",
    }

    let table = Oracle.table_from_options("Test table", quickopts("WXYZ"))
    let die = Oracle.die_from_range("Test die", 1, 6);

    let group: Group.Group = {
        title: "Test Group",
        oracles: [table, shuffled_deck, die],
        frame: { 
            origin: {x: 2, y: 3},
            end: {x: 12, y: 13},
         }
    };

    let results: Oracle.Option[] = Group.pickall(group)
    expect(results.length).toEqual(3)
    let [table_result, card, die_roll] = results;
    expect("WXYZ".includes(table_result?.name!)).toEqual(true);
    expect("ABCD".includes(card?.name!)).toEqual(true);
    expect([1, 2, 3, 4, 5, 6].includes(die_roll?.value!)).toEqual(true);
    expect(Group.sum(results)).toBeGreaterThanOrEqual(1);
    expect(Group.sum(results)).toBeLessThanOrEqual(6);
    expect([1, 2, 3, 4, 5, 6].includes(Group.sum(results))).toEqual(true);
});

test('should first', () => {
    let shuffled_deck: Oracle.Oracle = {
        index: 0,
        options: quickopts("A"),
        style: Oracle.Style.Cards,
        name: "Test deck",
    }

    let table = Oracle.table_from_options("Test table", quickopts("B"))
    let die = Oracle.die_from_range("Test die", 1, 1);

    let group: Group.Group = {
        title: "Test Group",
        oracles: [table, shuffled_deck, die],
        frame: { 
            origin: {x: 2, y: 3},
            end: {x: 12, y: 13},
         }
    };
    let results = Group.pickall(group);
    let results_with_oracles:[Oracle.Option, Oracle.Oracle][] = [];
    for (let i = 0; i < results.length; i++) {
        results_with_oracles.push([results[i], group.oracles[i]]);
    }
    let summary = Group.summarise(results_with_oracles);
    expect(summary).toEqual("Test table: B, Test deck: A, Test die: 1");
});


