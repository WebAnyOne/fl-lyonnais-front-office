import React from 'react'

function Information(props) {
  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-1/2">
        <h4 className="mb-6 text-2xl text-gray-800 font-bold">Informations</h4>
        <p className="mb-5 text-gray-800 text-xl">{props.p}</p>
      </div>
    </div>
  )
}

export default Information
