import React from 'react'
import { BsSquare, BsCheckSquare, BsTrash, BsPen } from 'react-icons/bs'

export default function TaskRow({ task }) {
  return (
    <div className='container grid grid-cols-[65%_35%] text-left p-3 border rounded-lg'>
        <p className={`${task.complete ? 'text-red-500 line-through' : ''}`}>{task.task}</p>
        <div className='btn-group container flex gap-7 justify-end text-lg'>
            {
                task.complete
                ? <button className='text-green-500'><BsCheckSquare /></button>
                : <button className='text-gray-500'><BsSquare /></button>
            }
            <button className='text-yellow-500'><BsPen /></button>
            <button className='text-red-500'><BsTrash /></button>
        </div>
    </div>
  )
}