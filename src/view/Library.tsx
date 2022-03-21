import React from 'react';
import * as Oracle from '../models/Oracle';
import {GroupEditor} from './GroupEditor'
import * as GroupModel from '../models/Group';
import * as Defaults from '../defaults/Defaults'

type Props = {
    on_done: (group: GroupModel.Group | null, title: string) => void
}

type SectionProps = {
    name: string,
    oracles: Oracle.Oracle[],
    adder: (oracle: Oracle.Oracle) => void
}

const init_group: GroupModel.Group = {
    title: "Group",
    oracles: [],
    frame: { origin: {x: 0, y: 0}, end: {x: 10, y: 10}}
}



function LibrarySection(props: SectionProps): JSX.Element
{
    const oracle_buttons = props.oracles.map((oracle, key) => {
        return (
            <button key={key} onClick={() => props.adder(oracle)}>
                <strong>{ oracle.name }</strong><br />
            </button>
        )
    });

    return <>
        <header>{ props.name }</header>
        <section>
            { oracle_buttons }
        </section>
    </>
}

export function Library(props: Props): JSX.Element
{
    const [group, set_group] = React.useState(init_group);

    function add_oracle(oracle: Oracle.Oracle)
    {
        const updated_group = GroupModel.add_oracle(group, oracle)
        set_group(updated_group);
    }

    return <>
        <div className='library'>
            <div className='oracles'>
                <LibrarySection name="Dice" oracles={ Defaults.default_dice() } adder={ add_oracle } />
                <LibrarySection name="Tables" oracles={ Defaults.default_tables() } adder={ add_oracle } />
                <LibrarySection name="Decks" oracles={ Defaults.default_decks() } adder={ add_oracle } />
            </div>
            <GroupEditor group={ group } on_done={ props.on_done } />
        </div>
    </>
}