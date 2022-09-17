import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar() {
  return (
    <div className='flex w-full rounded-lg border border-gray-400 overflow-hidden'>
        <button className='bg-teal-300 text-white h-auto w-1/12 px-2 text-center'>
            <FiSearch className='mx-auto' />
        </button>
        <input className='w-full px-2' type='text' placeholder='Search...'></input>
    </div>
  )
}
