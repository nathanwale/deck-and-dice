import React, {useState} from 'react';
import './App.css';
import * as Oracle from '../models/Oracle'

type Props = { 
  deck: Oracle.Oracle
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

function UndealtDeck(props: { deck: Oracle.Oracle, deal: ()=>void })
{
  let is_exhausted = Oracle.is_exhausted(props.deck);
  let class_name = is_exhausted ? "undealt-none" : "undealt";
  let content = is_exhausted ? "" : "?";
  return (
    <button onClick={ props.deal } className={ class_name }>
      { content }
    </button>
  )
}

export function ShuffledDeck(props: Props)
{
    let [deck, setDeck] = useState(props.deck);
    let [card, setCard] = useState<Oracle.Option | null>(null);
    function deal()
    {
        if (!Oracle.is_exhausted(deck)) {
            let [new_card, new_deck] = Oracle.next_shuffled(deck);
            // console.log(`Deal: ${new_card?.name} from ${new_deck.name} (index: ${new_deck.index})`)
            setCard(new_card);
            setDeck(new_deck); 
        } 
    }

    return (
        <div className="deck subgroup">
            <UndealtDeck 
            deck={ deck}
            deal={ deal } />
            <DiscardPile card={ card } />
        </div>
    )
}

