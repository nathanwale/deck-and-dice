import React from 'react';
import {Group} from './Group'
import * as GroupModel from '../models/Group';

type Props = {
    group: GroupModel.Group,
    on_done: (group: GroupModel.Group) => void
}

export function GroupEditor(props: Props)
{
    return <div className='group-edit'>
        <Group group={props.group} />
        <div className='menu'>
            <input type='text' />
        </div>
        <button className='done' onClick={() => props.on_done(props.group)}>Done</button>
    </div>
}