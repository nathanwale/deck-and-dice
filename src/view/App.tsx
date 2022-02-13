import React from 'react';

import './style/App.scss';
import * as Oracle from '../models/Oracle'
import * as OracleGroup from '../models/Group'
import { Group } from './Group';

let oracles = [
  Oracle.shuffled_deck("Pick a letter", Oracle.options_from_names("A23456789JQK".split(""))),
  Oracle.die_with_sides("Challenge", 8),
  Oracle.die_with_sides("Action", 6),
  Oracle.die_with_sides("Challenge", 8),
  Oracle.table_from_options("", Oracle.options_from_names(["Scheme", "Falter", "Advance", "Destroy", "Avoid", "Reveal"])),
]

let group: OracleGroup.Group = {
  title: "Group",
  oracles: oracles,
  frame: { origin: {x: 0, y: 0}, end: {x: 10, y: 10}}
}

function App() {
  return (
    <div className="App">
      <Group group={group} />
    </div>
  );
}

export default App;
