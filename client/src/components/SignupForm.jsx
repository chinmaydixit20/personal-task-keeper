import React, { useState, useContext } from 'react'
import axios from 'axios'
import {
    Button, Form, FormGroup,
    Label, Input, Alert
} from 'reactstrap';
import UserContext from '../usercontext';
import { useHistory } from 'react-router-dom';

const SignupForm = (props) => {
    const [userCred, setUserCred] = useState({
        username: "",
        password: "",
        email: ""
    });
    const [error, setError] = useState(false);

    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: userCred.username,
            email: userCred.email,
            password: userCred.password
        }
        console.log("click")
        axios.post("http://localhost:8000/users/register", user).then(res => {
            setUserCred({
                username: "",
                password: "",
                email: ""
            });
            
            axios.post("http://localhost:8000/users/login", { 
                username: user.username, 
                password: user.password 
            }).then(log => {
                setUserData({
                    token: res.data.token,
                    user: res.data.user
                })
                localStorage.setItem("auth-token", log.data.token);
                history.push("/dashboard");

            }).catch(err => {
                console.log(err.response.msg);
                setError(true);
            })
        }).catch(err => {
            if(err.response) {
                console.log(err.response.msg)
                setError(true);
            }
        })
    }

    return (
        <div>
            <Alert color="danger" isOpen={error} toggle={() => setError(false)}>
                Sorry, your username or password are incorrect. Please check your details.
            </Alert>
            <Form className="SignupForm" onSubmit={handleSubmit}>
                <h1>
                    <span className="font-weight-bold">Personal Task</span> Keeper
                </h1>
                <h3 className="text-center pt-3">Welcome</h3>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type="text" placeholder="Username" value={userCred.username} onChange={e => setUserCred({
                        username: e.target.value,
                        email: userCred.email,
                        password: userCred.password
                    })}/>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email" value={userCred.email} onChange={e => setUserCred({
                        username: userCred.username,
                        email: e.target.value,
                        password: userCred.password
                    })}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Password" value={userCred.password} onChange={e => setUserCred({
                        username: userCred.username,
                        email: userCred.email,
                        password: e.target.value
                    })}/>
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block mt-4" type="submit">Sign in</Button>
                <div className="text-center pt-3">
                    <a href="/">Log In</a>
                </div>
            </Form>
        </div>
    )
}

export default SignupForm