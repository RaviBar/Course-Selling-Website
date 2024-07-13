import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

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

    function Course(props) {
        return <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200

        }}>
        <Typography variant="h4">{props.course.title}</Typography>
        <Typography variant="subtitle1">{props.course.description}</Typography>
        <img src={props.course.imageLink} alt="" style={{ width: "100%" }}/>
            
        </Card>
    }
}
export default Courses;