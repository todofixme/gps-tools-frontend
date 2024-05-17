import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Feedback from './components/layout/Feedback'
import NotFoundScreen from './pages/NotFoundScreen'
import AboutScreen from './pages/AboutScreen'
import MergeScreen from './pages/MergeScreen'
import TrackScreen from './pages/TrackScreen'
import Providers from './components/services/providers'

const App = () => (
  <Providers>
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main className="container mx-auto px-3 pb-12">
          <Feedback />
          <Routes>
            <Route path="/" element={<MergeScreen />} />
            <Route path="/merge" element={<MergeScreen />} />
            <Route path="/track/:id" element={<TrackScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/*" element={<NotFoundScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </Providers>
)

export default App
