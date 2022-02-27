import React from 'react';
import * as OracleMap from '../models/OracleMap';
import * as Oracle from '../models/Oracle'
import * as OracleGroup from '../models/Group'
import * as ShuffledDeck from './Deck'
import * as Die from './Die'
import * as Table from './Table'

type Props = { 
    group: OracleGroup.Group
}

let next_key = 0;

type OracleUpdater = (id: OracleMap.OracleId, result: OracleMap.OracleResult) => void

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

function view_from_oracle_style(
    oracle: Oracle.Oracle, 
    result: OracleMap.OracleResult,
    id: OracleMap.OracleId,
    update_oracle: OracleUpdater): JSX.Element
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

function views_from_oracles(
    oracle_map: OracleMap.OracleMap,
    update_oracle: OracleUpdater): JSX.Element[]
{
    if (oracle_map.length === 0) {
        return [<button key='0' className='none'>Add an oracle</button>]
    } else {
        return oracle_map.map(
            (entry, index) => {
                let [id, oracle, result] = entry;
                return view_from_oracle_style(oracle, result, id, update_oracle);
            }
        );
    }
}

export function Group(props: Props)
{
    let [oracle_map, set_oracle_map] = React.useState([] as OracleMap.OracleMap);
    let [total, set_total] = React.useState(0);
    let [show_total, set_show_total] = React.useState(false);

    React.useEffect(() =>
    {
        let new_total = OracleMap.sum_oracles(oracle_map);
        set_total(new_total);
    })

    React.useEffect(() =>
    {
        let map = build_oracle_map(props.group.oracles);
        let dice_count = 0;
        for (const oracle of props.group.oracles) {
            if (oracle.style == Oracle.Style.Die) {
                dice_count++;
            }
        }
        set_show_total(dice_count >= 2);
        set_oracle_map(map);
    }, [props.group.oracles]);

    function update_oracle(id: OracleMap.OracleId, result: OracleMap.OracleResult)
    {
        let new_map = OracleMap.update(oracle_map, id, result);
        set_oracle_map(new_map);
    }

    function pick_all()
    {
        oracle_map = OracleMap.pickall(oracle_map);
        set_oracle_map(oracle_map);
    }
    
    return (
        <>
        <div className='group'>
            <header>{ props.group.title }</header>
            <div className='group-items'>
                { views_from_oracles(oracle_map, update_oracle) }
            </div>
            <button 
                className='pickall'
                onClick={ pick_all }>↺</button>
            { show_total && <div className='total'>Total: {total}</div> }
        </div>
        </>
    )
}