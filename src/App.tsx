import { HashRouter, Routes, Route } from 'react-router';
import './App.css';
import Home from './pages/home/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Snake from './pages/Snake/Snake';
import Memory from './pages/Memory/Memory';

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snake" element={<Snake />} />
            <Route path="/memory" element={<Memory />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
