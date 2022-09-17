import React from 'react'

export default function CustomButton({ content }) {
  return (
    <button onClick={() => console.log("Hello")} className='bg-teal-300 rounded-lg text-white w-full'>
        {content}
    </button>
  )
}
