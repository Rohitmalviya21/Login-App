import React, { useState } from 'react'
import avatar from './../assets/avatar.jpg'
import { Link, useNavigate } from 'react-router-dom'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'
import { toast } from 'react-toastify'

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(avatar);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, image } = formData;

    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    if (image) {
      data.append('image', image);
    }

    try {
      const data1 = await fetch(`http://localhost:2000/api/register`, {
        method: "POST",
        body: data,
      });

      const res = await data1.json();

      if (data1.status === 201) {
        toast.success("You have registered successfully");
        localStorage.setItem('name', name);
        navigate('/');
      } else {
        toast.error(res.msg || "Unable to register");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to register");
    }
  };

  return (
    <>
      <div className='second-box'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 offset-md-4'>
              <div className='card mt-3'>
                <div className='card-body py-3'>
                  <h1>Register</h1>
                  <p>Happy to join you!</p>

                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor='image'>
                      <img
                        src={imagePreview}
                        alt=''
                        height="150px"
                        width="150px"
                        className='rounded-circle'
                      />
                    </label>
                    <input type='file' id='image' name="image" onChange={handleFileChange} /> <br /><br />

                    <input type='text' name="name" className="form-control" value={formData.name} onChange={handleInputChange} placeholder='Username*' /><br />

                    <input type='email' name="email" className="form-control" value={formData.email} onChange={handleInputChange} placeholder='Email*' /><br />

                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} placeholder='Password*' /><br /><br />

                    <button type='submit' className='btn'>Register</button>
                  </form>

                  <p className='mt-3'>Already Register? <Link to='/'>Login Now</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
