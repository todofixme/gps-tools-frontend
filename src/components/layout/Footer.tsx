const footerYear = new Date().getFullYear()

const Footer = () => (
  <footer className='footer p-10 bg-base-300 text-base-content footer-center'>
    <div>
      <p>Copyright &copy; {footerYear} All rights reserved</p>
    </div>
  </footer>
)

export default Footer
