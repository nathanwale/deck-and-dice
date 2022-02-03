import * as Deck from './models/Deck'
import * as Card from './models/Card'

function test_shuffle() {
    let deck:Deck.Deck = {
        cards: Card.from_names("abc".split(""))
    }
    trial (
        "Card shuffle",
        1000000,
        () => Deck.shuffle(deck),
        (deck: Deck.ShuffledDeck) => Deck.as_string(deck)
    )
}

function test_pick() {
    let deck:Deck.Deck = {
        cards: Card.from_names("abc".split(""))
    }
    trial (
        "Pick a card",
        1000000,
        () => Deck.pick(deck),
        (card: Card.Card) => card.name
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