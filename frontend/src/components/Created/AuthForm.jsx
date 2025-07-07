import { useState } from 'react';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signin

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="bg-black/40 backdrop-blur-md border-white border-2 rounded-lg p-6 sm:p-8 w-[90%] max-w-md text-white transition-all duration-500 ease-in-out">
      <h3 className="font-bold text-xl sm:text-2xl mb-4 text-center">
        {isLogin ? "Get Started !!" : "Create Account"}
      </h3>

      <form className="flex flex-col space-y-4">
        {/* Common Input: Username */}
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Extra Input for Signin */}
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
          />
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Submit */}
        <input
          type="submit"
          value={isLogin ? "Login" : "Register"}
          className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-blue-400 transition"
        />
        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="text-white underline hover:text-blue-300 transition"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;