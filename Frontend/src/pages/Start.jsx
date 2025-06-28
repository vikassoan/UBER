import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='h-screen w-full bg-center bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] flex justify-between flex-col'>
            <img className='mt-8 ml-8 w-20' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white py-4 px-4 pb-8'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/user-login' className='flex items-center justify-center w-full mt-4 py-4 bg-black rounded text-white'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start