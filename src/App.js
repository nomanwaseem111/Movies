import React from 'react'
import Cards from './components/Cards'
import Header from './components/Header'
import Addmovie from './components/Addmovie'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
        <Header/>
        <Routes>
        <Route path='/' element={<Cards/>}></Route>
        <Route path='/addmovie' element={<Addmovie/>}></Route>

        </Routes>
        
    </div>
  )
}

export default App
