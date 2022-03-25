import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Download from './pages/Download'
import Home from './pages/Home'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/download/:fileId" element={<Download />} />
            </Routes>
        </Router>
    )
}

export default App
