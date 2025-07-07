import { useState } from 'react'
import GooeyNav from './components/GooeyNav/GooeyNav'
import Ballpit from './components/Ballpit/Ballpit';
import SplashCursor from './components/SplashCursor/SplashCursor';
import AnimatedContent from './components/AnimatedContent/AnimatedContent';

function App() {
  const items = [
    { label: "BubbleCode", href: "#" },
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <>
      <SplashCursor />
      <br />
      <GooeyNav
        items={items}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />
      <div className="relative w-full h-[800px]">
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

        {/* Foreground Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
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
            <div className='border-white border-2 rounded'>
              <h3 className='font-bold'>Login form</h3>
              
            </div>
          </AnimatedContent>
        </div>
      </div>
    </>
  )
}

export default App
