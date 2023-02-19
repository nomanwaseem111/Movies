import React, { useEffect, useState } from "react";
import ReactStars from 'react-stars'
import {  ThreeDots } from "react-loader-spinner";
import {getDocs} from 'firebase/firestore'
import {movieRef} from '../components/firebase/firebase'
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    
    async function getData(){
        setLoading(true)
        const _data = await getDocs(movieRef)
        _data.forEach((doc) => {
            setData((prv) => [...prv, {...(doc.data()), id:doc.id}])
        })
        setLoading(false)

    }
    getData()

  },[])

  return (
    <div className="flex flex-wrap justify-between p-5 mt-2">
     
     {
        loading ? <div className="w-full flex justify-center items-center mt-60"><ThreeDots height={40} color="white"/></div> : data.map((elem, index) => {
        return (
          <Link to={`/detail/${elem.id}`}>
          <div className="card shadow-lg p-2 text-lg  mt-6 hover:-translate-y-3 transition-all duration-500 cursor-pointer" key={index}>
            <img className="h-80" src={elem.image} />
            <h1 id="para" className="mt-2">
              <span  className="text-gray-500">Title: </span> {elem.title}
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-500 mr-1">Rating: </span>
              <ReactStars 
                value={elem.rating/elem.rated}
                edit={false}
                half={true}
                size={20}
              />
            </h1>
            <h1>
              <span className="text-gray-500">Year: </span> {elem.year}
            </h1>
          </div>
          </Link>
        );
      })}
     
     
      
    </div>
  );
};

export default Cards;
