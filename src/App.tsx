
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Trends } from './pages/trends'
import { Home } from './pages/home'

function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/trends' element={<Trends/>}/>
        <Route path='/home' element={<Home/>}/>

      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
