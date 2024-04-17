import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Merge from './pages/Merge'
import Track from './pages/Track'
import { FeedbackProvider } from './context/FeedbackContext'
import Feedback from './components/layout/Feedback'

const App = () => (
  <FeedbackProvider>
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <Feedback />
          <Routes>
            <Route path='/' element={<Merge />} />
            <Route path='/merge' element={<Merge />} />
            <Route path='/track/:id' element={<Track />} />
            <Route path='/about' element={<About />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </FeedbackProvider>
)

export default App
