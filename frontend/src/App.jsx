import { useState } from 'react';
import SplashCursor from './components/SplashCursor/SplashCursor';
import Footer from './components/Created/Footer';
import Navbar from './components/Created/Navbar';
import HomePageToRegisterOrLogin from './components/Created/HomePage/HomePageToRegisterOrLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/Created/AuthProvider';
import Person from './components/Created/PersonalPage/Person';
import Problems from './components/Created/ProblemsPage/Problems';
import Compiler from './components/Created/Compiler/Compiler';

function App() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <SplashCursor />
          <div className="min-h-screen flex flex-col">
            <Navbar idx={activeIdx} />
            {/* Add padding to prevent overlap */}
            <main className="flex-grow pt-16 bg-gray-950 text-white">
              <Routes>
                <Route path="/" element={<HomePageToRegisterOrLogin />} />
                <Route path="/dashboard" element={<h1 className="text-center text-3xl mt-8">Dashboard Page</h1>} />
                <Route path="/person" element={<Person />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/problems/:id" element={<Compiler/>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;