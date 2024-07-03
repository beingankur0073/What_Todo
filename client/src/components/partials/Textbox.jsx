import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { createTodo } from "../../services/api.js";
function Textbox({setRefresh}){
   const [todos,setTodos]=useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("todo",todos)
        if(todos===''){
            toast('Todo is required')
        }

        const result=await createTodo({desc:todos});
        if(result.status===200 && result.data.status===200){
            setRefresh(new Date())
            toast('Todo Added');
        }
        else{
            toast(result.data.message);
        }
    }


    return  <form className="flex justify-center mx-10 items-center">
        <ToastContainer></ToastContainer>
    <div className=" mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={4}
          onChange={(e)=>setTodos(e.target.value)}
          className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          placeholder="Write a comment..."
          required=""
          defaultValue={""}
        />
      </div>
      <div className="flex items-center justify-center px-3 py-2 border-t dark:border-gray-600">
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Add Todo
        </button>
      </div>

    </div>
  </form>
}

export default Textbox;