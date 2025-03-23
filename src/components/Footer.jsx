import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const current = location.pathname;

  const linkClass = (path) =>
    `internal-link ${current === path ? "internal-link-active" : ""}`;

  return (
    <footer className="footer">
      <div className="footer-links">
        © Edinburgh Crowds 2025
        <Link to="/terms" className={linkClass("/terms")}>Terms of Service</Link>
        <Link to="/privacy" className={linkClass("/privacy")}>Privacy Policy</Link>
        <a
          href="https://www.buymeacoffee.com/edinburghcrowds"
          target="_blank"
          rel="noopener noreferrer"
          className="internal-link"
        >
          Support The Project
        </a>
        <a href="mailto:info@edinburghcrowds.co.uk" className="internal-link">info@edinburghcrowds.co.uk</a>

      </div>
    </footer>
  );
}