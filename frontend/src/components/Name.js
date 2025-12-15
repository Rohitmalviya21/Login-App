import React, { useState, useEffect } from 'react'
import avatar from './../assets/avatar.jpg'
import { Link, useNavigate } from 'react-router-dom'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'
import { toast } from 'react-toastify'

const Name = () => {
  const [myname, setMyname] = useState('');
  const [password, setPassword] = useState('')

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setMyname(savedName);
    }
  }, []);

  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()

    if (!myname || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:2000/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: myname,
          password: password
        })
      });

      const res = await response.json();
      console.log(res);

      if (!response.ok) {
        // backend returns 400 for invalid creds or missing fields
        toast.error(res.msg || 'Login failed');
        return;
      }

      // login success
      toast.success(res.msg);
      localStorage.setItem('token', res.token);
      localStorage.setItem('name', res.name);

      navigate('/profile');
    }
    catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
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
                  <h1>Hello Again!</h1>
                  <p>Explore more by connecting with us</p>
                  <img src={avatar} alt='' height="150px" width="150px"></img>
                  <form onSubmit={login}>
                    <input
                      type='text'
                      className="form-control"
                      value={myname}
                      onChange={(e) => setMyname(e.target.value)}
                      placeholder='Username'
                    /><br />

                    <input
                      type='password'
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Password'
                    /><br /><br />

                    <button type='submit' className='btn'>Let's Go</button>
                  </form>

                  <p className='mt-3'>Not a Member? <Link to='/register'>Register Now</Link></p>
                  <p className='mt-3'>Forgot Password? <Link to='/email'>Recover Now</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Name
