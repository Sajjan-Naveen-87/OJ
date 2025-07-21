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
import Profile from './components/Created/Profile/Profile';
import { useParams } from 'react-router-dom';
import EditProfile from './components/Created/Profile/EditProfile';

function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ProfileWrapper = () => {
    const { username } = useParams();
    return <Profile username={username} />;
  };

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
                <Route path="/problems/:id" element={<Compiler />} />
                <Route path="/profile/:username" element={<ProfileWrapper />} />
                <Route path="/profile/:username/update" element={<EditProfile/>} />
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