import React from 'react';
import * as Oracle from '../models/Oracle'
import * as OracleGroup from '../models/Group'
import * as ShuffledDeck from './Deck'
import * as Die from './Die'
import * as Table from './Table'
import {OracleMap, OracleKey, OracleResult, Action, ActionType, State, reducer} from './ViewModel'

type Props = { 
    group: OracleGroup.Group
}

function build_oracle_map(oracles: Oracle.Oracle[]): OracleMap
{
    let next_key = 0;
    let oracle_map: OracleMap = new Map<number, OracleResult>()
    for (const oracle of oracles) {
        oracle_map.set(next_key, {
            oracle: oracle,
            result: Oracle.pick(oracle)
        })
        next_key++;
    }
    return oracle_map;
}

function view_from_oracle_style(map: OracleMap, key: OracleKey, dispatcher: React.Dispatch<Action>): JSX.Element
{
    let {oracle, result} = map.get(key)!;
    switch (oracle.style) {
        case Oracle.Style.Cards:
            return ShuffledDeck.create(map, key, dispatcher);
        case Oracle.Style.Die:
            return Die.create(map, key, dispatcher);
        case Oracle.Style.Table:
            return Table.create(map, key, dispatcher);
    }
}

function views_from_oracles(oracle_map: OracleMap, dispatcher: React.Dispatch<Action>): JSX.Element[]
{
    let views: JSX.Element[] = [];
    for (const key of oracle_map.keys()) {
        let view = view_from_oracle_style(oracle_map, key, dispatcher);
        views.push(view);
    }
    return views;
}


export function Group(props: Props)
{
    let initial_state: State = {
        oracle_map: build_oracle_map(props.group.oracles),
        total: 0,
    } 
    let [state, dispatcher] = React.useReducer(reducer, initial_state);

    return (
        <div className='group'>
            <div className='group-items'>
                { views_from_oracles(state.oracle_map, dispatcher) }
            </div>
            <button 
                className='pickall'
                onClick={ () => dispatcher({type: ActionType.PickAll, value: state.oracle_map}) }>↺</button>
            <div className='total'>Total: {state.total}</div>
        </div>
    )
}