import React from 'react';
import * as Oracle from '../models/Oracle'
import {OracleMap, OracleKey, Action, ActionType} from './ViewModel'

type Props = { 
  deck: Oracle.Oracle,
  latest: Oracle.Option,
  dispatcher: () => void,
}

export function create(map: OracleMap, key: OracleKey, dispatcher: React.Dispatch<Action>): JSX.Element
{
    let {oracle, result} = map.get(key)!;
    let action = {
        type: ActionType.PickOne, 
        value: key
    }
    return <ShuffledDeck 
                deck={oracle} latest={result} key={key} 
                dispatcher={() => dispatcher(action)}/>
}

function DiscardPile(props: { card: Oracle.Option | null })
{
  let className = (props.card === null) ? "card-space" : "card";
  let content = (props.card === null) ? "" : props.card.name;
  return (
    <button className={ className }>
      { content }
    </button>
  )
}

function UndealtDeck(props: { deck: Oracle.Oracle, dispatcher: ()=>void })
{
  let is_exhausted = Oracle.is_exhausted(props.deck);
  let class_name = is_exhausted ? "undealt-none" : "undealt";
  let content = is_exhausted ? "" : "?";
  return (
    <button onClick={ props.dispatcher } className={ class_name }>
        { content }
    </button>
  )
}

export function ShuffledDeck(props: Props)
{
    return (
        <div className="deck subgroup">
            <UndealtDeck deck={ props.deck} dispatcher={ props.dispatcher } />
            <DiscardPile card={ props.latest } />
        </div>
    )
}

