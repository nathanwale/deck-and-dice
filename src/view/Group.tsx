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

let next_key = 0;

function build_oracle_map(oracles: Oracle.Oracle[]): OracleMap.OracleMap
{
    return oracles.map(
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
}

export function Group(props: Props)
{
    let [oracle_map, set_oracle_map] = React.useState(build_oracle_map(props.group.oracles));
    let [total, set_total] = React.useState(0);

    function update_total()
    {
        let new_total = OracleMap.sum_oracles(oracle_map);
        set_total(new_total);
    }

    function update_oracle(id: OracleMap.OracleId, result: OracleMap.OracleResult)
    {
        let new_map = OracleMap.update(oracle_map, id, result);
        update_total();
        set_oracle_map(new_map);
    }

    function pick_all()
    {
        oracle_map = OracleMap.pickall(oracle_map);
        set_oracle_map(oracle_map);
        update_total();
    }

    function view_from_oracle_style(
        index: number, oracle: Oracle.Oracle, 
        result: OracleMap.OracleResult,
        id: OracleMap.OracleId): JSX.Element
    {
        switch (oracle.style) {
            case Oracle.Style.Cards:
                return ShuffledDeck.create(oracle, result as OracleMap.OracleDeck, id,
                    () => {
                        let card_index: number =  (result as OracleMap.OracleDeck)[1];
                        let new_result = Oracle.next(oracle, card_index);
                        update_oracle(id, new_result);
                    }
                );
            case Oracle.Style.Die:
                return Die.create(oracle, result as Oracle.Option, id, 
                    () => { 
                        let new_result = Oracle.pick(oracle);
                        update_oracle(id, new_result);
                    }
                );
            case Oracle.Style.Table:
                return Table.create(
                    oracle, result as Oracle.Option, id, 
                    () => { 
                        let new_result = Oracle.pick(oracle);
                        update_oracle(id, new_result);
                    }
                );
        }
    }

    function views_from_oracles(oracle_map: OracleMap.OracleMap): JSX.Element[]
    {
        return oracle_map.map(
            (entry, index) => {
                let [id, oracle, result] = entry;
                return view_from_oracle_style(index, oracle, result, id);
            }
        );
    }
    

    return (
        <>
        <div className='group'>
            <div className='group-items'>
                { views_from_oracles(oracle_map) }
            </div>
            <button 
                className='pickall'
                onClick={ pick_all }>↺</button>
            <div className='total'>Total: {total}</div>
        </div>
        </>
    )
}