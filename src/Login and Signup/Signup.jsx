import React from "react";
import { Input } from "@nextui-org/input";
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { EyeFilledIcon } from '../Side Components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../Side Components/EyeSlashedFilledIcon';
import { NavigateToMainscreen } from '../Navigation/Navigation';
import { NavigateToLogin } from '../Navigation/Navigation';
import GoogleLoginButtonX from "../Side Components/GoogleLoginButtonX";
import { BASEURL } from "../config";

function Signup() {

  const NavigateToLoginX = NavigateToLogin();
  const NavigateToMainScreenX = NavigateToMainscreen();


  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");


  async function registerUser(username, password) {
    try {
      const response = await fetch(`${BASEURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Automatically login after successful registration
      // return loginUser(username, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  const onclickHandleSignIn = async () => {
    await registerUser(user, password);
  }


  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className=" h-screen bg-[#F2F7F5]">
      <div className="flex justify-between h-10 p-12">
        <div className="w-10/12 text-2xl font-anta hover:cursor-pointer font-xl text-[#00473E]">Graphyyy</div>   {/* Left Side */}
        <div className="flex justify-end w-2/12">          {/* Right Side */}
          <button className="text-2xl font-anta hover:font-extrabold font-xl text-[#00473E]" onClick={NavigateToLoginX}>Login</button>
        </div>
      </div>
      {/* 1st div */}

      <div className="h-5/6 flex justify-center items-center">
        <div className='flex items-center justify-center h-5/6 w-4/6'>
          <div className='bg-[#FFFFFF] text-center w-3/6 h-full p-12 rounded-2xl'>
            <h1 className='font-poppinsBlack font-bold text-2xl mb-4' >Create an account</h1>
            {/* <Input label="Email" type="email" /> */}
            <Input
              className="max-w-xs m-auto mt-4"
              label="Username"
              variant="bordered"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <Input
              className="max-w-xs m-auto mt-4"
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button color="warning" className='mt-6' onPress={onclickHandleSignIn}>Register</Button>

            <div className="mt-2 flex justify-center">
              <p>Don't have an account?</p>
              <p className="text-[#10A37F] ml-1 hover:cursor-pointer">Sign Up</p>
            </div>

            <div className="mt-5 flex items-center justify-center space-x-4">
              <div className="flex-grow border-t border-dashed border-gray-300"></div>
              <span className="text-gray-500">OR</span>
              <div className="flex-grow border-t border-dashed border-gray-300"></div>
            </div>

            <div className='w-full justify-center flex flex-col items-center'>

              <GoogleLoginButtonX />

            </div>

          </div>
          <div className='text-center w-3/6 h-full rounded-2xl'>
            <Image
              isZoomed
              alt="NextUI Fruit Image with Zoom"
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={528.53}
              height={543.33}
            />
          </div>
        </div>
      </div>
      {/* 2nd div */}
    </div>
  )
}

export default Signup

