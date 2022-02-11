import React from 'react';
import './App.css';
import * as Oracle from '../models/Oracle';
import {OracleMap, OracleKey, Action, ActionType} from './ViewModel'

type Props = { 
    die: Oracle.Oracle,
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
    return <Die die={oracle} result={result} 
                key={key} dispatcher={() => dispatcher(action)}/>
}

export function Die(props:Props)
{
    return (
        <div className='subgroup die'>
            <button onClick={ props.dispatcher }>
                { props.result.value! }
            </button>
        </div>
    )
}