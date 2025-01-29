import React from 'react'
import cover from './cards/cover.png';
import './Memory.css';

export default function SingleCard({card, handleChoice, flipped}) {

  const handleClick = () => {
    handleChoice(card);
  }

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src} height={150} width={150} alt="card front" />
        <img className='back' 
        src={cover} 
        height={150} width={150} 
        alt="card back" 
        onClick={handleClick} />
      </div>
    </div>
  )
}
