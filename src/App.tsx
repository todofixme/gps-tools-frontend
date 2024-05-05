import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { FeedbackProvider } from './components/services/context/FeedbackContext.tsx'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Feedback from './components/layout/Feedback'
import NotFoundScreen from './pages/NotFoundScreen.tsx'
import AboutScreen from './pages/AboutScreen.tsx'
import MergeScreen from './pages/MergeScreen.tsx'
import TrackScreen from './pages/TrackScreen.tsx'

const App = () => (
  <FeedbackProvider>
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <Feedback />
          <Routes>
            <Route path='/' element={<MergeScreen />} />
            <Route path='/merge' element={<MergeScreen />} />
            <Route path='/track/:id' element={<TrackScreen />} />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/*' element={<NotFoundScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </FeedbackProvider>
)

export default App
