import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import {useState} from 'react'

function App() {

   const info=localStorage.getItem('user');
    const [user,setUser]=useState(JSON.parse(info))
    const [loading, setLoading] = useState(0);

  return (
        <BrowserRouter>
    <div className='overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900'>
      <div className='fixed top-0 -z-10 h-full w-full'>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-300 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      
      <div className='container  '>

              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/register' element={<Register user={user} setUser={setUser}/>}></Route>
                <Route path='/login' element={<Login  user={user} setUser={setUser} setLoading={setLoading}/>}></Route>
              </Routes>
      </div>
      
     </div>
      </BrowserRouter>
  )
}

export default App
