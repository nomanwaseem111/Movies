import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import  {addDoc} from 'firebase/firestore'
import { movieRef } from "./firebase/firebase";
import swal from 'sweetalert'
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

const Addmovie = () => {
  
  const navigate = useNavigate()
  const [form,setForm] = useState({
        title:"",
        year:"",
        description:"",
        image:"",
        rating:0,
        rated:0
    
})
 
const [loading,setLoading] = useState(false)
 const useAppstate = useContext(AppState)

  const addMovie = async () => {
    setLoading(true);
    try {
      if(useAppstate.login) {
        await addDoc(movieRef, form);
        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000
        })
        setForm({
          title: "",
          year: "",
          description: "",
          image: ""
        })
      } else {
        navigate('/login')
      }
   } catch (error) {
    swal({
        title:error,
        icon:"error",
        buttons:false,
        timer:3000
    })
   }

  }

    return (
    <div>
      <section class=" body-font relative">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Add New Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={(e) => setForm({...form , title:e.target.value})}
                    class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm ">
                    Year
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.year}
                    onChange={(e) => setForm({...form , year:e.target.value})}
                    class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm ">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e) => setForm({...form , description:e.target.value})}
                    class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm ">
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.image}
                    onChange={(e) => setForm({...form , image:e.target.value})}
                    class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <button onClick={addMovie} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading ? <TailSpin height={30} color="white"/>:'Add'}
                </button>
              </div>
          
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
