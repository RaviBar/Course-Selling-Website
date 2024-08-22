import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
function Addcourse(){
        const [title, setTitle] = useState("")
        const [description, setDescription] = useState("") 
        const [image, setImage] = useState("") 
        const [price, setPrice] = useState(0) 
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
        style={{marginBottom: 10}}
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
            <TextField
            onChange={(e) => {
                setImage(e.target.value);
            }}
            fullWidth={true} 
            label="Price" 
            variant="outlined" 
            />
            <br/> <br/>
            <Button 
            size={'large'} 
            variant="contained"
            onClick={async() =>{
                await axios.post("http://localhost:4000/admin/courses", {
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true,
                    price
                }, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                alert("course added");
            }}
            >Add course</Button></Card>
    </div></div>
}

export default Addcourse;