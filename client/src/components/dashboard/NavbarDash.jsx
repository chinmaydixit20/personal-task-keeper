import React, { useState, useContext } from 'react'
import UserContext from '../../usercontext'
import { useHistory } from 'react-router-dom';
import {
    Collapse, Navbar, NavbarToggler,
    NavbarBrand, Nav, NavItem,
    NavLink, Modal, ModalHeader,
    ModalBody, ModalFooter, Button,
    UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Form,
    Input
} from 'reactstrap';
import { FaCog, FaPlus } from 'react-icons/fa'
import TaskContext from '../../taskcontext';
import axios from 'axios';


const NavbarDash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({
    name: "",
    datetime: ""
  })

  const { userData, setUserData } = useContext(UserContext);
  const { tasks, setTasks } = useContext(TaskContext);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const logout = (e) => {
    e.preventDefault();
    setUserData({
      user: undefined,
      token: undefined
    });
    localStorage.setItem("auth-token", "");
    history.push("/login")
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth-token");
    axios.post("http://localhost:8000/tasks/new", task, {
      headers: {
        "x-auth-token": token
      }
    }).then(res => {
      setTasks([
        ...tasks,
        res.data
      ])
    }).catch(err => {
      console.log(err.response.data.msg)
    })
    setTask({
      name: "",
      datetime: ""
    })
  }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} >
        <ModalHeader toggle={toggle}>New Task</ModalHeader>
        <Form onSubmit={handleAddTask}>
          <ModalBody>
            <Input autoComplete="off" type="text" name="task" id="taskId" placeholder="Add a Task" value={task.name} onChange={e => {
              setTask({
                name: e.target.value,
                datetime: task.datetime
              })
            }}/>
            <Input className="mt-3" type="datetime-local" name="datetime" id="datetimeId" value={task.datetime} onChange={e => {
              setTask({
                name: task.name,
                datetime: e.target.value
              })
            }}/>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-dark mr-3" onClick={toggle} type="submit" disabled={task.name === "" || task.datetime === ""}>Add Task</Button>
            <span onClick={toggle} style={{ cursor: 'pointer' }}>Cancel</span>
          </ModalFooter>
        </Form>
      </Modal>


      <Navbar className="navbar-dark bg-dark" dark expand="md">
        <NavbarBrand href="/"><span className="font-weight-bold">Personal Task</span> Keeper</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="mr-5">
                <NavLink>
                    <FaPlus size={18} onClick={toggle}/>
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink href="#" onClick={logout}>Logout</NavLink>
                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    <FaCog size={20} className="icon-spin"/>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Profile
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={logout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

}



export default NavbarDash
