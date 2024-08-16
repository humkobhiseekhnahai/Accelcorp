
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Trends } from './pages/trends'
import { Home } from './pages/home'
import { KrishiAI } from './pages/krishiAI'

function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/trends' element={<Trends/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/krishiAI' element={<KrishiAI/>}/>

      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
