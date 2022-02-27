import React from 'react';
import * as Oracle from '../models/Oracle';
import * as OracleMap from '../models/OracleMap';

type Props = { 
    oracle: Oracle.Oracle,
    result: Oracle.Option,
    picker: () => void,
}

export function create(
    oracle: Oracle.Oracle, result: Oracle.Option, 
    id: OracleMap.OracleId, picker: () => void): JSX.Element
{
    return <Table 
                oracle={oracle} result={result} 
                key={id} picker={ picker }/>
}

export function Table(props:Props)
{
    return (
        <div className='subgroup table'>
            <span className='name'>{props.oracle.name}</span>
            <button onClick={ props.picker }>
                { props.result.name }
            </button>
        </div>
    )
}