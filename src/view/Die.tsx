import React from 'react';
import * as Oracle from '../models/Oracle';
import * as OracleMap from '../models/OracleMap';

type Props = { 
    die: Oracle.Oracle,
    result: Oracle.Option,
    picker: () => void,
}

export function create(
    oracle: Oracle.Oracle, result: Oracle.Option, 
    id: OracleMap.OracleId, picker: () => void): JSX.Element
{
    return <Die die={oracle} result={result}
                key={id} picker={ picker }/>
}

export function Die(props:Props)
{
    return (
        <div className='subgroup die'>
            <button onClick={ props.picker }>
                { props.result.value! }
            </button>
        </div>
    )
}