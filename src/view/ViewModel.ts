import * as Oracle from '../models/Oracle'

export type OracleId = number;
export type OracleDeck = [Oracle.Option, number];
export type OracleResult = Oracle.Option | OracleDeck
export type OracleMap = [OracleId, Oracle.Oracle, OracleResult][]

export enum ActionType {
    PickAll,
    PickOne,
    DealNext,
}

export type Action = {
    type: ActionType,
    id?: OracleId,
    value: any
}

export type State = {
    oracle_map: OracleMap,
    total: number,
}

export function index_from_id(oracle_map: OracleMap, id: OracleId): number
{
    let index = 0;
    for (const entry of oracle_map) {
        if (entry[0] == id) {
            return index;
        }
        index++;
    }
    return -1;
}

export function pickall(oracle_map: OracleMap): OracleMap
{
    return oracle_map.map(entry => {
        const [id, oracle, result] = entry;
        let new_result: OracleResult;
        switch (oracle.style) {
            case Oracle.Style.Cards:
                let index: number = (result as OracleDeck)[1];
                new_result = Oracle.next(oracle, index);
                break;
            default:
                new_result = Oracle.pick(oracle);
        }
        return [id, oracle, new_result]
    });
}

export function sum_oracles(oracle_map: OracleMap): number
{
    return oracle_values(oracle_map).reduce(
        (cur, acc) => acc += cur);
}

export function oracle_values(oracle_map: OracleMap): number[]
{
    return oracle_map.map(
        entry => {
            const [_, oracle, result] = entry;
            let option: Oracle.Option;
            if (oracle.style == Oracle.Style.Cards) {
                option = (result as OracleDeck)[0];
            } else {
                option = (result as Oracle.Option)
            }
            return option.value ?? 0;
        }
    );
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
function action_pick_all(oracle_map: OracleMap, total: number): State
{
    const new_map = pickall(oracle_map);
    return {
        oracle_map: new_map,
        total: sum_oracles(new_map),
    }
}

function action_pick_one(oracle_map: OracleMap, id: OracleId, total: number): State 
{
    const index = index_from_id(oracle_map, id);
    const oracle: Oracle.Oracle = oracle_map[index][1];
    const result = Oracle.pick(oracle);
    oracle_map[index][2] = result;
    total = sum_oracles(oracle_map);
    return {
        oracle_map: oracle_map,
        total: total,
    }
}

function action_deal_next(oracle_map: OracleMap, id: OracleId, card_index: number, total: number): State 
{
    const index = index_from_id(oracle_map, id);
    const oracle: Oracle.Oracle = oracle_map[index][1];
    const result = Oracle.next(oracle, card_index);
    oracle_map[index][2] = result;
    total = sum_oracles(oracle_map);
    return {
        oracle_map: oracle_map,
        total: total,
    }
}