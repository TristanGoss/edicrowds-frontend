import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <footer className="bg-black bg-opacity-80 text-gray-300 text-center p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-4">
          <Link to="/about" className="hover:text-white">About the Author</Link>
          <Link to="/how" className="hover:text-white">How this Works</Link>
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          info@edinburghcrowds.co.uk
        </div>
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-4">
        © Edinburgh Crowds 2025
        </div>
      </footer>
    );
  }