import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { db } from './firebase/firebase'
import { doc ,getDoc} from 'firebase/firestore'
import { ThreeCircles } from 'react-loader-spinner'
import Review from './Review'

const Detail = () => {
   
     const {id} = useParams()
     const [data,setData] = useState({
         title:"",
         year:"",
         image:"",
         description:"",
         rating:0,
         rated:0
     })

     const [loading,setLoading] = useState(false)
     useEffect(() => {
         async function getData(){
            setLoading(true)

          const _doc = doc(db,"movies",id)
          const _data = await getDoc(_doc)
             setData(_data.data())
             setLoading(false)

         }
         getData()

     },[] )
  
    return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
      
      {
        loading ? <div className='w-full flex justify-center items-center mt-60'><ThreeCircles color='#fff' /></div> :
      
   
   <>
     <img id='detailImg' className='h-96 block  sticky top-24' src={data.image} alt='image'/>
     <div className='md:ml-4 ml-0 w-full md:w-1/2 '>
      <span className='text-3xl text-gray-400 font-bold'>{data.title}</span><span className='ml-2 text-gray-400'>({data.year})</span>
      <ReactStars 
                value={data.rating/data.rated}
                edit={false}
                half={true}
                size={20}
              />
      <p className='mt-3 mb-8' >
       {data.description} 
        
       </p>
      <Review id={id} prevRating={data.rating} userRated={data.rated}/>
     </div>
</>
    }
    </div>
  )
}

export default Detail