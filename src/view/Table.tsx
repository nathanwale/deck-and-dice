import React from 'react';
import './App.css';
import * as Oracle from '../models/Oracle';
import {OracleMap, OracleKey, Action, ActionType} from './ViewModel'

type Props = { 
    oracle: Oracle.Oracle,
    result: Oracle.Option,
    dispatcher: () => void,
}

export function create(map: OracleMap, key: OracleKey, dispatcher: React.Dispatch<Action>): JSX.Element
{
    let {oracle, result} = map.get(key)!;
    let action = {
        type: ActionType.PickOne, 
        value: key
    }
    return <Table oracle={oracle} result={result} 
                key={key} dispatcher={() => dispatcher(action)}/>
}

export function Table(props:Props)
{
    return (
        <div className='subgroup table'>
            <button onClick={ props.dispatcher }>
                { props.result.name }
            </button>
        </div>
    )
}