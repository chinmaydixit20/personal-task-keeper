import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../usercontext';
import {
    Button, Form, FormGroup,
    Label, Input, Alert
} from 'reactstrap';
import { useHistory } from 'react-router';

const LoginForm = (props) => {
    const [userCred, setUserCred] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(false);

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem("auth-token") === userData.token) {
            history.push("/dashboard");
        }
        else {
            history.push("/login");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const user = {
            username: userCred.username,
            password: userCred.password
        }
        console.log("click")
        axios.post("http://localhost:8000/users/login", user).then(res => {
            setUserData({
                token: res.data.token,
                user: res.data.user
            })
            setUserCred({
                username: "",
                password: ""
            });
            localStorage.setItem("auth-token", res.data.token);
            history.push("/dashboard");
        }).catch(err => {
            setError(true);
        })
    }

    return (
        <div className="LoginForm">
            <Alert color="danger" isOpen={error} toggle={() => setError(false)}>
                Sorry, your username or password are incorrect. Please check your details.
            </Alert>
            <Form onSubmit={handleSubmit}>
                <h1>
                    <span className="font-weight-bold">Personal Task</span> Keeper
                </h1>
                <h3 className="text-center pt-3">Welcome</h3>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type="text" placeholder="Username" value={userCred.username} onChange={e => setUserCred({
                        username: e.target.value,
                        password: userCred.password
                    })}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Password" value={userCred.password} onChange={e => setUserCred({
                        username: userCred.username,
                        password: e.target.value
                    })}/>
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block mt-4" type="submit">Log In</Button>
                <div className="text-center pt-3">
                    <a className="mr-2" href="/signup">Sign Up</a>
                    <span className="p-2">|</span>
                    <a className="ml-2" href="/">Forgot Password</a>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm;
