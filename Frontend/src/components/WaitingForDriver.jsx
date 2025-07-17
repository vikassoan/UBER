import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.waitingForDriver(false);
        }}
        className="p-3 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between py-4'>
        <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>Sarthak</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 1234</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center border-t-1">
          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-map-pin-range-fill"></i>
            <div className="p-4">
                <h4 className="text-xl font-semibold">
                    562/A1
                </h4>
                <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
            </div>
          </div>

          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-square-fill"></i>
            <div className="p-4">
                <h4 className="text-xl font-semibold">
                    562/A1
                </h4>
                <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
            </div>
          </div>

          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-bank-card-2-fill"></i>
            <div className="p-4">
                <h4 className="text-xl font-semibold">
                    ₹193.20
                </h4>
                <p className="text-sm text-gray-500">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver