import { lazy, Suspense } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import HostLogin from './components/HostLogin';


const Home  = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const NotFound = lazy(() => import('./components/NotFound'));
const MatTable = lazy(() => import('./components/MatTable'));

function App() {

  return (
    <div>
    <nav className="p-4 bg-gray-200 flex gap-4 fixed top-0">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/authLogin">Login</Link>
      <Link to="/table">Table</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
      <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>} />
      <Route path="/authLogin" element={<Suspense fallback={<div>Loading...</div>}><HostLogin /></Suspense>} />
      <Route path="/table" element={<Suspense fallback={<div>Loading...</div>}><MatTable /></Suspense>} />
    </Routes>
  </div>
  )
}

export default App
