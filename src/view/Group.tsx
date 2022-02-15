import React from 'react';
import * as OracleMap from '../models/OracleMap';
import * as Oracle from '../models/Oracle'
import * as OracleGroup from '../models/Group'
import * as ShuffledDeck from './Deck'
import * as Die from './Die'
import * as Table from './Table'

import * as ViewModel from './ViewModel';

type Props = { 
    group: OracleGroup.Group
}


function build_oracle_map(oracles: Oracle.Oracle[]): ViewModel.State
{
    let next_key = 0;
    let oracle_map: OracleMap.OracleMap = oracles.map(
        oracle => {
            let result: OracleMap.OracleResult;
            switch (oracle.style) {
                case Oracle.Style.Cards:
                    result = Oracle.next(oracle, 0);
                    break;
                default:
                    result = Oracle.pick(oracle);
            }
            return [next_key++, oracle, result]
        }
    );
    return {
        oracle_map: oracle_map,
        total: OracleMap.sum_oracles(oracle_map),
    }
}

function view_from_oracle_style(
    oracle: Oracle.Oracle, result: OracleMap.OracleResult, 
    id: OracleMap.OracleId, dispatcher: React.Dispatch<ViewModel.Action>): JSX.Element
{
    switch (oracle.style) {
        case Oracle.Style.Cards:
            return ShuffledDeck.create(oracle, result as OracleMap.OracleDeck, id, dispatcher);
        case Oracle.Style.Die:
            return Die.create(oracle, result as Oracle.Option, id, dispatcher);
        case Oracle.Style.Table:
            return Table.create(oracle, result as Oracle.Option, id, dispatcher);
    }
}

function views_from_oracles(
    oracle_map: OracleMap.OracleMap, 
    dispatcher: React.Dispatch<ViewModel.Action>): JSX.Element[]
{
    return oracle_map.map(
        entry => {
            let [id, oracle, result] = entry;
            return view_from_oracle_style(oracle, result, id, dispatcher);
        }
    );
}


export function Group(props: Props)
{
    let [state, dispatcher] = React.useReducer(ViewModel.reducer, props.group.oracles, build_oracle_map);

    return (
        <div className='group'>
            <div className='group-items'>
                { views_from_oracles(state.oracle_map, dispatcher) }
            </div>
            <button 
                className='pickall'
                onClick={ () => dispatcher({type: ViewModel.ActionType.PickAll, value: state.oracle_map}) }>↺</button>
            <div className='total'>Total: {state.total}</div>
        </div>
    )
}