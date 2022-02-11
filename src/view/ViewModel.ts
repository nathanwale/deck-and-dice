import * as Oracle from '../models/Oracle'

export type OracleKey = number;

export type OracleResult = {
    oracle: Oracle.Oracle, 
    result: Oracle.Option,
}

export type OracleMap = Map<OracleKey, OracleResult>

export enum ActionType {
    PickAll,
    PickOne,
}

export type Action = {
    type: ActionType,
    value: any
}

export type State = {
    oracle_map: OracleMap,
    total: number,
}

export function pickall(oracle_map: OracleMap): number
{
    let new_total = 0
    for (const or of oracle_map.values()) {
        or.result = Oracle.pick(or.oracle);
        new_total += or.result.value ?? 0;
    }
    return new_total;
}

export function sum_oracles(oracle_map: OracleMap): number
{
    let total = 0;
    for (const {oracle, result} of oracle_map.values()) {
        total += result.value ?? 0
    }
    return total;
}


export function reducer(state: State, action: Action): State
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