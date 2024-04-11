import { createRoutesFromElements, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Challenge from './pages/Challenge.tsx'
import Solution from './pages/Solution.tsx'
import App from './pages/App.tsx'
import LoginRedirect from './components/SignIn/LogInRedirect.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/register" element={<LoginRedirect />} />
    <Route path="/challenge/" element={<Challenge />} />
    <Route path="/challenge/:id" element={<Challenge />} />
    <Route path="/solution/" element={<Solution />} />
    <Route path="/solution/:id" element={<Solution />} />
  </Route>,
)

export default routes
