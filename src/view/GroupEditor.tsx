import React from 'react';
import {Group} from './Group'
import * as GroupModel from '../models/Group';

type Props = {
    group: GroupModel.Group,
    on_done: (group: GroupModel.Group, title: string) => void
}

export function GroupEditor(props: Props)
{
    let [title, set_title] = React.useState(props.group.title)
    return <div className='group-edit'>
        <Group group={props.group} />
        <div className='menu'>
            <input type='text' value={title} onChange={(e) => set_title(e.target.value)} />
        </div>
        <button className='done' onClick={() => props.on_done(props.group, title)}>Done</button>
    </div>
}