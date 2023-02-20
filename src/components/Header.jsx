import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import  {AppState} from '../App'
const Header = () => {
 
   const useAppState = useContext(AppState)
 
  return (
    <div className='border-b-2 border-gray-500 flex justify-between items-center'>
       <Link to={'/'}>
      <h1 className='text-4xl text-red-600 font-bold p-5'>Netflix</h1>
      </Link>
      {
        useAppState.login ?    <Link to={'/addmovie'}>
      <button className='pr-16 font-bold flex items-center'><AddIcon color='secondary'/> Add</button>
      </Link> : 
      <Link to={'/login'}>
      <button className='mr-16  p-4 font-bold flex items-center bg-green-500'> Login</button>
      </Link>
      } 
   
    </div>
  )
}

export default Header
