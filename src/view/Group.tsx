import React, {useState} from 'react';

import './App.css';
import * as Oracle from '../models/Oracle'
import *  as OracleGroup from '../models/Group'
import { ShuffledDeck } from './Deck'
import { Die } from './Die'

type Props = { 
    group: OracleGroup.Group
}

type OracleKey = number;

type OracleResult = {
    oracle: Oracle.Oracle, 
    result: Oracle.Option,
}

type OracleMap = Map<OracleKey, OracleResult>

enum ActionType {
    PickAll,
    PickOne,
}

type Action = {
    type: ActionType,
    value: any
}

type State = {
    oracle_map: OracleMap,
    total: number,
}

function reducer(state: State, action: Action): State
{
    let {oracle_map, total} = state;
    switch (action.type) {
        case ActionType.PickAll:
            total = pickall(state.oracle_map);
            return {
                oracle_map: action.value,
                total: total,
            }
        case ActionType.PickOne:
            let key = action.value;
            let {oracle, result} = oracle_map.get(key)!;
            result = Oracle.pick(oracle);
            oracle_map.set(key, {oracle: oracle, result: result});
            total = sum_oracles(oracle_map);
            return {
                oracle_map: oracle_map,
                total: total,
            }
    }
    return state;
}

function sum_oracles(oracle_map: OracleMap): number
{
    let total = 0;
    for (const {oracle, result} of oracle_map.values()) {
        total += result.value ?? 0
    }
    return total;
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
            return <ShuffledDeck deck={oracle} key={key} />
        case Oracle.Style.Die:
            let action = {
                type: ActionType.PickOne, 
                value: key
            }
            return <Die 
                        die={oracle} result={result} 
                        key={key} updater={() => dispatcher(action)}/>
        case Oracle.Style.Table:
            return <div key={key}>{oracle.name}</div>
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


function update_oracle(map: OracleMap, key: OracleKey)
{
    let {oracle, result} = map.get(key)!;
    result = Oracle.pick(oracle);
    map.set(key, {
        oracle: oracle,
        result: result
    })
}

function oracle_updater(map: OracleMap, key: OracleKey): () => void
{
    return () => {
        update_oracle(map, key);
    }
} 

function pickall(oracle_map: OracleMap): number
{
    let new_total = 0
    for (const or of oracle_map.values()) {
        or.result = Oracle.pick(or.oracle);
        new_total += or.result.value ?? 0;
    }
    return new_total;
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
            <div className='total'>{state.total}</div>
        </div>
    )
}