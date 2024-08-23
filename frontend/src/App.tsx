
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Trends } from './pages/trends'
import { Home } from './pages/home'
import { KrishiAI } from './pages/krishiAI'
import { Report } from './pages/report'
import React from 'react'

function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/trends' element={<Trends/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/krishiAI' element={<KrishiAI/>}/>
        <Route path='/report' element={<Report/>}/>

      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
