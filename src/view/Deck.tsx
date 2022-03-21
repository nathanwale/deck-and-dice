import React from 'react';
import * as Oracle from '../models/Oracle';
import * as OracleMap from '../models/OracleMap';

type Props = { 
    id: OracleMap.OracleId,
    deck: Oracle.Oracle,
    latest: Oracle.Option,
    index: number,
    picker: () => void,
}

export function create(
    oracle: Oracle.Oracle, result: OracleMap.OracleDeck, 
    id: OracleMap.OracleId, picker: () => void): JSX.Element
{
    const [card, card_index] = result;
    return <ShuffledDeck 
                deck={oracle} latest={card} 
                index={card_index} key={id} id={id} 
                picker={picker}/>
}

function DiscardPile(props: { card: Oracle.Option | null })
{
  const className = (props.card === null) ? "card-space" : "card";
  const content = (props.card === null) ? "" : props.card.name;
  return (
    <button className={ className }>
      { content }
    </button>
  )
}

function UndealtDeck(props: { deck: Oracle.Oracle, index: number, picker: ()=>void })
{
  const is_exhausted = Oracle.is_exhausted(props.deck, props.index);
  const class_name = is_exhausted ? "undealt-none" : "undealt";
  const content = is_exhausted ? "" : "?";
  return (
    <button onClick={ props.picker } className={ class_name }>
        { content }
    </button>
  )
}

export function ShuffledDeck(props: Props)
{
    return (
        <div className="deck subgroup">
            <span className='name'>{props.deck.name}</span>
            <UndealtDeck 
                deck={ props.deck} index={ props.index} 
                picker={ props.picker } />
            <DiscardPile card={ props.latest } />
        </div>
    )
}

