import * as Oracle from './models/Oracle'

function as_string(deck: Oracle.Oracle): string
{
    let names = deck.options.map((card) => card.name);
    return names.join(", ")
}

function test_shuffle() {
    let cards = Oracle.options_from_names("abc".split(""));
    trial (
        "Card shuffle",
        1000000,
        () => Oracle.shuffled_deck("", cards),
        (deck) => as_string(deck)
    )
}

function test_pick() {
    let table = Oracle.table_from_options("", Oracle.options_from_names("abc".split("")));
    trial (
        "Pick a card",
        1000000,
        () => Oracle.pick(table),
        (result: [Oracle.Option, Oracle.Oracle]) => result[0].name
    )
}

function test_dice() 
{
    let die = Oracle.die_from_range("", 17, 28);
    trial (
        "Roll dice (17, 28)",
        1000000,
        () => Oracle.pick(die),
        (result: [Oracle.Option, Oracle.Oracle]) => (result[0].value === undefined) ? "undefined" : result[0].value.toString()
    )
}

function trial(description: string, times: number, randfn: () => any, keyfn: (a: any) => string) {
    let count:any = {};
    for (let i = 0; i < times; i++) {
        let thing = randfn();
        let key = keyfn(thing);
        if (key in count) { 
            count[key]++;
        } else {
            count[key] = 1;
        }
    }
    
    console.log("--------------")
    console.log(description)
    console.log("--------------")
    // show counts of all possible permutations
    for (let key in count) {
        console.log(`${key}: ${count[key]}`);
    }
}

test_shuffle()
test_pick()
test_dice()