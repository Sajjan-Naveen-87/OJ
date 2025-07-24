import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import FuzzyText from '../FuzzyText/FuzzyText';
import Galaxy from '../Galaxy/Galaxy';
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

    <div className="relative w-full h-screen">
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={240}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-10 px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to BubbleCode</h1>
          <p className="text-lg text-gray-200">
            BubbleCode is your go-to online judge platform for practicing coding problems, tracking your progress,
            and challenging your peers. Hone your skills across difficulty levels and climb the leaderboard!
          </p>
        </div>
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
    </div>
  );
};

export default Home;