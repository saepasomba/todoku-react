import React from 'react'

export default function CustomButton({ content, buttonFunction, isActive, type }) {
  let backgroundColor = 'bg-cyan-600'
  if (isActive) {
    backgroundColor = 'bg-slate-500'
  }

  if (type === 'danger') {
    backgroundColor = 'bg-red-500'
  }
  return (
    <button onClick={buttonFunction} className={`${backgroundColor} rounded-lg text-white w-full p-2`}>
        {content}
    </button>
  )
}
