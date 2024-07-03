import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react'



const Navbar=({setRefresh})=>{
    const navigation=useNavigate();

    const [user,setUser]=useState(null);
    useEffect(()=>{
        const u=localStorage.getItem('user');
        setUser(u);
    },[])

    const handleLogout=()=>{
        localStorage.clear();
        navigation("/login")
        setUser(null);
    }
   
    return <nav className="mb-10 flex  flex-wrap items-center  justify-between  bg-slate-100">

        <div className="flex flex-shrink-0 items-center text-2xl justify-between lg:justify-start">
            <p className='text-neutral-700 ml-2'>
            What_todo
            </p>
        </div>

        
        <div className="text-neutral-700  m-8 flex items-center justify-center gap-4 text-xl">
           {user && <Link to='/'>Home</Link>}
           {user && <Link to='/login' onClick={handleLogout}>Logout</Link>}
           {!user && <Link to='/login'>Login</Link>}
           {!user && <Link to='/register'>Register</Link>}
        </div>
    </nav>
}

export default Navbar;