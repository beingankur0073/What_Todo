import moment from 'moment'
import { deleteTodo,markTodo } from '../../services/api.js';
import { ToastContainer, toast } from 'react-toastify';

function Todo({todo,setRefresh}){

    const handleDelete=async ()=>{
        const result=await deleteTodo({
            todo_id:todo._id
        })
        if(result.data.status===200){
            setRefresh(Date.now())
            toast('Deleted');
        }
        else{
            toast('Failed to delete');
        }
    }

    const handleMark=async ()=>{
        const result=await markTodo({
            todo_id:todo._id
        })
        if(result.data.status===200){
            setRefresh(Date.now())
            toast(result.data.message);
        }
        else{
            toast('Failed to mark');
        }
    }



    return <div className="rounded-2xl mx-3 my-3 max-w-xl bg-neutral-700 p-4">
        <div className="">
            {todo.isCompleted?'Completed':'Not Completed'}
        </div>
        <div className="mb-2">
            <h4>{todo.desc}</h4>
            <p>{moment(todo.date).fromNow()}</p>
        </div>

        <div className='flex justify-center items-end gap-10'>
            <div>
                <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800" onClick={handleDelete}>Delete Todo</button>
            </div>
            <div>
                <button onClick={handleMark} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">{todo.isCompleted?'Mark incomplete':'Mark Completed'}</button>
            </div>
        </div>
    </div>
}

export default Todo;