import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import FuzzyText from '../FuzzyText/FuzzyText';

const Home = () => {
const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover={true}
                >
                    Login First
                </FuzzyText>
            </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        Welcome to <span className="text-pink-500">BubbleCode</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl">
        Practice coding problems, join groups, climb the leaderboard, and become a master problem solver. 
        Experience the most intuitive and gamified online judge platform ever!
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <Link to="/problems" className="px-6 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition text-white font-semibold shadow-md">
          Start Practicing
        </Link>
        <Link to="/leaderboard" className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-semibold shadow-md">
          View Leaderboard
        </Link>
        <Link to="/createGroup" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold shadow-md">
          Create Group
        </Link>
      </div>
    </div>
  );
};

export default Home;