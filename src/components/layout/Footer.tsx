const footerYear = new Date().getFullYear()

const Footer = () => (
  <footer className="footer p-3 bg-footer text-base-content footer-center">
    <p>Copyright &copy; {footerYear} All rights reserved</p>
  </footer>
)

export default Footer
