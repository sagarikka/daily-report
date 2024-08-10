import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./routes/home";
import Notes from './routes/notes';
import Signup from './routes/signup';
import Login from './routes/Login';
import  "./App.css"

function App() {
  return (
    <div className="w-screen h-screen">
     <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/notes" element={<Notes/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
