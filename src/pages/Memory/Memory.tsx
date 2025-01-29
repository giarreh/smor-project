import {useState, useEffect} from 'react'
import butter1 from './cards/butter-1.png';
import butter2 from './cards/butter-2.png';
import butter3 from './cards/butter-3.png';
import butter4 from './cards/butter-4.png';
import './Memory.css';
import SingleCard from './SingleCard';

export default function Memory() {
  const cardImages = [
    { src: butter1, matched: false },
    { src: butter2, matched: false },
    { src: butter3, matched: false },
    { src: butter4, matched: false },
  ];

  const [cards, setCards] = useState<{ id: number; src: string, matched: boolean }[]>([])
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<{ id: number; src: string, matched: boolean } | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<{ id: number; src: string, matched: boolean } | null>(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) =>({...card, id: Math.random()}))

    setCards(shuffledCards);
    setTurns(0);
  }

  //handle choice
  const handleChoice = (card) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // reset
  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
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
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCards();
  }, [])

  console.log(cards);

  return (
    <div>
      <h1>hello</h1>
      <button onClick={shuffleCards}>Shuffle</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>

    </div>
  )
}
