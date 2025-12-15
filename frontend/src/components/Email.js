import React, { useState } from 'react'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Email = () => {

    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleRecoverNow = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error("Please enter your email")
            return;
        }

        try {
            const data = await fetch('http://localhost:2000/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            const res = await data.json()

            if (data.status === 200) {
                toast.success("OTP sent to your email!")
                localStorage.setItem("email",email)
                setTimeout(() => {
                    navigate('/recovery', { state: { email } });
                }, 3000)
            }
            else {
                
                toast.error(res.msg || "Unable to send OTP")
            }
        } catch (err) {
            console.error(err)
            toast.error("Failed to send OTP. Please try again.")
        }
    }

    return (
        <>
            <div className='first-box'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 offset-md-4'>
                            <div className='card' style={{ marginTop: '150px' }}>
                                <div className='card-body py-5'>
                                    <h1>Recovery</h1>
                                    <h5 className='text-muted'>Enter your email for OTP</h5>
                                    <form>
                                        <input type='email' className="form-control mt-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email for OTP'></input> <br /><br />
                                        <button type='submit' className='btn mb-3' onClick={handleRecoverNow}>Continue</button>
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

export default Email
