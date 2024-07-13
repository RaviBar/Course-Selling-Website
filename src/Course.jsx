import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";
function Course(){
    let {courseId} = useParams();
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
    let course = null;
    for(let i = 0; i<courses.length; i++){
        if(courses[i].id == courseId){
            course = courses[i];
        }
    }
    if(!course){
        return <div>
            No course found
        </div>
    }
    return <div>
        <CourseCard course={course} />
        <UpdateCard courses={courses} course={course} setCourses={setCourses} />
    </div>
}
function UpdateCard(props){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("") 
    const [image, setImage] = useState("") 
    const course = props.course;
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
                let updatedCourses = [];
                for(let i = 0; i<props.courses.length; i++){
                    if(props.courses[i].id == course.id){
                        updatedCourses.push({
                            id: course.id,  
                            title: title,
                            description: description,
                            imageLink: image
                        })
                    }else{
                        updatedCourses.push(props.courses[i])
                    }
                }
                props.setCourses(updatedCourses);
            }
            function callback1(res){
                res.json().then(callback2);
            }
            fetch("http://localhost:4000/admin/courses/" + course.id , {
                method: "PUT",
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

        >Update course</Button></Card>
</div></div>
}
function CourseCard(props){
    const course = props.course;
    return <div style={{display: "flex", justifyContent: "center"}}>
        <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200

        }}>
        <Typography variant="h4">{course.title}</Typography>
        <Typography variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} alt="" style={{ width: "100%" }}/>
            
        </Card>
    </div>
}
export default Course; 

// //By above code when we updateCourse, coursecard updatecard and parent component also re-rendered we want only those things re-render which changed
// // so we can use recoil which is state management library

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Card, Button } from "@mui/material";
// import { Typography, TextField } from "@mui/material";
// import { useSetRecoilState,useRecoilState, useRecoilValue } from "recoil";
// import { atom } from "recoil";
// function Course(){
//     let {courseId} = useParams();
//     const setCourses = useSetRecoilState(coursesState);
//     console.log("parent re-rendered");
//     useEffect(() => {
//         function callback2(data){
//             setCourses(data);
//         }
//         function callback1(res){
//             res.json().then(callback2);
//         }
//         fetch("http://localhost:4000/admin/courses", {
//             method: "GET",
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             }
//         }).then(callback1);
//     }, []);
    
    
//     return <div>
//         <CourseCard courseId={courseId} />
//         <UpdateCard courseId={courseId} />
//     </div>
// }
// function UpdateCard(props){
//     const [title, setTitle] = useState("")
//     const [description, setDescription] = useState("") 
//     const [image, setImage] = useState("");
//     const [courses, setCourses] = useRecoilState(coursesState);
//     console.log("updateCard re-rendered");
// return <div>
//     <div style={{
//     paddingTop: 100,
//     marginBottom: 20,
//     display:"flex",
//     justifyContent:"center"
// }}>

// </div>
// <div style={{display: "flex", justifyContent: "center"}}>
//     <Card variant="outlined" style={{width: 350, padding: 25, }}>
//         <Typography>Update the course details</Typography>
//     <TextField 
//         onChange={(e) => {
//             setTitle(e.target.value);
//         }}
//         fullWidth={true} 
//         label="title" 
//         variant="outlined" 
//         />
//         <br /> <br />
//         <TextField
//         onChange={(e) => {
//             setDescription(e.target.value);
//         }}
//         fullWidth={true} 
//         label="description" 
//         variant="outlined" 
//         />
//         <br /> <br />
//         <TextField
//         onChange={(e) => {
//             setImage(e.target.value);
//         }}
//         fullWidth={true} 
//         label="Image Link" 
//         variant="outlined" 
//         />
//         <br /> <br />
//         <Button 
//         size={'large'} 
//         variant="contained"
//         onClick={() =>{
//             function callback2(){
//                 let updatedCourses = [];
//                 for(let i = 0; i<courses.length; i++){
//                     if(courses[i].id == props.courseId){
//                         updatedCourses.push({
//                             id: props.courseId,  
//                             title: title,
//                             description: description,
//                             imageLink: image
//                         })
//                     }else{
//                         updatedCourses.push(courses[i])
//                     }
//                 }
//                 setCourses(updatedCourses);
//             }
//             function callback1(res){
//                 res.json().then(callback2);
//             }
//             fetch("http://localhost:4000/admin/courses/" + props.courseId , {
//                 method: "PUT",
//                 body: JSON.stringify({
//                     title: title,
//                     description: description,
//                     imageLink: image,
//                     published: true
//                 }),
//                 headers: {
//                     "Content-type": "application/json",
//                     "Authorization": "Bearer " + localStorage.getItem("token")
//                 }
//             }).then(callback1)
//         }}

//         >Update course</Button></Card>
// </div></div>
// }
// function CourseCard(props){
//     const courses = useRecoilValue(coursesState);
//     let course = null;
//     for(let i = 0; i<courses.length; i++){
//         if(courses[i].id == props.courseId){
//             course = courses[i];
//         }
//     }
//     console.log("courseCard re-rendered");

//     if(!course){
//         return <div>
//             No course found
//         </div>
//     }

//     return <div style={{display: "flex", justifyContent: "center"}}>
//         <Card style={{
//             margin: 10,
//             width: 300,
//             minHeight: 200

//         }}>
//         <Typography variant="h4">{course.title}</Typography>
//         <Typography variant="subtitle1">{course.description}</Typography>
//         <img src={course.imageLink} alt="" style={{ width: "100%" }}/>
            
//         </Card>
//     </div>
// }
// export default Course;

// const coursesState = atom({
//     key: 'coursesState', 
//     default: '',
//   });