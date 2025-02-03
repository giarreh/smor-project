import { useRef } from 'react'
import { useNavigate } from 'react-router';
import 'animate.css';

type RouterButtonProps = {

  className?: string;

};

const RouterButton: React.FC<RouterButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  const routes = ['/', '/memory', '/greeting', '/dvd', '/chat'];
  const indexRef = useRef(0); // Keeps track of the current index

  const handleLoopedRoute = () => {
    indexRef.current = (indexRef.current + 1) % routes.length;
    navigate(routes[indexRef.current]);
  };
  return (
    <button className={className} onClick={handleLoopedRoute}>Click me!</button>
  )
}

export default RouterButton;
