import React, {useState} from 'react';

import './App.css';
import * as Oracle from '../models/Oracle'
import *  as OracleGroup from '../models/Group'
import { ShuffledDeck } from './Deck'
import { Die } from './Die'

type Props = { 
    group: OracleGroup.Group
}

type OracleViewModel = {
    oracle: Oracle.Oracle, 
    result: Oracle.Option,
    key: number,
}

type State = {
    oracles: OracleViewModel[]
    summary: string,
    total: number,
}

function build_view_models(oracles: Oracle.Oracle[]): OracleViewModel[]
{
    let oracle_vms: OracleViewModel[] = oracles.map(
        oracle => ({
            oracle: oracle, 
            key: 0,
            result: Oracle.pick(oracle)
        })
    );
    let next_key = 0;
    oracle_vms.map(ovm => {
        ovm.key = next_key;
        next_key++;
    });
    return oracle_vms;
}

function view_from_oracle_style(oracle_view_model: OracleViewModel)
{
    let {oracle, key, result} = oracle_view_model;
    switch (oracle.style) {
        case Oracle.Style.Cards:
            return <ShuffledDeck deck={oracle} key={key} />
        case Oracle.Style.Die:
            return <Die die={oracle} key={key}/>
        case Oracle.Style.Table:
            return <div key={key}>{oracle.name}</div>
    }
}

function views_from_oracles(oracles: OracleViewModel[])
{
    return oracles.map(view_from_oracle_style);
}

function pickall_button(onClick: () => void)
{
    return (
        <button 
            className='pickall'
            onClick={ onClick }>↺</button>
    )
}

export function Group(props: Props)
{
    let [oracle_view_models, setOracleViewModels] = useState(build_view_models(props.group.oracles));
    let [total, setTotal] = useState(0);

    function pickall()
    {
        for (const ovm of oracle_view_models) {
            ovm.result = Oracle.pick(ovm.oracle);
        }
        let results = oracle_view_models.map(ovm => ovm.result);
        let total = OracleGroup.sum(results);
        setTotal(total);
        setOracleViewModels(oracle_view_models);
    }

    return (
        <div className='group'>
            <div className='group-items'>
                { views_from_oracles(oracle_view_models) }
            </div>
            { pickall_button(pickall) }
            <div className='total'>{total}</div>
        </div>
    )
}