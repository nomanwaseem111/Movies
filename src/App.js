import React, { useState } from 'react'
import Cards from './components/Cards'
import Header from './components/Header'
import Addmovie from './components/Addmovie'
import { Route, Routes } from 'react-router-dom'
import Detail from './components/Detail'
import { createContext } from 'react' 
import Login from './components/Login'
import Signup from './components/Signup'


const AppState = createContext()


const App = () => {
 
  const [login,setLogin] = useState(false)
  const [userName,setUserName] = useState("")

  return (
    <div>
        <AppState.Provider value={{login,userName,setLogin,setUserName}}>
        <Header/>
        <Routes>
        <Route path='/' element={<Cards/>}></Route>
        <Route path='/addmovie' element={<Addmovie/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>


        </Routes>
        </AppState.Provider>
        
    </div>
  )
}

export default App
export {AppState}