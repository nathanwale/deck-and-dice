import React from 'react';
import * as Oracle from '../models/Oracle';
import {OracleMap, OracleId, Action, ActionType} from './ViewModel'

type Props = { 
    oracle: Oracle.Oracle,
    result: Oracle.Option,
    dispatcher: () => void,
}

export function create(oracle: Oracle.Oracle, result: Oracle.Option, id: OracleId, dispatcher: React.Dispatch<Action>): JSX.Element
{
    let action = {
        type: ActionType.PickOne, 
        value: null,
        id: id,
    }
    return <Table 
                oracle={oracle} result={result} 
                key={id} dispatcher={() => dispatcher(action)}/>
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