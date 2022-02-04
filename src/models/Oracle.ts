import * as random from '../random'

export enum Style {
    Table,
    Cards,
    Die
}

export type Option = {
    name: string,
    value?: number,
}

export type Oracle = {
    style: Style,
    options: Option[],
    index: number,
    name: string,
}

export type Result = [Option | null, Oracle];

export function options_from_names(names: string[]): Option[] {
    return names.map((name) => {
        return {
            name: name,
        }
    })
}

export function table_from_options(name: string, options: Option[]): Oracle
{
    return {
        style: Style.Table,
        options: options,
        index: 0,
        name: name,
    }
}

export function die_from_range(name: string, start: number, end: number): Oracle
{
    let range: number[] = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }

    let options: Option[] = range.map(
        (n: number) => {
            return { name: n.toString(), value: n }
        });

    return {
        style: Style.Die,
        index: 0,
        options: options,
        name: name,
    }
}

export function shuffled_deck(name: string, options: Option[]): Oracle 
{
    let shuffled_options = random.shuffle(options);
    return {
        style: Style.Cards,
        options: shuffled_options,
        index: 0,
        name: name,
    }
}

export function next_shuffled(deck: Oracle): Result
{
    let index = deck.index;
    let card = (index < deck.options.length) ? deck.options[index] : null
    if (index < deck.options.length) {
        index++;
    }
    return [
        card,
        {
            index: index,
            options: deck.options,
            style: deck.style,
            name: deck.name
        }
    ]
}

export function random_pick(oracle: Oracle): Result
{
    return [random.pick(oracle.options), oracle];
}

export function pick(oracle: Oracle): Result
{
    switch (oracle.style) {
        case Style.Cards:
            return next_shuffled(oracle);
        default:
            return random_pick(oracle);
    }
}

/*
** Cards that haven't been dealt yet
*/
export function undealt_cards(deck: Oracle): Option[]
{
    let { options, index } = deck;
    return options.slice(index)
}

/*
** Cards that have been dealt already
*/
export function dealt_cards(deck: Oracle): Option[]
{
    let { options, index } = deck;
    return options.slice(0, index)
}

/*
** Has deck finished dealing?
*/
export function is_exhausted(deck: Oracle): boolean
{
    let { options, index } = deck;
    return (index >= options.length)
}

/*
** Summarise a result
*/
// export function summarise(result: Result): string
// {
//     let [option, oracle] = result;
//     return `${oracle.}`
// }