import React from 'react'
import avatar from './../assets/avatar.jpg'
import { Link } from 'react-router-dom'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'

const Password = () => {
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
                  <form>
                    <input type='text' className="form-control" placeholder='Password'></input> <br /><br />
                    <button type='submit' className='btn'>Sign In</button>
                  </form>
                  <p className='mt-3'>Forgot Password? <Link to='/recovery'>Recover Now</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Password
