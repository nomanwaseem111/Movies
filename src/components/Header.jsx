import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='border-b-2 border-gray-500 flex justify-between items-center'>
       <Link to={'/'}>
      <h1 className='text-4xl text-red-600 font-bold p-5'>Netflix</h1>
      </Link>
      <Link to={'/addmovie'}>
      <button className='pr-16 font-bold flex items-center'><AddIcon color='secondary'/> Add</button>
      </Link>
    </div>
  )
}

export default Header
