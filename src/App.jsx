import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Splash from "./pages/Splash";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import How from "./pages/How";
import Preview from "./pages/Preview";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/how" element={<How />} />
        <Route path="/preview" element={<Preview />} />        
      </Routes>
    </Router>
  );
}