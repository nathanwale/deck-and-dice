import * as Oracle from '../models/Oracle'

export type OracleId = number;
export type OracleDeck = [Oracle.Option, number];
export type OracleResult = Oracle.Option | OracleDeck
export type OracleMap = [OracleId, Oracle.Oracle, OracleResult][]



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