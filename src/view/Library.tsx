import React from 'react';
import * as Oracle from '../models/Oracle';
import * as OracleMap from '../models/OracleMap';
import * as ViewModel from './ViewModel';
import {Group} from './Group'
import * as GroupModel from '../models/Group';

type Props = {
    oracles: Oracle.Oracle[],
    on_done: (group: GroupModel.Group) => void
}

const init_group: GroupModel.Group = {
    title: "Group",
    oracles: [],
    frame: { origin: {x: 0, y: 0}, end: {x: 10, y: 10}}
}

export function Library(props: Props): JSX.Element
{

    const [group, set_group] = React.useState(init_group);

    function add_oracle(oracle: Oracle.Oracle)
    {
        set_group(GroupModel.add_oracle(group, oracle))
    }

    const oracle_buttons = props.oracles.map((oracle, key) => {
        return (
            <button key={key} onClick={() => add_oracle(oracle)}>
                <strong>{ oracle.name }</strong><br />
            </button>
        )
    });

    return <>
        <div className='library'>
            <div className='oracles'>
                { oracle_buttons }
            </div>
            <Group group={group} />
            <div className='menu'>
                <input type='text' />
                <label>
                    <input type='checkbox' checked={false} readOnly={true} />
                    Show total
                </label>
            </div>
            <button className='done' onClick={() => props.on_done(group)}>Done</button>
        </div>
    </>
}