import React from 'react'

export default function CustomButton({ content, buttonFunction }) {
  return (
    <button onClick={buttonFunction} className='bg-teal-300 rounded-lg text-white w-full'>
        {content}
    </button>
  )
}
