import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewRef,db, movieRef } from './firebase/firebase'
import { addDoc,doc,updateDoc,query,where,getDocs } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'

const Review = ({id,prevRating,userRated}) => {
 
    const [rating,setRating] = useState(0)
    const [loading,setLoading] = useState(false)
    const [form,setForm] = useState("")
    const [data,setData] = useState([])
    const [reviewLoading,setReviewLoading] = useState(false)

    console.log(data);

    const sendReview = async () => {
         setLoading(true)
         try {
            await addDoc(reviewRef, {
                movieid:id,
                name:"noman",
                comment:form,
                rating:rating,
                timestamp: new Date().getTime()

            })
            const ref = doc(db,"movies",id)
            await updateDoc(ref , {
              rating : prevRating + rating,
              rated : userRated + 1

            })
            swal({
                title:"Review Sent",
                icon:"success",
                buttons:false,
                timer:3000
            }) 
            setRating(0)
            setForm("")
        } catch (error) {
            swal({
                title:error.message,
                icon:error,
                buttons:false,
                timer:3000
            })
        }
        setLoading(false)
    }
 

     useEffect(() => {
       
        async function getData(){
            setReviewLoading(true)
            let quer = query(reviewRef,where('movieid' ,'==', id))
            const querySnapShot = await getDocs(quer)

            querySnapShot.forEach((doc) => {
                 setData((prev) => [...prev, doc.data()])
            })
            setReviewLoading(false)
        }
         getData()
     },[])

    return (
    <div className='mt-2 py-2 border-t-2 border-gray-700 w-full'>
         <ReactStars 
                half={true}
                size={30}
                onChange={(rate) => setRating(rate)}
                value={rating}
              />
        <input
            placeholder='share your review...'
            className='w-full p-3 outline-none bg-gray text-black'
            onChange={(e) => setForm(e.target.value)}
            value={form}
        />
        <button onClick={sendReview} className='bg-green-600 w-full flex justify-center p-3 mt-2 pointer-cursor '>
            {loading ? <TailSpin height={25}/> : "Share" }
        </button>

        {
            reviewLoading ? <div className='mt-6 flex justify-center'><ThreeDots height={10} color="white" /></div> :
            <div className='mt-4'>
                {
                    data.map((e,index) => {
                      console.log(e)
                      return(
                        <div className='bg-gray-900 p-2 w-full mt-2' key={index}>
                         <span>{e.name}</span>
                         <span className='ml-2'>({new Date(e.timestamp).toLocaleString()})</span>
                         <ReactStars value={e.rating}/>
                         <p>{e.comment}</p>
                        </div>
                      )
                    })
                }
            </div>
        }
    </div>
  )
}

export default Review