import React, { useEffect, useState } from 'react'
import { SiBookstack } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'

export default function AddTask() {

    const [textField, setTextField] = useState('')
    const [action, setAction] = useState('')
    const [task, setTask] = useState()
    const [illegalAccess, setIllegalAccess] = useState(false)

    const navigate = useNavigate()

    const handleChange = (event) => {
        setTextField(event.target.value)
    }

    const handleSubmit = () => {
        let newMeta = {
            action: action,
            task: {}
        }
        if (action === 'ADD') {
            let task = {
                id: Math.floor(Math.random() * 10000),
                task: textField,
                complete: false
            }
            newMeta.task = task
        } else {
            let taskCopy = JSON.parse(JSON.stringify(task))
            taskCopy.task = textField;
            newMeta.task = taskCopy
        }

        localStorage.setItem('meta', JSON.stringify(newMeta))

        navigate('/')
    }

    useEffect(() => {
        if (localStorage.length === 0) {
            // let urgentMeta = {
            //     action: 'ADD',
            //     task: null
            // }
            // localStorage.setItem('meta', JSON.stringify(urgentMeta))
            setIllegalAccess(true)
        } else {
            let meta = JSON.parse(localStorage.getItem('meta'))
            if (meta.action === 'EDIT') {
                setTextField(meta.task.task)
                setAction('EDIT')
                setTask(meta.task)
            } else {
                setAction('ADD')
            }
        }
    }, [])

    if (illegalAccess) {
        return (
            <h1 className='text-center text-4xl'>Please access this page through the main page.</h1>
        )
    }
    return (
        <>
            <div className='container header mx-auto my-5 w-1/2 p-5 rounded-lg border border-gray-500'>
                <div className='flex w-full rounded-lg border border-gray-400 overflow-hidden mb-2'>
                    <button className='bg-cyan-600 text-white h-auto md:w-[10%] p-2 sm:w-[20%]' disabled>
                        <SiBookstack className='mx-auto' />
                    </button>
                    <input className='w-[90%] px-2' type='text' placeholder='Search...' onChange={handleChange} value={textField} ></input>
                </div>
                
                <CustomButton content='Submit' buttonFunction={handleSubmit} />
            </div>
        </>
    )
}
