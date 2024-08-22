import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";
import Appbar from "./Appbar.jsx";
import Courses from "./courses.jsx";
import Course from "./Course.jsx"
import Addcourse from "./Addcourse.jsx";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#eeeeee"
    }}>
     <RecoilRoot> 
        <Router>
          <Appbar/>
            <Routes>
              <Route path="/addcourse" element={<Addcourse/>} />
              <Route path="/courses/:courseId" element={<Course/>} />
              <Route path="/courses" element={<Courses/>} />
              <Route path="/login" element={<Signin/>} />
              <Route path="/signup" element={<Signup/>} />
            </Routes>
        </Router>
    </RecoilRoot>
    </div>
  )
}

export default App
