import React, {useState} from 'react';
import './App.css';
import * as Oracle from '../models/Oracle'

type Props = { 
  die: Oracle.Oracle
}

export function Die(props:Props)
{
    let [roll, set_roll] = useState(Oracle.pick(props.die).value);
    function roll_die() {
        set_roll(Oracle.pick(props.die).value)
    }
    return (
        <div className='subgroup die'>
            <button onClick={ roll_die }>
                { roll }
            </button>
        </div>
    )
}