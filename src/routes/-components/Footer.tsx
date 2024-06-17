const footerYear = new Date().getFullYear()

const Footer = () => (
  <footer
    role="none"
    className="footer p-3 bg-footer text-base-content footer-center fixed bottom-0"
  >
    <p>Copyright &copy; {footerYear} All rights reserved</p>
  </footer>
)

export default Footer
