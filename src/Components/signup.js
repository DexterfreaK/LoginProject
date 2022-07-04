import { React, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, FloatingLabel,Alert } from 'react-bootstrap';

function SignUp(){
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [err,setErr] = useState(false);

    function onsignin(e){
        e.preventDefault();

        let details = {
            name: name,
            username:username,
            email: email,
            password: password,
            
            
        }
        axios.post('https://sutt-front-task-one.herokuapp.com/api/v1/auth/register',details)

            .then(response => {
                setSuccess(true);
                console.log(response);
                localStorage.setItem("token", response.data.responses.accessToken);
                console.log(response.data.responses.accessToken);
                setTimeout(() => window.location.href = '/Dashboard', 1000);
                
            })
            .catch(error => {
                setErr(true);
                setErrMsg(error.response.data.message);
            })
    }


    return (
        <>
            {success ? (
                <Alert className='m-5' variant='success'>
                    Successfully Registered Redirecting to Dashboard
                </Alert>
            ) : (<div>
                <Form className='m-5' onSubmit= {onsignin} >
                    <h1 className='text-center display-4'> Sign Up</h1>
                    <FloatingLabel controlId="floatingInput" label="Name" className='mb-3 '>
                            <Form.Control type="text" name='name' placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="User Name" className='mb-3' >
                            <Form.Control type="text" name='username' placeholder="UserName" onChange={(e) => setUsername(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Email" className='mb-3' >
                            <Form.Control type="email" name='email' placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />

                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Password" className='mb-3'>
                            <Form.Control type="password" name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </FloatingLabel>

                    <Button className='mt-3' variant="outline-primary" type="submit">
                        Submit
                    </Button>

                </Form>
                {err ? (<Alert className='m-5' variant='danger'>
                    {errMsg}
                </Alert>) : <></>}
            </div>

            )

            }
        </>

    )
}

export default SignUp;