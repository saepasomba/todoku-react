import './App.css';
import SearchBar from '../components/SearchBar'
import CustomButton from '../components/CustomButton';
import TaskRow from '../components/TaskRow';

import data from '../data.json'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function addButtonClicked() {
    console.log('hello')
}

function App() {

  const [tasks, setTasks] = useState([])
  const [searchBar, setSearchBar] = useState('')
  const navigate = useNavigate()

  let tasksToShow = JSON.parse(JSON.stringify(tasks))

  if (searchBar.length > 0) {
    tasksToShow = tasksToShow.filter(e => e.task.toLowerCase().includes(searchBar.toLowerCase()))
  }


  const loadData = async () => {
    setTasks(data)
  }

  const taskCompleteToggle = (task) => {
    let tempTasks = JSON.parse(JSON.stringify(tasks))
    let targetTask = tempTasks.find(e => e.id === task.id)
    targetTask.complete = !targetTask.complete
    setTasks(tempTasks)
  }

  const addTask = (task) => {
    setTasks(tasks.push(task))
  }

  const deleteTask = (task) => {
    let newTasks = tasks.filter(e => e.id !== task.id)
    setTasks(newTasks)
  }

  const editTask = (task, update) => {
    let tempTasks = JSON.parse(JSON.stringify(tasks))
    let targetTask = tempTasks.find(e => e.id === task.id)
    targetTask.task = update
    setTasks(tempTasks)
  }

  const deleteDoneTasks = () => {
    let newTasks = tasks.filter(task => !task.complete)
    setTasks(newTasks)
  }

  const deleteAllTasks = () => {
    setTasks([])
  }

  const searchBarChange = (event) => {
    setSearchBar(event.target.value)
  }

  const redirectToCustomPage = () => {
    navigate('/add')
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="container w-1/2 mx-auto text-center">
      <h1 className='font-bold text-5xl m-3'>Todoku</h1>
      <div className='container header grid grid-cols-[70%_30%] gap-5 justify-center items-end mx-auto p-5 rounded-lg border border-gray-500'>
        <div className='header-left flex flex-col gap-2'>
          <SearchBar handleChange={searchBarChange} />
          <CustomButton content='Search' />
        </div>
        <div className='container header-right'>
          <CustomButton content='Add new task' buttonFunction={redirectToCustomPage}/>
        </div>
      </div>

      <div className='container my-3'>
        <h2 className='text-2xl font-bold my-3'>Todo List</h2>
        <div className='container flex justify-center gap-5'>
          <CustomButton content='All' />
          <CustomButton content='Done' />
          <CustomButton content='Todo' />
        </div>
      </div>

      <div className='container my-10 flex flex-col gap-2'>
        {
          tasksToShow.length > 0
          ? tasksToShow.map(task => {
            return <TaskRow key={task.id} task={task} doneToggle={taskCompleteToggle} deleteTask={deleteTask} />
          })
          : <h2>Add new task!</h2>
        }
      </div>

    </div>
  );
}

export default App;
