import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const Home = () => {
  const [name, setName] = useState();
  localStorage.setItem('username', name);

  const handleName = (e) => {
    setName(e.target.value);
  };
const navigate = useNavigate()
const handleSubmit =(some)=>{
  if(some){
    navigate("/createAct")
  }else{
    toast.warning("Please Enter your name First to Continue")
  }
}


  
  console.log(name)
  return (
    <div className="w-screen h-screen flex justify-center items-center text-center">
      <div className="relative">
        <p className="text-red-500 text-3xl font-extrabold mb-2 ">
          Get Inspired To Things
        </p>
        <div></div>{' '}
        <h1 className="text-red-50 text-3xl font-bold mb-2 mt-2 flex text-center">
          Hello ,{' '}
          <span>
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 100,
                strings: ['How Can I Call You'],
              }}
            />
          </span>
        </h1>
        <input
          type="text"
          placeholder="Enter your prefered name"
          className="w-fit px-24 mt-3 py-2 text-black flex justify-start rounded-md outline-none"
          onChange={(e) => handleName(e)}
        />
        <button
          className="bg-blue-500 text-white   flex ml-auto mt-1 px-4 rounded-sm py-1"
          onClick={()=>handleSubmit(name)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
