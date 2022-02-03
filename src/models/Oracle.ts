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
}

export function options_from_names(names: string[]): Option[] {
    return names.map((name) => {
        return {
            name: name,
        }
    })
}

export function new_table(options: Option[]): Oracle
{
    return {
        style: Style.Table,
        options: options,
        index: 0,
    }
}

export function shuffled_deck(options: Option[]): Oracle 
{
    let shuffled_options = random.shuffle(options);
    return {
        style: Style.Cards,
        options: shuffled_options,
        index: 0,
    }
}

export function next_shuffled(deck: Oracle): [Option | null, Oracle]
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
            style: deck.style
        }
    ]
}

export function random_pick(oracle: Oracle): [Option, Oracle]
{
    return [random.pick(oracle.options), oracle];
}

export function pick(oracle: Oracle): [Option | null, Oracle]
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