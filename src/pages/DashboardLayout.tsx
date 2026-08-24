import { t } from '../utils/translations';
import { T } from '../components/T';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Bot, FileText, Lightbulb, Bell, Accessibility, User, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { useEffect } from 'react';

export default function DashboardLayout() {
  const { profile, isAccessibilityMode, setAccessibilityMode } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile.persona) {
      navigate('/onboarding');
    }
  }, [profile, navigate]);

  if (!profile.persona) return null;

  const navItems = [
    { to: '/dashboard', label: t('Home', profile.language), icon: <Home className="w-6 h-6" /> },
    { to: '/dashboard/assistant', label: t('AI Assistant', profile.language), icon: <Bot className="w-6 h-6" /> },
    { to: '/dashboard/schemes', label: t('Schemes', profile.language), icon: <FileText className="w-6 h-6" /> },
    { to: '/dashboard/opportunities', label: t('Opportunities', profile.language), icon: <Lightbulb className="w-6 h-6" /> },
    { to: '/dashboard/alerts', label: t('Alerts', profile.language), icon: <Bell className="w-6 h-6" /> },
    { to: '/dashboard/profile', label: t('Profile', profile.language), icon: <User className="w-6 h-6" /> },
  ];

  return (
    <div className={cn("min-h-screen bg-slate-50 flex flex-col md:flex-row", isAccessibilityMode && "text-xl font-bold")}>
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl">AI</div>
          <span className="text-xl font-bold text-primary-900">AI Saathi</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
                isActive ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button
            onClick={() => setAccessibilityMode(!isAccessibilityMode)}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors", isAccessibilityMode ? "bg-blue-100 text-blue-800" : "text-slate-600 hover:bg-slate-50")}
          >
            <Accessibility className="w-6 h-6" />
            {isAccessibilityMode ? 'Disable A11y' : 'Accessibility'}
          </button>
          <button onClick={() => navigate('/dashboard/profile')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-left">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold truncate text-slate-900">{profile.firstName || profile.persona}</div>
              <div className="text-xs text-slate-500 truncate">{profile.location}</div>
            </div>
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-6 h-6" />
            Exit
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0 min-h-screen relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-100 p-4 sticky top-0 z-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">AI</div>
             <span className="font-bold text-primary-900">AI Saathi</span>
          </div>
          <button onClick={() => setAccessibilityMode(!isAccessibilityMode)} className={cn("p-2 rounded-lg", isAccessibilityMode ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-600")}>
            <Accessibility className="w-5 h-5" />
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around p-2 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) => cn(
              "flex flex-col items-center p-2 rounded-lg text-xs font-medium transition-colors",
              isActive ? "text-primary-700" : "text-slate-500"
            )}
          >
            {({ isActive }) => (
              <>
                <div className={cn("p-1.5 rounded-full mb-1 transition-colors", isActive ? "bg-primary-100" : "bg-transparent")}>
                  {item.icon}
                </div>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}