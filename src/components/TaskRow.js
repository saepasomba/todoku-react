import React from 'react'
import { BsSquare, BsCheckSquare, BsTrash, BsPen } from 'react-icons/bs'

export default function TaskRow({ task, doneToggle, deleteTask, redirectToCustomPage }) {
  return (
    <div className='container grid grid-cols-[65%_35%] text-left p-3 border rounded-lg'>
        <p className={`${task.complete ? 'text-red-500 line-through' : ''}`}>{task.task}</p>
        <div className='btn-group container flex gap-7 justify-end text-lg'>
            {
                task.complete
                ? <button className='text-green-500' onClick={() => doneToggle(task)}><BsCheckSquare /></button>
                : <button className='text-gray-500' onClick={() => doneToggle(task)}><BsSquare /></button>
            }
            <button className='text-yellow-500' onClick={() => redirectToCustomPage(task)}><BsPen /></button>
            <button className='text-red-500' onClick={() => deleteTask(task)}><BsTrash /></button>
        </div>
    </div>
  )
}