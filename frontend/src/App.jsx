import { useState } from 'react';
import GooeyNav from './components/GooeyNav/GooeyNav';
import Ballpit from './components/Ballpit/Ballpit';
import SplashCursor from './components/SplashCursor/SplashCursor';
import AnimatedContent from './components/AnimatedContent/AnimatedContent';
import AuthForm from './components/Created/AuthForm';
import Footer from './components/Created/Footer';

function App() {
  const items = [
    { label: "BubbleCode", href: "#" },
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const [isLogin, setIsLogin] = useState(true); // true = login, false = signin

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {/* Custom Cursor */}
      {/* <SplashCursor /> */}

      {/* Navigation Bar */}
      <nav className="w-full px-4 sm:px-6 md:px-8 py-4 fixed top-0 z-20 bg-transparent">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={10}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </nav>

      <div className="relative w-full min-h-screen pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Ballpit
            count={150}
            gravity={0.05}
            friction={0.99}
            wallBounce={1}
            followCursor={false}
            colors={[
              0xff3c38, // Red
              0xff8c42, // Orange
              0xf5e663, // Yellow
              0x53dd6c, // Green
              0x38a1db, // Blue
              0xa24fff, // Purple
              0xffffff, // White
            ]}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <AnimatedContent
            distance={0}
            direction="vertical"
            reverse={false}
            duration={2.5}
            ease="bounce.out"
            initialOpacity={0}
            animateOpacity
            scale={3}
            threshold={0.3}
            delay={0.6}
          >
            <AuthForm />
          </AnimatedContent>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;