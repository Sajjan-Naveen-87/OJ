import React from 'react'
import GooeyNav from '../GooeyNav/GooeyNav'

const Navbar = () => {
    const items = [
        { label: "BubbleCode", href: "#" },
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
      ];
  return (
    <>
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
    </>
  )
}

export default Navbar