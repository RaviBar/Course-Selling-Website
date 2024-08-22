import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';

function Signup(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return <div>
        <div style={{
            paddingTop: 100,
            marginBottom: 20,
            display:"flex",
            justifyContent:"center"
        }}>
            <Typography variant={'h5'}>
             Sign up below
            </Typography>
        </div>
        
        <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant="outlined" style={{width: 350, padding: 25, }}>
            <TextField 
            onChange={(e) => {
                setEmail(e.target.value);
            }}
            fullWidth={true} 
            label="Email" 
            variant="outlined" 
            />
            <br /> <br />
            <TextField
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            fullWidth={true} 
            label="password" 
            variant="outlined" 
            type= {'password'}
            />
            <br /> <br />
            <Button 
            size={'large'} 
            variant="contained"
            // onClick={() => {
                //this is not the right way to get the value inside the input box in react
                // let username = document.getElementById("username").value;
                // let password = document.getElementById("password").value;

                // function callback2(data){
                //     localStorage.setItem("token", data.token);
                //     window.location = "/"
                // }
                // function callback1(res){
                //     res.json().then(callback2);
                // }
                // fetch("http://localhost:4000/admin/signup", {
                //     method: "POST",
                //     body: JSON.stringify({
                //         username: email,
                //         password: password
                //     }),
                //     headers: {
                //         "Content-type": "application/json"
                //     }
                // }).then(callback1)
            // }}

            //use of axios, async and await
            onClick={async() => {
                const response = await axios.post("http://localhost:4000/admin/signup", {
                    username: email,
                    password: password
                })
                let data = response.data;
                localStorage.setItem("token", data.token);
                window.location= "/";
                alert("registration completed")
            }}

            >Sign up</Button>
            </Card>
            </div>
    </div>
}

export default Signup