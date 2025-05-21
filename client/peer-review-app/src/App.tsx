import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar, HomePage, LoginPage, RegistrationPage, ForgotPassword, TeacherView, StudentView } from './components'

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
          <Route path="/teacher" element={<TeacherView />} />
          <Route path="/student" element={<StudentView />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
