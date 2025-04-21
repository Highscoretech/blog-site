import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './page/Home';
import Footer from './component/Footer';

function App() {
  return (
    <>
    <Navbar />
    <div className='app-container'>
      <div className="app-section">
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </Router>
      </div>
    </div>
      <Footer />
    </>
  )
}

export default App
