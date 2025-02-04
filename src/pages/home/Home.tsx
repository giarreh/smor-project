import { useNavigate } from 'react-router';
import './Home.css';
import 'animate.css';

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = () =>{
    navigate('/greeting');
  }

  return (
    <div className='home animate__animated animate__fadeIn'>
      <p className='animate__animated animate__fadeInUp animate__delay-1s'>
      What is Smør Engine?
      </p> 
      <br />

      <p className='text1 animate__animated animate__fadeInUp animate__delay-3s'>The internet has gotten a bit stale lately, filled with dry, bland content. That’s why we churned up SMØR ENGINE, a rich, creamy way to browse online without getting stuck in the boring bits. </p>
      <br />
      <br />
      <p className='text1 animate__animated animate__fadeInUp animate__delay-5s'>
        No search bars here, just one buttery-smooth button. With a single click, you’ll be whisked away on an adventure, gliding from one delightful discovery to the next. No fuss, no crumbs—just pure, spreadable fun!
      </p>

      <br />
      <br />
      <button className='animate__animated animate__bounceIn animate__delay-5s' onClick={handleNavigate}>Try me!</button>
    </div>
  );
}
