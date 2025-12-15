import React, { useState } from 'react'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'
import { useLocation, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const Recovery = () => {
  const location = useLocation()  
  const { email } = location.state || {}                   // Destructure the email from state
  const [otp, setOtp] = useState('')

  const navigate = useNavigate()

  const verifyOTP = async (e) => {
    e.preventDefault()
    
    try {
      const res = await fetch('http://localhost:2000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),  // Send the email and OTP
      })

      const data = await res.json()
      console.log(data)

      if (res.ok) {
        toast.success('OTP verified successfully. Proceed to reset password')
        setTimeout(() => {
          navigate('/reset')
      }, 3000)
      }
      else {
        toast.error('Invalid OTP')
      }
    }
    catch (error) {
      toast.error('Error verifying OTP')
    }
  }

  return (
    <>
      <div className='first-box'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 offset-md-4'>
              <div className='card mt-5'>
                <div className='card-body py-5'>
                  <h1>Recovery</h1>
                  <p>Enter OTP to recover password</p>
                  <p className='text-muted pt-3'><small>Enter 6 digit OTP sent to your email address</small></p>
                  <form onSubmit={verifyOTP}>
                    <input
                      type='text'
                      className="form-control"
                      placeholder='Please enter OTP'
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <br /><br />
                    <button type='submit' className='btn mb-3'>Recover</button>
                  </form>
                  <span>Can't get OTP? <button className='btn1'>Resend</button></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recovery


