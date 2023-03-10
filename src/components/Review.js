import React, { useEffect, useState,useContext } from 'react'
import ReactStars from 'react-stars'
import { reviewRef,db, movieRef } from './firebase/firebase'
import { addDoc,doc,updateDoc,query,where,getDocs } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'
import { AppState } from '../App'
import { Navigate, useNavigate } from 'react-router-dom'

const Review = ({id,prevRating,userRated}) => {
    const navigate = useNavigate()
    const [rating,setRating] = useState(0)
    const [loading,setLoading] = useState(false)
    const [form,setForm] = useState("")
    const [data,setData] = useState([])
    const [reviewLoading,setReviewLoading] = useState(false)
   const [newAdded,setNewAdded] = useState(0)
   const useAppState = useContext(AppState);

    const sendReview = async () => {
        setLoading(true);
        try {
            if(useAppState.login) {
            await addDoc(reviewRef, {
                movieid: id,
                name: useAppState.userName,
                rating: rating,
                comment: form,
                timestamp: new Date().getTime()
            })

            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1
            })

            setRating(0);
            setForm("");
            setNewAdded(newAdded + 1);
            swal({
                title: "Review Sent",
                icon: "success",
                buttons: false,
                timer: 3000
              })
            } else {
                navigate('/login')
            }
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
              })
        }
        setLoading(false);
    }

     useEffect(() => {
       
        async function getData(){
            setReviewLoading(true)
            setData([])
            let quer = query(reviewRef,where('movieid' ,'==', id))
            const querySnapShot = await getDocs(quer)

            querySnapShot.forEach((doc) => {
                 setData((prev) => [...prev, doc.data()])
            })
            setReviewLoading(false)
        }
         getData()
     },[newAdded])

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