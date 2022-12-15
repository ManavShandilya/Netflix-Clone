import React from 'react'
import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'


const Movie = ({items}) => {
 const [like, setLike] = useState(false);
 const [save, setSave] = useState(false);
 const { user }  = UserAuth();

 const movieId = doc(db, 'users', `${user?.email}`);

 const saveShow = async () => {
  if(user?.email){
    setLike(!like);
    setSave(true);
    await updateDoc(movieId, {
      savedshows: arrayUnion({
        id: items.id,
        title: items.title,
        img: items.backdrop_path
      })
    })
  }
  else{
    alert('Please Log in to save the Movies');
  }
 }
  return (
   <div className='w-[160px] sm:w-[200px] md:w-[240px] lg-[280px] inline-block cursor-pointer relative p-2'>
   <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${items?.backdrop_path}`} alt={items?.title} />
   <div className='absolute left-0 top-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
     <p className='white-space-normal text-xs md:text-sm flex justify-center font-bold items-center h-full '>{items?.title}</p>
     <p onClick={saveShow}>{like ? <FaHeart className='absolute top-4 left-4 text-gray-300' /> : <FaRegHeart className='absolute top-4 left-4 text-gray-300' />}</p>
   </div>
  </div>
  )
}

export default Movie
