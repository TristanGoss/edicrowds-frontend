import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <footer className="bg-black bg-opacity-80 text-gray-300 text-center p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-4">
          <Link to="/" className="hover:text-white">Splash</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/how" className="hover:text-white">How this Works</Link>
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/preview" className="hover:text-white">Preview</Link>          
        </div>
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-4">
        <br/>
        info@edinburghcrowds.co.uk<br/>
        © Edinburgh Crowds 2025
        </div>
      </footer>
    );
  }