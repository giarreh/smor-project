import './Footer.css';
import { useNavigate } from 'react-router';
import { useRef } from 'react';

export default function Footer() {
  const navigate = useNavigate();
  const routes = ['/memory', '/greeting'];
  const indexRef = useRef(0); // Keeps track of the current index

  const handleLoopedRoute = () => {
    navigate(routes[indexRef.current]);
    indexRef.current = (indexRef.current + 1) % routes.length; // Move to the next route in a loop
  };

  return (
    <div className="footer">
      <div className="left">© 2025 Smør - Giar Rehani</div>
      <button className='buttonFooter' onClick={handleLoopedRoute}>Click me!</button>
    </div>
  );
}
