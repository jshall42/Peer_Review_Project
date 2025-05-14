import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar, HomePage, LoginPage, RegistrationPage, ForgotPassword } from './components'

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
