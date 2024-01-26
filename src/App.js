import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const addNoteToast = () => toast.success("Note Added Successfully");
  const deleteNoteToast = () => toast.success("Note Deleted Successfully");
  const updateNoteToast = () => toast.success("Note Updated Successfully");
  const invalidCred = () => toast.error("Invalid Credentials");
  const logInToast = () => toast.success("Logged In Successfully");
  const signUpToast = () => toast.success("Signed Up Successfully");
  const logOutToast = () => toast.success("Logged Out Successfully");

  return (
    <>
    <NoteState>
      <Toaster/>
      <BrowserRouter>
        <Navbar logOutToast={logOutToast}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home addNoteToast={addNoteToast} deleteNoteToast={deleteNoteToast} updateNoteToast={updateNoteToast}/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/login" element={<Login logInToast={logInToast} invalidCred={invalidCred}/>}/>
            <Route exact path="/signup" element={<Signup signUpToast={signUpToast}/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
