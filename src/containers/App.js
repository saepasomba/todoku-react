import './App.css';
import SearchBar from '../components/SearchBar'
import CustomButton from '../components/CustomButton';
import TaskRow from '../components/TaskRow';

import data from '../data.json'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {

  const [tasks, setTasks] = useState([])
  const [searchBar, setSearchBar] = useState('')
  const [filter, setFilter] = useState('ALL')
  const navigate = useNavigate()

  let tasksToShow = JSON.parse(JSON.stringify(tasks))

  // Filtering based on searchbar
  if (searchBar.length > 0) {
    tasksToShow = tasksToShow.filter(e => e.task.toLowerCase().includes(searchBar.toLowerCase()))
  }

  // Filtering based on completion
  switch (filter) {
    case 'DONE':
      tasksToShow = tasksToShow.filter(e => e.complete)
      break;

    case 'TODO':
      tasksToShow = tasksToShow.filter(e => !e.complete)
      break;

    default:
      break;
    }

 // Toggle task completion
  const taskCompleteToggle = (task) => {
    let tempTasks = JSON.parse(JSON.stringify(tasks))
    let targetTask = tempTasks.find(e => e.id === task.id)
    targetTask.complete = !targetTask.complete
    localStorage.setItem('currentTasks', JSON.stringify(tempTasks))
    setTasks(tempTasks)
  }

  // Add task passed from localstorage data
  const addTask = (task, tasksSource) => {
    let tasksCopy = JSON.parse(JSON.stringify(tasksSource))
    if (task?.task?.length > 0) {
      tasksCopy.push(task)
    }
    return tasksCopy
  }

  // Delete task
  const deleteTask = (task) => {
    let newTasks = tasks.filter(e => e.id !== task.id)
    localStorage.setItem('currentTasks', JSON.stringify(newTasks))
    setTasks(newTasks)
  }

  // Edit task passed from localstorage data
  const editTask = (task, tasksSource) => {
    let tempTasks = JSON.parse(JSON.stringify(tasksSource))
    if (task?.task?.length > 0) {
      let targetTask = tempTasks.find(e => e.id === task.id)
      targetTask.task = task.task
    }
    return tempTasks
  }

  // Delete done tasks
  const deleteDoneTasks = () => {
    let newTasks = tasks.filter(task => !task.complete)
    localStorage.setItem('currentTasks', JSON.stringify(newTasks))
    setTasks(newTasks)
  }

  // Delete all tasks
  const deleteAllTasks = () => {
    localStorage.setItem('currentTasks', JSON.stringify([]))
    setTasks([])
  }

  // Continously track the change of the search bar
  const searchBarChange = (event) => {
    setSearchBar(event.target.value)
  }

  // Redirecting to add/edit page with prep
  const redirectToCustomPage = (task) => {
    let passedMeta = {
      action: null,
      task: task
    }

    // If task is present, then the action = edit, else, add
    if (task === null) {
      passedMeta.action = 'ADD'
    } else {
      passedMeta.action = 'EDIT'
    }
    
    localStorage.setItem('meta', JSON.stringify(passedMeta))
    localStorage.setItem('currentTasks', JSON.stringify(tasks))
    navigate('/add', {state:{access: 'Legal Access'}})
  }


  // Set filter
  const filterDone = () => {
    setFilter('DONE')
  }

  const filterTodo = () => {
    setFilter('TODO')
  }

  const filterAll = () => {
    setFilter('ALL')
  }

  useEffect(() => {
    const loadData = () => {
      let currentTasks = JSON.parse(localStorage.getItem('currentTasks'))
      let meta = JSON.parse(localStorage.getItem('meta'))

      // When instructions clear
      if (currentTasks !== null && meta !== null) {
        let newTasks = []
        if (meta.action === 'ADD') {
          newTasks = addTask(meta.task, currentTasks)
        } else {
          newTasks = editTask(meta.task, currentTasks)
        }
        localStorage.setItem('currentTasks', JSON.stringify(newTasks))
        setTasks(newTasks)
      
      // Initial render
      } else {
        localStorage.setItem('currentTasks', JSON.stringify(data))
        setTasks(data)
      }
      localStorage.setItem('meta', JSON.stringify({action: 'ADD', task: {}}))
    }
    loadData()
  }, [])

  return (
    <div className="container relative md:w-1/2 mx-auto text-center sm:w-10/12">
      <h1 className='font-bold text-3xl m-3'>TodoSearch</h1>
      <div className='container header grid grid-cols-[70%_30%] gap-5 justify-center items-end mx-auto p-5 rounded-lg border border-gray-500'>
        <div className='header-left flex flex-col gap-2 w-4/5'>
          <SearchBar handleChange={searchBarChange} />
          <CustomButton content='Search' />
        </div>
        <div className='container header-right'>
          <CustomButton content='Add new task' buttonFunction={() => redirectToCustomPage(null)} />
        </div>
      </div>

      <div className='container my-3'>
        <h2 className='text-3xl font-normal my-3'>TodoList</h2>
        <div className='container flex justify-center gap-5'>
          <CustomButton content='All' buttonFunction={filterAll} isActive={filter === 'ALL'} />
          <CustomButton content='Done' buttonFunction={filterDone} isActive={filter === 'DONE'} />
          <CustomButton content='Todo' buttonFunction={filterTodo} isActive={filter === 'TODO'} />
        </div>
      </div>

      <div className='container my-10 mb-24 flex flex-col gap-2'>
        {
          tasksToShow.length > 0
          ? tasksToShow.map(task => {
            return <TaskRow key={task.id} task={task} doneToggle={taskCompleteToggle} deleteTask={deleteTask} redirectToCustomPage={redirectToCustomPage} />
          })
          : <h2>No task here</h2>
        }
      </div>
      
      <div className='container footer my-5 fixed bottom-0 md:w-1/2 sm:w-10/12'>
        <div className='grid grid-cols-2 gap-4'>
          <CustomButton content='Delete done tasks' type='danger' buttonFunction={deleteDoneTasks} />
          <CustomButton content='Delete all tasks' type='danger' buttonFunction={deleteAllTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
