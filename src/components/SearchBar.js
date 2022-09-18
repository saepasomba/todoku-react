import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ handleChange }) {
  return (
    <div className='flex w-full rounded-lg border border-gray-400 overflow-hidden'>
        <button className='bg-teal-300 text-white h-auto md:w-[10%] p-2 sm:w-[20%]'>
            <FiSearch className='mx-auto' />
        </button>
        <input className='w-[90%] px-2' type='text' placeholder='Search...' onChange={handleChange}></input>
    </div>
  )
}
