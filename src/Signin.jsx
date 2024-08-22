import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div>
        <div style={{
            paddingTop: 100,
            marginBottom: 20,
            display:"flex",
            justifyContent:"center"
        }}>
            <Typography variant={'h5'}>
            Welcome to my portfolio !!
            </Typography>
        </div>
        
        <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant="outlined" style={{width: 350, padding: 25, }}>
            <TextField 
            fullWidth={true} 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            />
            <br /> <br />
            <TextField
            fullWidth={true} 
            id="outlined-basic" 
            label="password" 
            variant="outlined" 
            />
            <br /> <br />
            <Button size={'large'} variant="contained"
            onClick={async() => {
                const response = await axios.post("http://localhost:4000/admin/login", {
                    username: email,
                    password: password
                })
                let data = response.data;
                localStorage.setItem("token", data.token);
                alert("logged in")
                navigate("/"); 
            }}
            >Login</Button>
            </Card>
            </div>
    </div>
}

export default Signin