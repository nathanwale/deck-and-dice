import React, {useState} from 'react';
import './App.css';
import * as Oracle from '../models/Oracle'

type Props = { 
    die: Oracle.Oracle,
    result: Oracle.Option,
    updater: () => void,
}

export function Die(props:Props)
{
    return (
        <div className='subgroup die'>
            <button onClick={ props.updater }>
                { props.result.value! }
            </button>
        </div>
    )
}