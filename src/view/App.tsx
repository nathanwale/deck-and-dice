import React from 'react';

import './style/App.scss';
import * as Oracle from '../models/Oracle'
import * as OracleGroup from '../models/Group'
import { Group } from './Group';
import { Library } from './Library';

let oracles = [
  Oracle.shuffled_deck("Card deck", Oracle.options_from_names("A23456789JQK".split(""))),
  Oracle.die_with_sides("Challenge", 8),
  Oracle.die_with_sides("Action", 6),
  Oracle.die_with_sides("Challenge", 8),
  Oracle.table_from_options("Motivation", Oracle.options_from_names(["Scheme", "Falter", "Advance", "Destroy", "Avoid", "Reveal"])),
]

let group: OracleGroup.Group = {
  title: "Example",
  oracles: oracles,
  frame: { origin: {x: 0, y: 0}, end: {x: 10, y: 10}}
}

let init_groups = [group];

function show_groups(groups: OracleGroup.Group[]): JSX.Element[]
{
  return groups.map((g, i) => <Group group={g} key={i} />);
}

function App() 
{
  const [show_library, set_show_library] = React.useState(false);
  const [groups, set_groups] = React.useState(init_groups);
  
  function open_library()
  {
    set_show_library(true);
  }

  function on_done(group: OracleGroup.Group | null, title: string)
  {
    if (group !== null && group?.oracles.length > 0) {
        group.title = title;
        set_groups(groups.concat(group));
    }
    set_show_library(false);
  }

  function library_view(is_open: boolean): JSX.Element
  {
      if (is_open) {
          return <Library on_done={ (group, title) => on_done(group, title) } />
      } else {
          return <></>
      }
  }

  return ( <>
    <div className="App">
        { library_view(show_library) }
        { show_groups(groups) }
        <div className='add-group'>
            <button onClick={open_library}>➕</button>
        </div>
    </div>
  </>);
}

export default App;
