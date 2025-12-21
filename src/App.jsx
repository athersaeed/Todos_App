import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [Todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    try {
      const todoString = localStorage.getItem("todos");
      if (todoString) {
        const storedTodos = JSON.parse(todoString);
        setTodos(storedTodos);
      }
    } catch (error) {
      console.error("Failed to parse todos from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);



  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), Todo, isCompleted: false }])
    setTodo("")
  }

  const handleEdit = (e, id) => {
    let todo = todos.filter(item => item.id === id)
    setTodo(todo[0].Todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
  }

  const handleDelete = (e, id) => {
    if (confirm("Are you sure you want to delete?")) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      });
      setTodos(newTodos);
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleChkbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
  }


  return (
    <>
      <Navbar />
      <div className='Todo mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 md:w-1/2'>
      <h1 className='font-bold text-xl text-center my-3'>Manage Your Tasks in one place with Taskers</h1>
        <div className="addTodo ">
          <h1 className='text-lg font-bold'>Add Todo</h1>
          <input onChange={handleChange} value={Todo} className='w-full rounded-md p-1 border bg-violet-200 border-purple-500' type="text" placeholder="Enter your todo" />
          <button onClick={handleAdd} disabled={Todo.length < 3} className='w-full bg-violet-800 hover:bg-violet-950 hover:font-bold transition-all p-2 py-1 text-sm font-semibold text-white rounded-md my-3'>Save</button>
        </div>
        <h2 className='text-lg text-black font-bold my-5'>Your Todos</h2>


        <div className="todos ">
          {todos.length === 0 && "No Todos To Display"}
          {todos.map(item => {
            return <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleChkbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? 'line-through' : ''}>{item.Todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 hover:font-bold transition-all p-1 text-sm font-semibold text-white rounded-md mx-2'><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 hover:font-bold transition-all p-1 text-sm font-semibold text-white rounded-md mx-2'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
