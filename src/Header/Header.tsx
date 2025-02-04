import { useNavigate } from 'react-router';

import SmorLogo from './SmorLogo.svg'
import './Header.css'
import 'animate.css';

export default function Header() {
  const navigate = useNavigate();
  return (
      <div className='header animate__animated animate__fadeIn'>
        <div>
          <h1 className='headerText' onClick={() => navigate('/')}>
          Welcome to {''} 
            <img src={SmorLogo} height={45} alt="Smør" className="img-align animate__animated animate__fadeIn animate__delay-1s" />
          </h1>        
        </div>
      </div>
  )
}
