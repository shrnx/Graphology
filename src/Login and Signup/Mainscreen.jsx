import React from 'react'

function Mainscreen() {
  return (
    <>
      <div className=" h-screen bg-slate-300">
        <div className="flex justify-between h-1/6 p-12">
          <div className="w-10/12 text-2xl font-sans hover:font-extrabold font-bold text-green-600">Graphyyy</div>   {/* Left Side */}
          <div className="flex justify-evenly w-2/12">          {/* Right Side */}
            <button className="text-2xl font-sans hover:font-extrabold font-bold text-green-600" >Login</button>
            <button className="text-2xl font-sans hover:font-extrabold font-bold text-green-600" >Sign Up</button>
          </div>        
        </div>
        {/* 1st div */}

        <div className="h-5/6 bg-slate-700">
          <div></div>
          <div></div>
        </div>
        {/* 2nd div */}
      </div>
    </>
  )
}

export default Mainscreen