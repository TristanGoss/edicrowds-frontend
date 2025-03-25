import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Splash from "./pages/Splash";
import About from "./pages/About";
import TermsOfService from "./pages/Terms";
import Privacy from "./pages/Privacy";
import How from "./pages/How";
import Preview from "./pages/Preview";
import Contact from "./pages/Contact";
import UmamiTracker from "./components/UmamiTracker";

export default function App() {
  return (
    <>
      <UmamiTracker />
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/how" element={<How />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}