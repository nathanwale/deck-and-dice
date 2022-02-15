import React from 'react';
import * as Oracle from '../models/Oracle';
import * as OracleMap from '../models/OracleMap';
import * as ViewModel from './ViewModel';

type Props = { 
    die: Oracle.Oracle,
    result: Oracle.Option,
    dispatcher: () => void,
}

export function create(
    oracle: Oracle.Oracle, result: Oracle.Option, 
    id: OracleMap.OracleId, dispatcher: React.Dispatch<ViewModel.Action>): JSX.Element
{
    let action = {
        type: ViewModel.ActionType.PickOne, 
        value: null,
        id: id,
    }
    return <Die die={oracle} result={result}
                key={id} dispatcher={() => dispatcher(action)}/>
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