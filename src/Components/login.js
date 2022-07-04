import { React, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, FloatingLabel,Alert } from 'react-bootstrap';

function Login(){
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [err,setErr] = useState(false);


    function onlogin(e){
        e.preventDefault();
        console.log(username)
        console.log(password)
        let details = {
            username:username,
            password:password,
        }
        axios.post('https://sutt-front-task-one.herokuapp.com/api/v1/auth/login', details)

            .then(response => {
                setSuccess(true);
                localStorage.setItem("token",response.data.responses.accessToken);

                console.log(response.data.responses.accessToken);
                window.location.href = '/Dashboard'
            })
            .catch(error => {
                setErr(true);
                console.log(error.response.data.message);
                setErrMsg(error.response.data.message);
            })
    }

    return(
    <>
        {
            success?(
                    <Alert className='m-5' variant='success'>
                      Successfully Logged In
                    </Alert>
                
            ):( <div className="f">
                        {
                            
                        }
                        <Form className='m-5' onSubmit={onlogin}>
                            <h1 className='text-center display-4'> Login</h1>

                            <FloatingLabel controlId="floatingInput" label="Username" className='mb-3'>
                                <Form.Control type="text" placeholder="UserName" onChange={(e) => setUsername(e.target.value)} />

                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Password" className='mb-3'>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                            </FloatingLabel>
                            <div>
                                <Button className='mt-3 text-center' variant="outline-primary" type="submit">
                                    Login
                                </Button>

                                <a href="/SignUp" className='mx-3'>SignUp</a>
                            </div>


                        </Form>
                        {err?(
                        <Alert className='m-5' variant='danger'>
                            {errMsg} Please try again
                        </Alert>):(
                            <></>
                        )}
                </div>
               
                
                )
    
    }
    </>
    )
}

export default Login;