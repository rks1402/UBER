import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [captainData, setCaptainData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault()
      setCaptainData({
        fullName: {
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      })
      
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')  
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="uber" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's our Captain's name</h3>
          <div className='flex gap-4 mb-6'>
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              type="text"
              name="text"
              required
              placeholder="First name"
            />
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              type="text"
              name="text"
              required
              placeholder="Last name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            name="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            name="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Create account</button>
        </form>
        <p className="text-center">Already have an account? <Link className="text-blue-600" to='/captain-login'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply.</span></p>
      </div>
    </div>
  )
}

export default CaptainSignup