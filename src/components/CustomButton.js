import React from 'react'

export default function CustomButton({ content, buttonFunction, isActive, type }) {
  return (
    <button onClick={buttonFunction} className={`${isActive ? 'bg-slate-500' : 'bg-teal-300'} ${type === 'danger' && 'bg-red-500'} rounded-lg text-white w-full p-2`}>
        {content}
    </button>
  )
}
