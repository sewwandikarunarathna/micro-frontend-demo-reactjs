import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <h1 className="text-2xl">404 - Page Not Found</h1>
    <Link to="/" className="text-blue-500">Go Home</Link>
    </>
    // <div className="text-center mt-10">
  // </div>
  )
}

export default NotFound
