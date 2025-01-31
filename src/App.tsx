import { HashRouter, Routes, Route } from 'react-router';
import './App.css';
import Home from './pages/home/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Memory from './pages/Memory/Memory';
import AvocadoThreejs from './pages/AvocadoThreejs/AvocadoThreejs';

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/greeting" element={<AvocadoThreejs />} />
            <Route path="/memory" element={<Memory />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
