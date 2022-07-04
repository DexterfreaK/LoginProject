import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Alert,Card,Button, Fade } from 'react-bootstrap';
import { React, useState } from 'react';

let name,email,upd,crt,username,id;

function Dashboard(){
    
    const [dashboard,setDashboard] = useState(false);
    // const [name,setName] = useState("");
    // const [id,setid] = useState("");
    // const [user,setuser] = useState("");
    // const [upd,setupd] = useState("");
    // const [crt,setcrt] = useState("");
    // const [email,setemail] = useState("");
    // const [data,setData] = useState({});

    function getinfor() {

        const api = 'https://sutt-front-task-one.herokuapp.com/api/v1/auth/user';
        
        const token = localStorage.getItem('token')

        axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })

            .then(res => {

                // setData(res.data.data.name);
                // console.log(data);
                console.log(res.data.data);

                name = res.data.data.name;
                id = res.data.data._id;
                email = res.data.data.email;
                crt = res.data.data.createdAt;
                upd = res.data.data.updatedAt;
                username = res.data.data.username;
                setDashboard(true);

            })
            .catch((error) => {
                console.log(error)
            });
    }
    function signout (e){
        e.preventDefault();
        setDashboard(false);
        localStorage.removeItem("token");
        window.location.href = '/';
    }
    return(
        <>
            {dashboard ?(
                <Card className='m-4 p-3 text-center bg-light'>
                    <Alert variant='primary' className='d-flex justify-content-between'>
                        <h4>Dashboard</h4>
                        <Button variant="outline-danger" onClick={signout}>Sign Out</Button>
                    </Alert>
                   
                    <Card.Title>Name : {name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted ">Email ID : {email}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">User Name : {username}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">ID : {id}</Card.Subtitle>
                    <Card.Text>
                        Created at {crt} | Updated at {upd}
                    </Card.Text>
                    <Alert variant='success'>
                        Successfully Logged In
                    </Alert>
                </Card>):
                (getinfor())
            
            }
        </>
      
    )

}


export default Dashboard;