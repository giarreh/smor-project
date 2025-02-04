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
      Our silky-smooth, ultra-fast search engine spreads you straight to the good stuff. No need to use plain old text to search because let’s face it, text is as dry as toast without butter!
      </p>

      <br />
      <br />
      <button className='animate__animated animate__bounceIn animate__delay-5s' onClick={handleNavigate}>Try me!</button>
    </div>
  );
}
