import React from 'react'

export default function AddTask({ addFunc }) {
  return (
    <>
        <button onClick={addFunc}>Click me!</button> 
    </>
  )
}
