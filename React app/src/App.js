import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentsPage from "./components/Students";
import AddResult from "./components/Results";
import CoursesPage from "./components/Courses";
import HomeScreen from "./components/HomeScreen";
function App() {
  return (
    <Router>
      <HomeScreen />
      <Routes>
        <Route path="/Students" element={<StudentsPage/>}/>
        <Route path="/Results" element={<AddResult/>} />
        <Route path="/Courses" element={<CoursesPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
