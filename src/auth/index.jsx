import LoginForm from "./login/components/LoginForm" // Adjust the path as needed
// import { Route,Routes } from "react-router-dom"
import login from '../../public/login.svg'
import SignupForm from './signup/components/SignupForm'
import { useState } from "react"
export default function Auth() {
  const [isSignUp,setIsSignup] = useState(false);
  const flip =()=>{
      setIsSignup(!isSignUp);
  }
  return (
    <main className="h-screen overflow-hidden">
      <div className="container relative h-full flex lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-zinc-700">
            <img 
              src={login} 
              alt="Login background" 
              className="w-full h-full object-cover" 
            />
          </div>
          
        </div>
        <div className="flex items-center justify-center h-full lg:p-8">
          {isSignUp?<LoginForm flip={flip} />:<SignupForm flip={flip} />}
        </div>
      </div>
    </main>
  )
}