import { useState } from 'react';
import SplashCursor from './components/SplashCursor/SplashCursor';
import Footer from './components/Created/Footer';
import Navbar from './components/Created/Navbar';
import HomePageToRegisterOrLogin from './components/Created/HomePage/HomePageToRegisterOrLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <>
      <BrowserRouter>
      <SplashCursor />
      <div className="min-h-screen flex flex-col">
        <Navbar idx={activeIdx}/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePageToRegisterOrLogin/>}/>
            <Route path="/dashboard" element={<h1>Dashboard Page</h1>}/>

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;