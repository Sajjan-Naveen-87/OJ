import { useState } from 'react';
import SplashCursor from './components/SplashCursor/SplashCursor';
import Footer from './components/Created/Footer';
import Navbar from './components/Created/Navbar';
import HomePageToRegisterOrLogin from './components/Created/HomePage/HomePageToRegisterOrLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
      <SplashCursor />
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePageToRegisterOrLogin/>}/>

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;