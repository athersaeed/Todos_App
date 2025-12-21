import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Components/Navbar'

function App() {

  const [Todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  useEffect(() => {
    saveToLS();
  }, [todos])



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
      <div className='Todo container mx-auto my-5 rounded-xl p-5 bg-violet-200'>
        <div className="addTodo">
          <h1 className='text-lg font-bold'>Add Todo</h1>
          <input onChange={handleChange} value={Todo} className='w-1/2 rounded-md p-1 border bg-violet-200 border-purple-500' type="text" placeholder="Enter your todo" />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 hover:font-bold transition-all p-2 py-1 text-sm font-semibold text-white rounded-md mx-6'>Save</button>
        </div>
        <h2 className='text-lg text-black font-bold my-5'>Your Todos</h2>


        <div className="todos">
          {todos.length === 0 && "No Todos To Display"}
          {todos.map(item => {
            return <div key={item.id} className="todo flex justify-between w-2/3 my-3">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleChkbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? 'line-through' : ''}>{item.Todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 hover:font-bold transition-all p-1 text-sm font-semibold text-white rounded-md mx-2'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 hover:font-bold transition-all p-1 text-sm font-semibold text-white rounded-md mx-2'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
