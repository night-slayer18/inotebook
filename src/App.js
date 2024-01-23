import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
