import React from 'react'
import {  Draggable    } from 'react-smooth-dnd'
import Card from 'components/ListCard/Card/Card'

function ListCard(props ) {
  const { cards } = props 
  return  cards.map((card, index) => (
        <Draggable key={index}>
          <Card card={card} />
        </Draggable>
    ))
}

export default React.memo(ListCard)  