import React from 'react'

const footerYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className='footer p-10 bg-gray-700 text-neutral-content footer-center'>
      <div>
        <p>Copyright &copy; {footerYear} All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
