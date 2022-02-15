import React from 'react';
import * as Oracle from '../models/Oracle';
import * as OracleMap from '../models/OracleMap';
import * as ViewModel from './ViewModel';

type Props = { 
    oracle: Oracle.Oracle,
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