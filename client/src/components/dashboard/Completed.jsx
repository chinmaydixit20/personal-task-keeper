import React, { useContext, useEffect, useState } from 'react'
import TaskContext from '../../taskcontext'
import { ListGroup, ListGroupItem, Input } from 'reactstrap';
import { FaTrash } from 'react-icons/fa'
import axios from 'axios'

const Completed = () => {
    
    const { tasks, setTasks } = useContext(TaskContext);


    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        axios.get("http://localhost:8000/tasks", {
            headers :{
                "x-auth-token": token
            }
        }).then(res => {
            setTasks(res.data)
        }).catch(err => {
            console.log(err.response.data.msg)
        })
    }, [tasks])

    const handleDelete = (id) => {
        const token = localStorage.getItem("auth-token");
        axios.delete(`http://localhost:8000/tasks/${id}`, {
            headers :{
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res.data.msg)
            setTasks(tasks.filter(task => {
                return task._id !== id
            }))
        }).catch(err => {
            console.log(err.response.data.msg)
        })
    }

    

    const handleComplete = (id) => {
        console.log("clicked");
        const token = localStorage.getItem("auth-token");
        axios.put(`http://localhost:8000/tasks/${id}`, {
            completed: false
        }, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err.response.data.msg)
        })
    }

    return (
        <div className="ml-5 pt-5 w-75 pr-5">

           <h3>Completed</h3>
           <ListGroup flush>
                {
                    tasks.filter(task => task.completed).map(task => {
                        return (
                            <ListGroupItem 
                                className="d-flex align-items-center" 
                                style={{ textDecoration: 'none' }} 
                                href="#" 
                                key={task._id}
                            >
                                <Input type="checkbox" defaultChecked className="round" style={{ cursor: 'pointer' }} onClick={() => handleComplete(task._id)}/>
                                <span className="mr-auto ml-3" >{task.name}</span>
                                <FaTrash className="mx-2" style={{ cursor: 'pointer' }} onClick={() => handleDelete(task._id)}/>
                            </ListGroupItem>
                        )
                    })
                }   
            </ListGroup> 
        </div>
    )
}

export default Completed
