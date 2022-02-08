import * as random from '../random'

export enum Style {
    Table = "table",
    Cards = "deck",
    Die = "die"
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

export function die_with_sides(name: string, sides: number)
{
    return die_from_range(name, 1, sides);
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

export function next_shuffled(deck: Oracle): [Option, Oracle]
{
    let index = deck.index;
    let card: Option;
    if (index < deck.options.length) {
        deck.index++;
        card = deck.options[index];
    } else {
        card = deck.options[deck.options.length-1];
    }
    return [card, deck];
}

export function random_pick(oracle: Oracle): Option
{
    return random.pick(oracle.options);
}

export function pick(oracle: Oracle): Option
{
    return random_pick(oracle);
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
export function summarise(option: Option, oracle: Oracle): string
{
    return `${oracle.name}: ${option?.name}`
}