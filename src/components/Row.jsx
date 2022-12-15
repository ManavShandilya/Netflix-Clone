import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Movie from './Movie'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Row = ( {title, fetchURL, rowId} ) => {
 const [movies, setMovies] = useState([]);


 useEffect(()=>{
  axios.get(fetchURL).then((response) =>{
   setMovies(response.data.results)
  })
 }, [fetchURL]);

 const slideLeft = () => {
  var slider = document.getElementById('slider' + rowId);
  slider.scrollLeft = slider.scrollLeft - 500;
 };
 const slideRight = () => {
  var slider = document.getElementById('slider' + rowId);
  slider.scrollLeft = slider.scrollLeft + 500;
 };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center group'>
       <MdChevronLeft onClick={slideLeft} size={40} className='left-0 rounded-full bg-white absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
       <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
         {movies.map((items, id)=> (
           <Movie key={id} items={items} />
         ))}
       </div>
       <MdChevronRight onClick={slideRight} size={40} className='right-0 rounded-full bg-white absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
      </div>
    </>
  )
}

export default Row
