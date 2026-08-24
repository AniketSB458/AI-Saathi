import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/dashboard/Home';
import AiAssistant from './pages/dashboard/AiAssistant';
import Schemes from './pages/dashboard/Schemes';
import Opportunities from './pages/dashboard/Opportunities';
import Alerts from './pages/dashboard/Alerts';
import Profile from './pages/dashboard/Profile';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="assistant" element={<AiAssistant />} />
            <Route path="schemes" element={<Schemes />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
