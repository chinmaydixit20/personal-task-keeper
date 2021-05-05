import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm'; 
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard'
import UserContext from './usercontext';
import './App.css'
import {
  Switch, 
  Route, 
  Redirect
} from 'react-router-dom';

function App() {
  const [userData, setUserData] = useState({
    token: null,
    user: null
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loggedIn = () => {
      setLoading(true);
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
      setLoading(false);
    }
    loggedIn();
  });

  return (
    loading
    ? <div>Hello</div>
    : <UserContext.Provider value={{ userData, setUserData }}>
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
          <Route path="/dashboard" >
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
