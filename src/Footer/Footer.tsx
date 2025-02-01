import './Footer.css';
import { useNavigate } from 'react-router';
import { useRef } from 'react';

export default function Footer() {
  const navigate = useNavigate();
  const routes = ['/memory', '/greeting', '/dvd', '/chat'];
  const indexRef = useRef(0); // Keeps track of the current index

  const handleLoopedRoute = () => {
    indexRef.current = (indexRef.current + 1) % routes.length;
    navigate(routes[indexRef.current]);
  };

  return (
    <div className="footer">
      <div className="left">© 2025 Smør - Giar Rehani</div>
      <button className='buttonFooter' onClick={handleLoopedRoute}>Click me!</button>
    </div>
  );
}
