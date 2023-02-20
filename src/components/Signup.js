import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import {getAuth,RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
import app from './firebase/firebase'
import swal from 'sweetalert'
import { usersRef } from './firebase/firebase'
import { addDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const auth = getAuth(app)
const Login = () => {
  const navigate = useNavigate();

   const [form,setForm] =  useState({
     name:"",   
    phone:"",
        password:""
     })

     const [loading,setLoading] = useState(false)
     const [otpSent,setOtpSent] = useState(false)
     const [OTP,setOTP] = useState("")

     const generateRecaptha = () => {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      }, auth);
    }

    const requestOtp = () => {
      setLoading(true);
      generateRecaptha();
      let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+92${form.phone}`, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          swal({
            text: "OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtpSent(true);
          setLoading(false);
        }).catch((error) => {
          console.log(error)
        })
  }

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login')
        setLoading(false); 
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        phone: form.phone
      });
    } catch(err) {
      console.log(err);
    }
  }

    return (
    <div className='w-full flex flex-col items-center'>
      
      {
        otpSent ? <>

        <h1 className='font-bold text-xl mt-20'>Signup</h1>

        <div class="p-2 w-1/1">
         <div class="relative">
           <label for="message" class="leading-7 text-sm ">
             OTP
           </label>
           <input
             id="message"
             name="message"
             value={OTP}
             onChange={(e) => setOTP(e.target.value)}
             class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           />
         </div>
       </div>
       <div class="p-2 w-full">
         <button  onClick={verifyOTP} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
           {loading ? <TailSpin height={30} color="white"/>:'Confirm Otp'}
         </button>
       </div>
        
         </> :
        <>
        <h1 className='font-bold text-xl mt-20'>Signup</h1>



<div class="p-2 w-1/1">
         <div class="relative">
           <label for="message" class="leading-7 text-sm ">
             Name :
           </label>
           <input
           
             id="message"
             name="message"
             value={form.name}
             onChange={(e) => setForm({...form , name:e.target.value})}
             class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           />
         </div>
       </div>

<div class="p-2 w-1/1">
         <div class="relative">
           <label for="message" class="leading-7 text-sm ">
             Phone :
           </label>
           <input
           type={"number"}
             id="message"
             name="message"
             value={form.phone}
             onChange={(e) => setForm({...form , phone:e.target.value})}
             class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           />
         </div>
       </div>


       <div class="p-2 w-1/1">
         <div class="relative">
           <label for="message" class="leading-7 text-sm ">
            Password:
           </label>
           <input
             id="message"
             name="message"
             value={form.password}
             onChange={(e) => setForm({...form , password:e.target.value})}
             class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           />
         </div>
       </div>
       <div class="p-2 w-full">
         <button onClick={requestOtp} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
           {loading ? <TailSpin height={30} color="white"/>:'Request OTP'}
         </button>
       </div>
        </>
      }
      
       
     
              <div>
              <p>Already have an account? <Link to={"/login"}><span className='text-blue-500'>Login</span></Link></p>
              </div>
              <div id='recaptcha-container'></div>
    </div>
    
  )
}

export default Login