import React, { useEffect, useState, useContext } from 'react'
import NavbarDash from './dashboard/NavbarDash'
import Sidebar from './dashboard/Sidebar'
import Tasks from './dashboard/Tasks'
import Today from './dashboard/Today'
import Completed from './dashboard/Completed'
import TaskContext from '../taskcontext'
import UserContext from '../usercontext'
import axios from 'axios'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([])

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            <div>
                <NavbarDash />
                <div className="d-flex align-items-stretch">
                    <Sidebar />
                    <Switch>
                        <Route path="/dashboard" exact render={() => {
                            return <Redirect to="/dashboard/tasks" />
                        }} />
                        <Route path="/dashboard/tasks" exact>
                            <Tasks />
                        </Route>
                        <Route path="/dashboard/today" exact>
                            <Today />
                        </Route>
                        <Route path="/dashboard/completed" exact>
                            <Completed />
                        </Route>
                    </Switch>
                </div>
            </div>
        </TaskContext.Provider>
    )
}

export default Dashboard