import { useState } from 'react';
import SplashCursor from './components/SplashCursor/SplashCursor';
import Footer from './components/Created/Footer';
import Navbar from './components/Created/Navbar';
import HomePageToRegisterOrLogin from './components/Created/HomePage/HomePageToRegisterOrLogin';


function App() {
  
  return (
    <>
      <SplashCursor />
      <Navbar/>
      <HomePageToRegisterOrLogin/>
      <Footer/>
    </>
  );
}

export default App;