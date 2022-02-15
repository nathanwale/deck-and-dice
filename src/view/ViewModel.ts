import * as OracleMap from "../models/OracleMap";
import * as Oracle from "../models/Oracle";


export enum ActionType {
    PickAll,
    PickOne,
    DealNext,
}

export type Action = {
    type: ActionType,
    id?: OracleMap.OracleId,
    value: any
}

export type State = {
    oracle_map: OracleMap.OracleMap,
    total: number,
}

export function reducer(state: State, action: Action): State
{
    let {oracle_map, total} = state;
    switch (action.type) {
        case ActionType.PickAll:
            return action_pick_all(oracle_map, total);
        case ActionType.PickOne:
            return action_pick_one(oracle_map, action.id!, total);
        case ActionType.DealNext:
            return action_deal_next(oracle_map, action.id!, action.value, total);
    }
    return state;
}

/*
** Actions
*/
function action_pick_all(oracle_map: OracleMap.OracleMap, total: number): State
{
    const new_map = OracleMap.pickall(oracle_map);
    return {
        oracle_map: new_map,
        total: OracleMap.sum_oracles(new_map),
    }
}

function action_pick_one(oracle_map: OracleMap.OracleMap, id: OracleMap.OracleId, total: number): State 
{
    const index = OracleMap.index_from_id(oracle_map, id);
    const oracle: Oracle.Oracle = oracle_map[index][1];
    const result = Oracle.pick(oracle);
    oracle_map[index][2] = result;
    total = OracleMap.sum_oracles(oracle_map);
    return {
        oracle_map: oracle_map,
        total: total,
    }
}

function action_deal_next(oracle_map: OracleMap.OracleMap, id: OracleMap.OracleId, card_index: number, total: number): State 
{
    const index = OracleMap.index_from_id(oracle_map, id);
    const oracle: Oracle.Oracle = oracle_map[index][1];
    const result = Oracle.next(oracle, card_index);
    oracle_map[index][2] = result;
    total = OracleMap.sum_oracles(oracle_map);
    return {
        oracle_map: oracle_map,
        total: total,
    }
}