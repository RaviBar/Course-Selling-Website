import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { Typography } from '@mui/material';

function Addcourse(){
        const [title, setTitle] = useState("")
        const [description, setDescription] = useState("") 
        const [image, setImage] = useState("") 
    return <div>
        <div style={{
        paddingTop: 100,
        marginBottom: 20,
        display:"flex",
        justifyContent:"center"
    }}>
        <Typography variant={'h5'}>
         Add new courses
        </Typography>
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant="outlined" style={{width: 350, padding: 25, }}>
        <TextField 
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            fullWidth={true} 
            label="title" 
            variant="outlined" 
            />
            <br /> <br />
            <TextField
            onChange={(e) => {
                setDescription(e.target.value);
            }}
            fullWidth={true} 
            label="description" 
            variant="outlined" 
            />
            <br /> <br />
            <TextField
            onChange={(e) => {
                setImage(e.target.value);
            }}
            fullWidth={true} 
            label="Image Link" 
            variant="outlined" 
            />
            <br /> <br />
            <Button 
            size={'large'} 
            variant="contained"
            onClick={() =>{
                function callback2(data){
                    alert("course added");
                    console.log(data);
                }
                function callback1(res){
                    res.json().then(callback2);
                }
                fetch("http://localhost:4000/admin/courses", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        imageLink: image,
                        published: true
                    }),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }).then(callback1)
            }}

            >Add course</Button></Card>
    </div></div>
}

export default Addcourse;