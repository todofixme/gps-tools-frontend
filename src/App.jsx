import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Merge from './pages/Merge'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { UploadedFilesProvider } from './context/UploadedFilesContext'

function App() {
  return (
    <UploadedFilesProvider>
      <Router>
        <div className='flex flex-col justify-between h-screen'>
          <Navbar />
          <main className='container mx-auto px-3 pb-12'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/merge' element={<Merge />} />
              <Route path='/about' element={<About />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UploadedFilesProvider>
  )
}

export default App
