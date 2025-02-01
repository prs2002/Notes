import { useState } from 'react'
import './App.css'
import OtpLogin from './components/OtpLogin'

function App() {
  const [showOtp,setShowOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setShowOtp(true);
  };

  const onOtpSubmit = (combinedOtp) => {
    console.log("login successful :" + combinedOtp);
  };
  return (
    <div className='App'>
      {
        showOtp?<>
                <h1>Hello, Login with otp</h1>
                <OtpLogin length={4} onOtpSubmit={onOtpSubmit} />
        </> : <>
          <h1>Enter Phone number</h1>
          <form onSubmit={handleSubmit}>
            <input type='number' name='phone'placeholder='Enter Phone number' ></input>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email Address'
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type='submit'>Login</button>
          </form>
        </>

      }
      
    </div>
  )
}

export default App
