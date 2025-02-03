import { Routes, Route, BrowserRouter } from 'react-router';
import './App.css';
import Home from './pages/home/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Memory from './pages/Memory/Memory';
import AvocadoThreejs from './pages/AvocadoThreejs/AvocadoThreejs';
import Dvd from './pages/Dvd/Dvd';
import AIChat from './pages/AI/AIChat';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/greeting" element={<AvocadoThreejs />} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/dvd" element={<Dvd />} />
            <Route path="/chat" element={<AIChat />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
