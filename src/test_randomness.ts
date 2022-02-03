import { Oracle, Option, pick, options_from_names, shuffled_deck, new_table } from './models/Oracle'

function as_string(deck: Oracle): string
{
    let names = deck.options.map((card) => card.name);
    return names.join(", ")
}

function test_shuffle() {
    let cards = options_from_names("abc".split(""));
    trial (
        "Card shuffle",
        1000000,
        () => shuffled_deck(cards),
        (deck) => as_string(deck)
    )
}

function test_pick() {
    let table = new_table(options_from_names("abc".split("")));
    trial (
        "Pick a card",
        1000000,
        () => pick(table),
        (result: [Option, Oracle]) => result[0].name
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