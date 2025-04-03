// A variant of App.tsx that is used purely to prerender some pages for Google to index
// I wish I knew earlier that SPAs cause SEO problem like this!
import { Routes, Route } from "react-router-dom";
import './App.css';
import About from "./pages/About";
import TermsOfService from "./pages/Terms";
import Privacy from "./pages/Privacy";
import How from "./pages/How";
import Contact from "./pages/Contact";

export const AppPagesForPrerender = () => (
  <Routes>
    <Route path="/about" element={<About />} />
    <Route path="/terms" element={<TermsOfService />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/how" element={<How />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
)
