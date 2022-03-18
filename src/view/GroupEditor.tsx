import React from 'react';
import {Group} from './Group'
import * as GroupModel from '../models/Group';

type Props = {
    group: GroupModel.Group,
    on_done: (group: GroupModel.Group | null, title: string) => void
}

export function GroupEditor(props: Props)
{
    const [title, set_title] = React.useState(props.group.title)

    React.useEffect(() => {
        props.group.title = title;
    }, [title, props.group.title])

    function update_title(event: React.ChangeEvent<HTMLInputElement>) {
        set_title(() => event.target.value);
    }

    return <div className='group-edit'>
        <Group group={props.group} />
        <div className='menu'>
            <label>
                Title: 
                <input type='text' value={title} onChange={ update_title } />
            </label>
        </div>
        <button className='cancel' onClick={() => props.on_done(null, "")}>Cancel</button>
        <button className='add' onClick={() => props.on_done(props.group, title)}>Add group</button>
    </div>
}