import './Footer.css';
import { useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate();

  const handleRandomRoute = () => {
    const routes = ['/', '/Snake'];
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    navigate(randomRoute);
  };
  return (
    <div className="footer">
      <div className="left">© 2025 Smør - Giar Rehani</div>
      <button className='buttonFooter' onClick={handleRandomRoute}>Click me!</button>
    </div>
  );
}
