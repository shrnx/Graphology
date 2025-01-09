  import React, { useEffect } from "react";
  import { Input } from "@nextui-org/input";
  import { useState } from 'react';
  import { Button } from "@nextui-org/button";
  import { EyeFilledIcon } from '../Side Components/EyeFilledIcon';
  import { EyeSlashFilledIcon } from '../Side Components/EyeSlashedFilledIcon';
  import { NaivgateToChatScreen } from '../Navigation/Navigation'
  import GoogleLoginButtonX from "../Side Components/GoogleLoginButtonX";
  import { BASEURL } from "../config";

  function Onboarding() {

    const NavigateToChatScreenX = NaivgateToChatScreen();

    const [inLoginPage, SetInLoginPage] = useState(false);
    const toggleLoginPage = () => {
      SetInLoginPage(!inLoginPage);
      setIsError("");
    }

    // const[divIsVisible, setDivIsVisible] = useState(false);
    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     setDivIsVisible(true);
    //   }, [800])

    //   return () => clearTimeout(timeout);

    // }, [])

    const [isError, setIsError] = useState("")
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
        setIsError("");
        window.location.href = "/onboarding";
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    }

    async function loginUser(username, password) {
      try {
        const response = await fetch(`${BASEURL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }

        setIsError("");
        window.location.href = "/onboarding";
      } catch (error) {
        setIsError(error.message);
      }
    }

    const onclickHandleSignIn = async () => {
      if (!user || !password) {
        setIsError("Both username and password are required");
        return;
      }
      setIsError("");
      NavigateToChatScreenX();
      await loginUser(user, password);
    }

    const onclickHandleSignUp = async () => {
      if (!user || !password) {
        setIsError("Both username and password are required");
        return;
      }
      setIsError("");
      NavigateToChatScreenX();
      await registerUser(user, password);
    }

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
      <div className="h-screen bg-[#F2F7F5]">
        <div className="flex justify-between h-10 p-12">
          <div className="w-10/12 text-2xl font-anta hover:cursor-pointer font-xl text-[#00473E]">Graphyyy</div>   {/* Left Side */}
        </div>

        <div className="h-5/6 flex justify-center items-center">
          <div className='flex items-center justify-center h-5/6 w-full sm:w-4/6'>
            <div className={`bg-[#FFFFFF] text-center w-full sm:w-3/6 h-full p-12 rounded-2xl transform-style: preserve-3d perspective transform-gpu transition-transform duration-1000 ${inLoginPage ? "rotate-y-180" : ""}`}>
              <div className={`${inLoginPage ? "rotate-y-180" : ""}`}>
                {
                  inLoginPage ?
                    <section className={`${inLoginPage ? "" : "duration-200 hidden"}`}> {/* SignUp Section */}
                      <h1 className='font-poppinsBlack font-bold text-2xl mb-4' >Create an account</h1>
                      <Input
                        className="max-w-xs m-auto mt-4 mb-4"
                        label="Username"
                        variant="bordered"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                      />

                      <Input
                        className="max-w-xs m-auto mt-4 mb-4"
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

                      <Button color="warning" className='mt-6' onPress={onclickHandleSignUp}>Register</Button>
                      {isError && <div className="text-red-500 text-center mt-4">{isError}</div>}

                      <div className="mt-4 flex justify-center">
                        <p>Have an account?</p>
                        <p className="text-[#10A37F] ml-1 hover:cursor-pointer" onClick={toggleLoginPage}>Login</p>
                      </div>

                      <div className="mt-5 flex items-center justify-center space-x-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>

                      <div className='w-full justify-center flex flex-col items-center'>
                        <GoogleLoginButtonX />
                      </div>
                    </section>
                    :
                    <section className={`${inLoginPage ? "hidden" : ""}`}>                  {/* Login Section */}
                      <h1 className='font-poppinsBlack font-bold text-2xl mb-4' >Welcome Back</h1>
                      <Input
                        className="max-w-xs m-auto mt-4 mb-4"
                        label="Username"
                        variant="bordered"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                      />

                      <Input
                        className="max-w-xs m-auto mt-4 mb-4"
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

                      <Button color="warning" className='mt-6' onPress={onclickHandleSignIn}>Login</Button>
                      {isError && <div className="text-red-500 text-center mt-4">{isError}</div>}

                      <div className="mt-4 flex justify-center">
                        <p>Don't have an account?</p>
                        <p className="text-[#10A37F] ml-1 hover:cursor-pointer" onClick={toggleLoginPage}>Sign Up</p>
                      </div>

                      <div className="mt-5 flex items-center justify-center space-x-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>

                      <div className='w-full justify-center flex flex-col items-center'>
                        <GoogleLoginButtonX />
                      </div>
                    </section>
                }
              </div>
            </div>

            </div>
          </div>
        </div>
    )
  }

  export default Onboarding
