import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar, HomePage, LoginPage, RegistrationPage,
        ForgotPassword, TeacherView, CourseDashboard,
        EnrollmentTab} from './components'

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          {/* Genral Routes*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/registration" element={<RegistrationPage />} />

          {/*Teacher Routes */}
          <Route path="/teacher" element={<TeacherView />} />
          <Route path="/course/:id/*" element={<CourseDashboard />}>
            <Route path="enrollment" element={<EnrollmentTab />} />
            <Route path="assesment" element={<EnrollmentTab />} />
            <Route path="feedback" element={<EnrollmentTab />} />
            <Route index element={<EnrollmentTab />} />
          </Route>

          {/*Student Routes */}
          {/* <Route path="/student" element={<StudentView />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
