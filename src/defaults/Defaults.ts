import * as DefaultDice from './DiceDefaults'
import * as DefaultDecks from './DeckDefaults'
import * as DefaultTables from './TableDefaults'

import * as Oracle from '../models/Oracle'


function die_from_config(config: DefaultDice.DiceConfig): Oracle.Oracle
{
    let [name, start, end] = config;
    return Oracle.die_from_range(name, start, end);
}

function table_from_config(config: DefaultTables.TableConfig): Oracle.Oracle
{
    let [name, options_strings] = config;
    let options = Oracle.options_from_names(options_strings)
    return Oracle.table_from_options(name, options);
}

function deck_from_config(config: DefaultDecks.DeckConfig): Oracle.Oracle
{
    let [name, options_strings] = config;
    let options = Oracle.options_from_names(options_strings)
    return Oracle.shuffled_deck(name, options);
}

export function default_dice(): Oracle.Oracle[]
{
    return DefaultDice.dice.map(die_from_config)
}

export function default_tables(): Oracle.Oracle[]
{
    return DefaultTables.tables.map(table_from_config)
}

export function default_decks(): Oracle.Oracle[]
{
    return DefaultDecks.decks.map(deck_from_config)
}