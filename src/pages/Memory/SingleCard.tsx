import cover from './cards/cover.png';
import './Memory.css';
import { Card } from './Card';

interface SingleCardProps {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
}

export default function SingleCard({card, handleChoice, flipped, disabled}: SingleCardProps) {

  const handleClick = () => {
    if(!disabled){
      handleChoice(card);
    }

  }

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src}  alt="card front" />
        <img className='back' 
        src={cover} 
        alt="card back" 
        onClick={handleClick} />
      </div>
    </div>
  )
}
