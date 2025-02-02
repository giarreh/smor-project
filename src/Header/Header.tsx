import { useNavigate } from 'react-router';

import SmorLogo from './SmorLogo.svg'
import './Header.css'

export default function Header() {
  const navigate = useNavigate();

  return (
      <div className='header'>
        <div>
          <h1 className='headerText' onClick={() => navigate('/')}>
          Velkommen til {''} 
            <img src={SmorLogo} height={45} alt="Smør" className="img-align" />
          </h1>        
        </div>
      </div>
  )
}
