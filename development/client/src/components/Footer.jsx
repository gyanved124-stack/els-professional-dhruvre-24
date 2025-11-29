// ========================================
// LEVEL 3: Footer Component
// Learning: Static components, links
// ========================================

import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>College Kit</h3>
          <p>Your Campus Community Hub</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/members">Members</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#" aria-label="GitHub">
              💻
            </a>
            <a href="#" aria-label="LinkedIn">
              💼
            </a>
            <a href="#" aria-label="Twitter">
              🐦
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} College Kit. All rights reserved.</p>
        <p>Built with React & ❤️</p>
      </div>
    </footer>
  );
}

export default Footer;

/*
🎓 LEARNING NOTES:

1. DYNAMIC YEAR:
   - new Date().getFullYear() gets current year
   - Updates automatically, no manual changes needed

2. SEMANTIC HTML:
   - <footer> tag for page footer
   - <nav> could be used for footer links
   - Improves accessibility and SEO

3. ARIA LABELS:
   - aria-label for icon-only links
   - Screen readers can announce link purpose
*/
