import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function Appbar(){
    const navigate = useNavigate();
    const[userEmail, setUserEmail] = useState(null);
    useEffect(() => {
        fetch("http://localhost:4000/admin/me", {
            method: "GET",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
        .then((data) => {
            if(data.username){
                setUserEmail(data.username)
            }
        })  
    }, []);

    if(userEmail){
        return  <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 8
        }}>
            <div>
            <Typography variant={"h6"}>
                Home
            </Typography></div>
            <div style={{display:"flex"}}>
            <div style={{marginRight:8}}>
                <Button 
                variant={"h6"}
                onClick={async() => {
                    navigate("./addcourse")
                }}>Add courses</Button>
            <Button 
                variant={"h6"}
                onClick={async() => {
                    navigate("./courses")
                }}>Courses</Button>
                {userEmail}
                <Button 
                variant={"contained"}
                onClick={() => {
                    localStorage.setItem("token", null);
                    window.location = "/"
            }}>Logout</Button>
            </div>
            </div>
        </div>
    }else{
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 8
        }}>
            <div>
            <Typography variant={"h6"}>
                Home
            </Typography></div>
            <div style={{display:"flex"}}>
            <div style={{marginRight:8}}>
                <Button 
                variant={"contained"}
                onClick={() => {
                    //this is not the write way to do routing we can also use Link but to redirect components there is hooks like useNavigate
                    // window.location = "/signup"
                    navigate("./signup")
                }}>Sign up</Button>
            </div>
            <div>
                <Button 
                variant={"contained"}
                onClick={() => {
                    // window.location = "/signin"
                    navigate("./login")
    
                }}>Sign in</Button>
            </div>
            </div>
        </div>
    }

    
}

export default Appbar;