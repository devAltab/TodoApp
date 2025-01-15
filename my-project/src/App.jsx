import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const saveToLS = () => {

    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const handlechange = (e) => {
    settodo(e.target.value)

  }
  const handleAdd = () => {

    console.log(todo.length)
    if (todo.length > 0)
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    console.log(todos)
    settodo("")

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    console.log(t)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)

  }
  const handleDel = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    console.log(newtodos)
    settodos(newtodos)

  }
  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index)
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    
  }

  return (
    <>
      <div className='container bg-purple-100 overflow-auto rounded-xl w-3/4 h-[80vh] m-auto'>
        <div className='add sticky top-0 bg-purple-100 z-0'>

          <div className='w-3/5 text-xl m-auto font-bold '> iTask - Manage your todos at one place</div>
          <h2 className='font-bold mx-5 '> Your Todo</h2>
          <input onChange={handlechange} value={todo} className='w-3/5 m-5 border rounded-md border-red-600' type="text"></input>
          <button onClick={handleAdd} className='pb-1 px-2 text-white font-bold bg-purple-500 rounded-md '>save</button>
          <h2 className='font-bold mx-5'> Your Todos</h2>
<div className='w-5/6 m-auto border border-gray-400'></div>
        </div>
        {todos.map(item => {
          return <div key={item.id} className=' flex  justify-between  my-3 w-3/4 '>
          <div className='flex'>
            <input className='mx-5' name={item.id} onChange={handleCheck} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted ? "line-through" : ""}
            >{item.todo}</div>
             </div>
            <div>
              <button onClick={(e) => { handleEdit(e, item.id) }} value={todo} className='px-2 border-2 border-fuchsia-400 rounded-md mx-2'>edit</button>
              <button className='px-2 border-2 border-fuchsia-400 rounded-md mx-2' onClick={(e) => { handleDel(e, item.id) }} >del</button>
              {saveToLS()}
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
