import './App.css';
import SearchBar from '../components/SearchBar'
import CustomButton from '../components/CustomButton';
import TaskRow from '../components/TaskRow';

import data from '../data.json'
import { useEffect, useState } from 'react';


export function addButtonClicked() {
    console.log('hello')
}

function App() {

  const [tasks, setTasks] = useState([])

  const loadData = async () => {
    setTasks(data)
  }

  useEffect(() => {
    loadData()
  }, [])
  console.log(tasks)
  return (
    <div className="container w-1/2 mx-auto text-center">
      <h1 className='font-bold text-5xl m-3'>Todoku</h1>
      <div className='container header grid grid-cols-[70%_30%] gap-5 justify-center items-end mx-auto p-5 rounded-lg border border-gray-500'>
        <div className='header-left flex flex-col gap-2'>
          <SearchBar />
          <CustomButton content='Search' />
        </div>
        <div className='container header-right'>
          <CustomButton content='Add new task' />
        </div>
      </div>

      <div className='container my-10 flex flex-col gap-2'>
        {
          tasks.length > 0
          ? tasks.map(task => {
            return <TaskRow key={task.id} task={task} />
          })
          : <h2>Add new task now!</h2>
        }
      </div>

    </div>
  );
}

export default App;
