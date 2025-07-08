import axios from 'axios';
import { useState } from 'react';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signin

  // collecting data from form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState({}); //initialising errors as empty object 
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };


  // functions to update data
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username)
    console.log(password)

  }

  const handleSignin = async (e) => {
    e.preventDefault();
    const userdata = {
      username, email, password
    }
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userdata)
      console.log('response data ==> ', response.data)
      console.log('Registeration Successfull')
      setErrors({})
      setSuccess(true)
    } catch (error) {
      setErrors(error.response.data)
      console.error('Registation Error', error.response.data);
    } finally {
      setLoading(false)
    }

  }
  return (
    <div className="bg-black/40 backdrop-blur-md border-white border-2 rounded-lg p-6 sm:p-8 w-[90%] max-w-md text-white transition-all duration-500 ease-in-out">
      <h3 className="font-bold text-xl sm:text-2xl mb-4 text-center">
        {isLogin ? "Get Started !!" : "Create Account"}
      </h3>

      <form onSubmit={isLogin ? handleLogin : handleSignin} className="flex flex-col space-y-2 items-center justify-center">
        {/* {!isLogin && (
          <input
            type="text"
            placeholder="First Name"
            className="px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setFirstname(e.target.value)}
          />
        )}
        {!isLogin && (
          <input
            type="text"
            placeholder="Last Name"
            className="px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e)=>setLastname(e.target.value)}
          />
        )} */}
        {/* Common Input: Username */}
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <small>{errors.username && <pre className='text-yellow-500'>{errors.username}</pre>}</small>
        {/* Extra Input for Signin */}
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <small>{errors.email && <pre className='text-yellow-500'>{errors.email}</pre>}</small>

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 bg-transparent border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <small>{errors.password && <pre className='text-yellow-500'>{errors.password}</pre>}</small>
        {/* Submit */}
        {!loading ?
          <input
            type="submit"
            value={isLogin ? "Login" : "Register"}
            className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-blue-400 transition"
            required
          /> :
          <div class="flex items-center justify-center w-40 h-10 text-black border border-gray-200 rounded-lg bg-white dark:bg-white dark:border-gray-700">
            <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-green-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            </div>
              <pre> Loading...</pre>
          </div>
        }
        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="text-white underline hover:text-blue-300 transition"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
        {success && !isLogin && (
          <span className="text-green-400">
            "Registation Successful &#x1F60D;"
          </span>
        )}
      </form>
    </div>
  );
}

export default AuthForm;