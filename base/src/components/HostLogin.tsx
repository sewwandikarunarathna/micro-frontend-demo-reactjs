import  { lazy } from 'react'
const AuthLoginModule = lazy(() => import('auth/Login'));  

const HostLogin = () => {
  return (
    <div>
      Our Main Login Page
      <AuthLoginModule />
    </div>
  )
}

export default HostLogin
