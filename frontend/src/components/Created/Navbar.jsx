import React, { useContext } from 'react'
import GooeyNav from '../GooeyNav/GooeyNav'
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const items = [
    { label: "BubbleCode", href: "/" },
    { label: "Home", href: "/home" },
    { label: "Practice", href: "/practice" },
    { label: "About", href: "/about" },
    { label: "Create Group", href: "/createGroup" },
    { label: "Join Group", href: "/joinGroup" },
  ];

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="w-full px-4 sm:px-6 md:px-8 py-4 fixed bg-transparent">
      <div className="flex items-center justify-between w-full">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={10}
          initialActiveIndex={props.idx}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
        {/* {console.log('Logged In:',isLoggedIn)} */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Logout
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;