import { Deck, ShuffledDeck, deal, pick } from './Deck'
import { Card } from './Card'
import { Rect } from './Geometry'





export type Groupable = Deck | ShuffledDeck;

export type Summary = Card[];
export type Result = [Card, Groupable]

export type Group = {
    // summary: Summary,
    title: string,
    items: Groupable[],
    frame: Rect,
}

// export function runall(group: Group): Result[] {
//     return group.items.map((item) => {
//         if ("index" in item) {
//             let deck = deal(item);
//             return [];
//         } else {
//             return pick(item);
//         }
//     })
// }

