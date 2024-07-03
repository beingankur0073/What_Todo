import Navbar from "./Navbar.jsx";
import Todo from '../components/partials/Todo.jsx'
import Textbox from "./partials/Textbox.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/api.js";
import { getTodo } from "../services/api.js";

const Home=()=>{
    const navigate=useNavigate();
    const [list,setList]=useState([]);
    const [refresh,setRefresh]=useState();
    useEffect(()=>{
        if(!getToken()){
            navigate("/login")
        }
        fetchTodo();
    },[refresh])

    async function fetchTodo(){
        const result=await getTodo();
        if(result.status===200 && result.data.status===200){
            setList(result.data.data.todos);
        }
        // console.log('todolist',result);
        
    }

    return <div>
        <Navbar setRefresh={setRefresh}></Navbar>
          <div className="container">
            <div className="flex flex-wrap justify-center mx-2 my-1">
               
                {
                    list.map((todo)=><Todo todo={todo} setRefresh={setRefresh} key={todo._id}></Todo>)
                }
            </div>
            <Textbox setRefresh={setRefresh}></Textbox>
          </div>
    </div>
}

export default Home;