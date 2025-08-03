import React from 'react'

const CaptainDetail = () => {
  return (
    <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-start gap-4">
            <img className="h-20 w-20 rounded-full object-cover" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/742c8a68394479.5b5b215a1d767.jpg" alt="" />
            <h4 className="text-lg font-medium">Harsh Patel</h4>
          </div>
          <div>
            <h4 className="text-lg font-semibold">₹295.20</h4>
            <p className="text-sm font-normal text-gray-600">Earned</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 bg-gray-100 py-2 rounded">
          <div className="text-center">
            <i className="text-4xl font-normal ri-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-4xl font-normal ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-4xl font-normal ri-check-double-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetail