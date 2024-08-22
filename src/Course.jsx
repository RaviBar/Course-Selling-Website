import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Grid } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import axios from "axios";
function Course(){
    let {courseId} = useParams();
    const[course, setCourse] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:4000/admin/courses/" + courseId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse(res.data.course);
        });
    }, [courseId]);

    if(!course){
        return <div>
            Loading..... course!!
        </div>
    }
    return <div>
        <GrayTopper title = {course.title} />
        <Grid container>
            <Grid item lg={4} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} />
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
                <CourseCard course={course} />
            </Grid>
        </Grid>
    </div>
}
function GrayTopper({title}){
    return <div style={{height: 300, top: 0, background: "#212121", width:"100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{height: 250, display:"flex", justifyContent:"center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 500}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}
function UpdateCard({course, setCourse}){
    const [title, setTitle] = useState(course.title)
    const [description, setDescription] = useState(course.description) 
    const [image, setImage] = useState(course.imageLink) 
    const [price, setPrice] = useState(course.price) 

return <div>
    <div style={{
    paddingTop: 100,
    marginBottom: 20,
    display:"flex",
    justifyContent:"center"
}}>

</div>
<div style={{display: "flex", justifyContent: "center"}}>
    <Card variant="outlined" style={{width: 350, padding: 25, }}>
        <Typography>Update the course details</Typography>
    <TextField 
        value = {title}
        style={{marginBottom:10}}
        onChange={(e) => {
            setTitle(e.target.value);
        }}
        fullWidth={true} 
        label="title" 
        variant="outlined" 
        />
        <br /> <br />
        <TextField
        value = {description}
        style={{marginBottom:10}}
        onChange={(e) => {
            setDescription(e.target.value);
        }}
        fullWidth={true} 
        label="description" 
        variant="outlined" 
        />
        <br /> <br />
        <TextField
        value = {image}
        style={{marginBottom:10}}
        onChange={(e) => {
            setImage(e.target.value);
        }}
        fullWidth={true} 
        label="Image Link" 
        variant="outlined" 
        />
        <br /> <br />
        <TextField
        value = {price}
        style={{marginBottom:10}}
        onChange={(e) => {
            setPrice(e.target.value);
        }}
        fullWidth={true} 
        label="Price" 
        variant="outlined" 
        />
        <br /> <br />
        <Button 
        variant="contained"
        onClick={async() =>{
            axios.put("http://localhost:4000/admin/courses/" + course._id , {
                title: title,
                description: description,
                imageLink: image,
                published: true,
                price
            }, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                let updatedCourse = {
                    _id: course._id,  
                    title: title,
                    description: description,
                    imageLink: image,
                    price
                }
                setCourse(updatedCourse); 
        }} 
        >Update course</Button></Card>
</div></div>
}
function CourseCard(props){
    const course = props.course;
    return <div style={{display: "flex", justifyContent: "center", marginTop: 50, width: "100vw"}}>
        <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            borderRadius: 20,
            paddingBottom: 15,
            zIndex: 2
        }}>
        <img src={course.imageLink} alt="" style={{ width: "100%", height: "150px", objectFit: "cover"}}/>
        <div style={{marginLeft: 10}}>
        <Typography variant="h4">{course.title}</Typography>
        <Typography variant="subtitle1">{course.description}</Typography>
        <Typography variant="subtitle2" style={{color: "gray"}}>
            Price 
        </Typography>
        <Typography variant="subtitle1" style={{color: "gray"}}>
            <b> Rs {course.price} </b>
        </Typography>
        </div>
        </Card>
    </div>
} 
export default Course; 
