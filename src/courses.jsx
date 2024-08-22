import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Courses(){
    const[courses, setCourses] = useState([]);
    useEffect(() => {
        function callback2(data){
            setCourses(data.courses);
        }
        function callback1(res){
            res.json().then(callback2);
        }
        fetch("http://localhost:4000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1);
    }, []);
    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}> 
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
}
export function Course({course}) {
    const navigate = useNavigate();
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
    <Typography variant="h4">{course.title}</Typography>
    <Typography variant="subtitle1">{course.description}</Typography>
    <img src={course.imageLink} alt="" style={{ width: "100%", height: "250px", objectFit: "cover" }}/>
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: 10}}>
    <Button variant={"contained"} size="large" onClick={() => {
        navigate("/courses/" + course._id);
    }}>Edit</Button></div>
    </Card>
}
export default Courses;