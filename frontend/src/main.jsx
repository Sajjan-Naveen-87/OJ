import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import HomePageToRegisterOrLogin from './components/Created/HomePage/HomePageToRegisterOrLogin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <HomePageToRegisterOrLogin/> */}
  </StrictMode>,
)
