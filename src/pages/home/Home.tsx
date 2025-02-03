import RouterButton from '../../misc/RouterButton';
import './Home.css';
import 'animate.css';

export default function Home() {
  return (
    <div className='home animate__animated animate__fadeIn'>
      <p className='animate__animated animate__fadeInUp animate__delay-1s'>
        Everything here is smooth, warm, and melts in your mouth. Enjoy the creamy vibes! 🍯
      </p>

      <a 
        href="https://example.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className='animate__animated animate__bounceIn animate__delay-2s'
      >
        Spread the love! 💛
      </a>

      <br />
      <br />
      <RouterButton className='animate__animated animate__bounceIn animate__delay-3s' />
    </div>
  );
}
