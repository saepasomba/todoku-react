import React from 'react'

export default function CustomButton({ content, buttonFunction, isActive }) {
  return (
    <button onClick={buttonFunction} className={`${isActive ? 'bg-slate-500' : 'bg-teal-300'} rounded-lg text-white w-full`}>
        {content}
    </button>
  )
}
