import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./routes/home";
import Notes from './routes/notes';
import Signup from './routes/signup';
import Login from './routes/Login';
import  "./App.css"
import PostDetail from './routes/PostDetail';
import UserProfile from './routes/UserProfile';
import Authors from './routes/Authors';
import CategoryPosts from './routes/CategoryPosts';
import AuthorPosts from './routes/AuthorPosts';
import Dashboard from './routes/Dashboard';
import EditPost from './routes/EditPost';
import Article from './routes/Article';
import DeletePost from './routes/DeletePost';
import CreatePost from './routes/CreatePost';
import {useCookies} from 'react-cookie';

function App() {
  const [cookies,setCookie]=useCookies(["token"]);
  return (
    
    <div className="w-screen ">
     <Router>
       {cookies.token?
            <Routes>
                <Route path="*" element={<Navigate to="/" replace/>} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/notes" element={<Notes/>}/>
                <Route path="/article" element={<Article/>}/>
                <Route path="/posts/:id" element={<PostDetail/>}/>
                <Route path='/profile' element={<UserProfile/>}/>
                <Route path='/authors' element={<Authors/>}/>
                <Route path='/posts/category/:category' element={<CategoryPosts/>}/>
                <Route path='/posts/author/:id' element={<AuthorPosts/>}/>
                <Route path='/myposts/:id' element={<Dashboard/>}/>
                <Route path='/posts/:id/edit' element={<EditPost/>}/>
                <Route path='/posts/:id/delete' element={<DeletePost/>}/>
                <Route path='/create' element={<CreatePost/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>:
            <Routes>
                <Route path="*" element={<Navigate to="/login" replace/>} />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        }    
        </Router>
    </div>
  );
}

export default App;
