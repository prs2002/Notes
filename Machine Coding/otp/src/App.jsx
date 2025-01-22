import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OtpLogin from './components/OtpLogin'

function App() {
  const [count, setCount] = useState(0)

  const onOtpSubmit = (combinedOtp) =>{
    console.log("login successful :"+combinedOtp);
  }
  return (
    <div className='App'>
      <h1>Hello, Login with otp</h1>
      <OtpLogin length={4} onOtpSubmit={onOtpSubmit} />
    </div>
  )
}

export default App
