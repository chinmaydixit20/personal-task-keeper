import React, { useContext, useEffect, useState } from 'react'
import TaskContext from '../../taskcontext'
import UserContext from '../../usercontext'
import { useHistory } from 'react-router-dom'
import { ListGroup, ListGroupItem, Modal,
         ModalBody, ModalFooter, ModalHeader,
         Input, Button, Form
         
} from 'reactstrap';
import { FaTrash, FaEdit, FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'
import axios from 'axios'

const Tasks = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState({
        id: "",
        name: "",
        datetime: "",
        description: ""
    })
    const { tasks, setTasks } = useContext(TaskContext);


    const toggle = () => setIsOpen(!isOpen);

    const loadModal = (id, name, desc, datetime) => {
        setTask({
            id,
            name,
            datetime: datetime.replace('Z', ''),
            description: desc
        })
        setIsOpen(!isOpen);
    }

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

    const handleUpdateTask = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("auth-token");
        axios.put(`http://localhost:8000/tasks/${task.id}`, { 
            name: task.name,
            description: task.description,
            datetime: task.datetime
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

    const handleComplete = (id) => {
        console.log("clicked");
        const token = localStorage.getItem("auth-token");
        axios.put(`http://localhost:8000/tasks/${id}`, {
            completed: true
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
            <Modal isOpen={isOpen} toggle={toggle} contentClassName="update-modal">
                <ModalHeader toggle={toggle}>Update Task</ModalHeader>
                <Form onSubmit={handleUpdateTask}>
                    <ModalBody>
                        <Input autoComplete="off" type="text" name="task" id="taskId" placeholder="Task Name" value={task.name} onChange={e => {
                            setTask({
                                id: task.id,
                                name: e.target.value,
                                datetime: task.datetime,
                                description: task.description
                            })
                        }}/>
                        <Input className="mt-3" type="datetime-local" name="datetime" id="datetimeId" value={task.datetime} onChange={e => {
                            setTask({
                                id: task.id,
                                name: task.name,
                                datetime: e.target.value,
                                description: task.description
                            })
                        }}/>
                        <Input autoComplete="off" 
                               type="textarea" 
                               name="task" 
                               id="textareaId" 
                               placeholder="Task Description" 
                               className="mt-3"
                               value={task.description} onChange={e => {
                                setTask({
                                    id: task.id,
                                    name: task.name,
                                    datetime: task.datetime,
                                    description: e.target.value
                                })
                        }}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn-dark mr-3" onClick={toggle} type="submit" disabled={task.name === "" || task.datetime === ""}>Update Task</Button>
                        <span className="mr-2" onClick={toggle} style={{ cursor: 'pointer' }}>Cancel</span>
                    </ModalFooter>
                </Form>
            </Modal>


           <h3>Inbox</h3>
           <ListGroup flush>
                {
                    tasks.filter(task => !task.completed).map(task => {
                        return (
                            <ListGroupItem 
                                className="d-flex align-items-center" 
                                style={{ textDecoration: 'none' }} 
                                href="#" 
                                key={task._id}
                            >
                                <Input type="checkbox" className="round" style={{ cursor: 'pointer' }} onClick={() => handleComplete(task._id)}/>
                                <span className="mr-auto ml-3" >{task.name}</span>
                                <FaEdit className="mx-2" style={{ cursor: 'pointer' }} onClick={() => loadModal(task._id, task.name, task.description, task.datetime)}/>
                                <FaTrash className="mx-2" style={{ cursor: 'pointer' }} onClick={() => handleDelete(task._id)}/>
                            </ListGroupItem>
                        )
                    })
                }   
            </ListGroup> 
        </div>
    )
}

export default Tasks
