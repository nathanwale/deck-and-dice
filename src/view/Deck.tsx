import React from 'react';
import * as Oracle from '../models/Oracle';
import * as OracleMap from '../models/OracleMap';
import * as ViewModel from './ViewModel';

type Props = { 
    id: OracleMap.OracleId,
    deck: Oracle.Oracle,
    latest: Oracle.Option,
    index: number,
    dispatcher: React.Dispatch<ViewModel.Action>,
}

export function create(
    oracle: Oracle.Oracle, result: OracleMap.OracleDeck, 
    id: OracleMap.OracleId, dispatcher: React.Dispatch<ViewModel.Action>): JSX.Element
{
    let [card, card_index] = result;
    return <ShuffledDeck 
                deck={oracle} latest={card} 
                index={card_index} key={id} id={id} 
                dispatcher={dispatcher}/>
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

function UndealtDeck(props: { deck: Oracle.Oracle, index: number, dispatcher: ()=>void })
{
  let is_exhausted = Oracle.is_exhausted(props.deck, props.index);
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
    let action: ViewModel.Action = {
    type: ViewModel.ActionType.DealNext,
        id: props.id,
        value: props.index,
    }
    return (
        <div className="deck subgroup">
            <UndealtDeck 
                deck={ props.deck} index={ props.index} 
                dispatcher={ () => props.dispatcher(action) } />
            <DiscardPile card={ props.latest } />
        </div>
    )
}

