import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>&copy; {currentYear} TechStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;