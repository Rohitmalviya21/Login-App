import React, { useState } from 'react'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Reset = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState(localStorage.getItem('email') || '')

  const navigate = useNavigate()

  const resetPass = async (e) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword) {
      toast.error('Both fields are required')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return                                                                                  
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }
    try {
      const res = await fetch('http://localhost:2000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
          confirm_password: confirmPassword,
        }),
      })

      const data = await res.json()

      if (res.status === 200) {
        toast.success('Password reset successfully')
        navigate('/')
      }
      else {
        toast.error(data.msg || 'Error resetting password')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again')
    }
  }
  return (
    <>
      <div className="first-box">
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="card mt-5">
                <div className="card-body py-5">
                  <h1>Reset</h1>
                  <p>Enter new password</p>
                  <form onSubmit={resetPass}>
                    <input
                      type="password"
                      className="form-control mt-5"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />{' '}
                    <br />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />{' '}
                    <br />
                    <br />
                    <button type="submit" className="btn mb-3">
                      Reset
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reset
