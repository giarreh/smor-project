/* eslint-disable */
import {useState, useEffect} from 'react'
import butter1 from './cards/butter-1.png';
import butter2 from './cards/butter-2.png';
import butter3 from './cards/butter-3.png';
import butter4 from './cards/butter-4.png';
import './Memory.css';
import SingleCard from './SingleCard';
import ReactConfetti from 'react-confetti';
import { Card } from './Card';

export default function Memory() {


  const cardImages = [
    { src: butter1, matched: false },
    { src: butter2, matched: false },
    { src: butter3, matched: false },
    { src: butter4, matched: false },
  ];

  const [cards, setCards] = useState<Card[]>([])
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [winner, setWinner] = useState(false);
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) =>({...card, id: Math.random()}))

    setCards(shuffledCards);
    setTurns(0);
  }

  //handle choice
  const handleChoice = (card: Card) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  // reset
  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
    setWinner(false);
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            return card;
          })
        })
        resetChoices();
      }
      else {
        setTimeout(() => resetChoices(), 1000);
      }
    }
    const allMatched = cards.every(card => card.matched);
    if(allMatched) {
      setWinner(true);
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCards();
    setWinner(false);
  }, [])

  // check if all cards are matched
  

  console.log(cards, turns);

  return (
    <div>
      <div>
        <h2>Memory Game</h2>
        <p>Turns: {turns}</p>
      </div>
      {/* @ts-ignore */}
      <div className="card-grid">
        {winner && <ReactConfetti height={1000} width={1920}/>}
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}
