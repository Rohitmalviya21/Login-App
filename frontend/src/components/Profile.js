import React, { useEffect, useState } from 'react'
import avatar from './../assets/avatar.jpg'
import { Link, useNavigate } from 'react-router-dom'
import './../../node_modules/bootstrap/dist/css/bootstrap.css'
import { toast } from 'react-toastify'

const Profile = () => {

  const [singleData, setSingleData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    address: '',
    image: null
  })

  const [imagePreview, setImagePreview] = useState(avatar)

  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error("No token found. Please log in.")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSingleData({
      ...singleData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview(avatar)
    }
  }

  const getData = async () => {
    try {

      const data = await fetch('http://localhost:2000/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'

        }
      })
      const res = await data.json()
      console.log(res)
      setSingleData({
        firstName: res.firstName || '',
        lastName: res.lastName || '',
        contact: res.contact || '',
        email: res.email || '',
        address: res.address || '',
        image: res.image || avatar
      })
      setImagePreview(res.image ? `http://localhost:2000/assets/${res.image}` : avatar)
    }
    catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    getData()
  }, [])

  const editData = async (e) => {
    e.preventDefault()

    const { firstName, lastName, contact, address, image } = singleData

    const newData = new FormData()
    newData.append('firstName', firstName)
    newData.append('lastName', lastName)
    newData.append('contact', contact)
    newData.append('address', address)

    if (image !== avatar) {
      newData.append('image', image)
    }

    try {

      const data = await fetch(`http://localhost:2000/api/edit`, {
        method: "PUT",
        body: newData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const res = await data.json()
      console.log(res)

      if (res) {
        toast.success('Data updated')
       
      }
      else {
        toast.error('Error in updating')
      }
    }
    catch (err) {
      toast.error('Unable to update')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }


  return (
    <>
      <div className='second-box'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              <div className='card profile-card mt-5'>
                <div className='card-body py-3'>
                  <h1>Profile</h1>
                  <p>You can update the details</p>
                  <form onSubmit={editData}>
                    <label htmlFor='image'>
                      <img src={imagePreview} alt='' height="150px" width="150px" className='rounded-circle'></img>
                    </label>
                    <input type='file' id='image' name='image' onChange={handleFileChange}></input> <br /><br />
                    <div className='d-flex justify-content-between'>
                      <input type='text' name='firstName' value={singleData.firstName} className="form-control me-3" onChange={handleInputChange} placeholder='FirstName'></input>
                      <input type='text' name='lastName' value={singleData.lastName} className="form-control" onChange={handleInputChange} placeholder='LastName'></input>
                    </div>
                    <div className='d-flex mt-3'>
                      <input type='text' name='contact' value={singleData.contact} className="form-control me-3" onChange={handleInputChange} placeholder='Contact'></input>
                      <input type='email' name='email' value={singleData.email} className="form-control" onChange={handleInputChange} placeholder='Email' disabled></input>
                    </div>
                    <input type='text' name='address' value={singleData.address} className="form-control mt-3" onChange={handleInputChange} placeholder='Address'></input> <br /><br />
                    <button type='submit' className='btn'>Update</button>
                  </form>
                  <p className='mt-3'>Come back later? <span style={{'cursor':'pointer', 'color':'red'}} onClick={logout}>Logout</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile
