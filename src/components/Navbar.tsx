import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const current = location.pathname;

  const linkClass = (path) =>
    `internal-link ${current === path ? "internal-link-active" : ""}`;

  const mobileLinkClass = (path) =>
    `block internal-link ${current === path ? "internal-link-active" : ""}`;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Edinburgh Crowds</Link>
        <button
          onClick={() => setOpen(!open)}
          className="menu-toggle-button"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/about" className={linkClass("/about")}>About</Link>
          <Link to="/preview" className={linkClass("/preview")}>Preview</Link>
          <Link to="/how" className={linkClass("/how")}>How it works</Link>
          <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
        </div>
      </div>

      <div
        className={`mobile-menu overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link to="/" className={mobileLinkClass("/")}>Home</Link>
        <Link to="/about" className={mobileLinkClass("/about")}>About</Link>
        <Link to="/preview" className={mobileLinkClass("/preview")}>Preview</Link>
        <Link to="/how" className={mobileLinkClass("/how")}>How it works</Link>
        <Link to="/contact" className={mobileLinkClass("/contact")}>Contact</Link>
      </div>
    </nav>
  );
}