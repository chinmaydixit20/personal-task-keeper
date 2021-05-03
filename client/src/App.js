import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm'; 
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard'
import UserContext from './usercontext';
import { Redirect } from 'react-router-dom';
import './App.css'
import {
  Switch, 
  Route
} from 'react-router-dom';

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: null
  });

  useEffect(() => {
    const loggedIn = () => {
      let token = localStorage.getItem("auth-token");
      if(token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      axios.get("http://localhost:8000/users/", {
        headers: {
          "x-auth-token": token
        }
      }).then(res => {
        setUserData({
          token,
          user: res.data
        });
      }).catch(err => {
        console.log(err.response.data.msg);
      })
    }

    loggedIn();
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => {
            return(
              userData.token ?
              <Redirect to="/dashboard" /> :
              <Redirect to="/login" />
            )
          }} />
          <Route path="/login" exact>
            <LoginForm />
          </Route>
          <Route path="/signup" exact>
            <SignupForm />
          </Route>
          <Route path="/dashboard" render={() => {
            return (
              userData.token 
              ? <Dashboard />  
              : <Redirect to="/login" />
            )
          }} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
