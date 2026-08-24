import { t } from '../utils/translations';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, HeartHandshake, Mic, WifiOff, Globe, BookOpen } from 'lucide-react';
import { useAppContext, Persona, Language } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { profile, setProfile, loadDemoProfile } = useAppContext();
  const navigate = useNavigate();

  const handleDemo = (persona: Persona) => {
    loadDemoProfile(persona);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">AI</div>
          <span className="text-xl font-semibold tracking-tight text-primary-900">AI Saathi</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary-700 transition-colors">
            <Globe className="w-4 h-4" />
            <select 
              value={profile.language}
              onChange={(e) => setProfile({ ...profile, language: e.target.value as Language })}
              className="bg-transparent outline-none cursor-pointer appearance-none"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Marathi">मराठी (Marathi)</option>
              <option value="Bengali">বাংলা (Bengali)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>
          <Link to="/onboarding" className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors">
            {t("Get Started", profile.language)}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-24 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto space-y-8">
          <motion.h1 
            initial="initial"
            whileHover="hover"
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight flex flex-col items-center cursor-default"
          >
            <span className="flex gap-2">
              {t("AI for Everyone.", profile.language).split(" ").map((word, i) => (
                <motion.span
                  key={`w1-${i}`}
                  variants={{
                    initial: { y: 0 },
                    hover: { y: [0, -8, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 } }
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="text-primary-600 flex gap-2 mt-2">
              {t("Opportunity for Everyone.", profile.language).split(" ").map((word, i) => (
                <motion.span
                  key={`w2-${i}`}
                  variants={{
                    initial: { y: 0 },
                    hover: { y: [0, -8, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: (3 + i) * 0.15 } }
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t("AI Saathi brings trusted information, intelligent guidance and essential services closer to the communities that need them most.", profile.language)}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/onboarding" className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-200">
              {t("Get Started", profile.language)}
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto bg-white text-primary-700 px-8 py-3.5 rounded-full text-base font-semibold border border-primary-100 hover:bg-primary-50 transition-all">
              {t("How It Works", profile.language)}
            </a>
          </div>
        </motion.div>

        {/* Quick Start Profiles */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-16 p-6 bg-primary-50 rounded-2xl border border-primary-100 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 text-primary-800">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-semibold text-lg">{t("Quick Start Profiles", profile.language)}</h3>
          </div>
          <p className="text-primary-700 mb-6 text-sm">{t("Select a profile to instantly explore tailored services and guidance.", profile.language)}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'Farmer', label: 'Farmer (Marathi)' },
              { id: 'Fisherman', label: 'Fisherman' },
              { id: 'Artisan', label: 'Artisan (Hindi)' },
              { id: 'Street Vendor', label: 'Street Vendor' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handleDemo(p.id as Persona)}
                className="bg-white hover:bg-primary-100 text-primary-900 border border-primary-200 py-3 px-4 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                {p.label}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Impact Stats */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
          <div><div className="text-3xl font-bold text-primary-600 mb-1">7+</div><div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t("Languages", profile.language)}</div></div>
          <div><div className="text-3xl font-bold text-primary-600 mb-1">6</div><div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t("Community Profiles", profile.language)}</div></div>
          <div><div className="text-3xl font-bold text-primary-600 mb-1">100%</div><div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t("Voice-First AI", profile.language)}</div></div>
          <div><div className="text-3xl font-bold text-primary-600 mb-1">Ready</div><div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t("Low-Connectivity", profile.language)}</div></div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-600">A simple, 4-step process designed for everyone.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Tell Us About You', desc: 'Select occupation and location.' },
            { step: '02', title: 'Ask Naturally', desc: 'Speak, type or upload an image.' },
            { step: '03', title: 'AI Understands', desc: 'AI analyzes the request using context.' },
            { step: '04', title: 'Get Actionable Help', desc: 'Receive a simple recommendation.' }
          ].map((s, i) => (
            <div key={i} className="relative p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl font-bold text-slate-100 absolute top-4 right-6">{s.step}</div>
              <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-2 relative z-10">{s.title}</h3>
              <p className="text-slate-600 relative z-10">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Designed for Inclusion */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Designed for Inclusion</h2>
            <p className="text-slate-400">Bringing opportunity to the underserved.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <HeartHandshake className="w-6 h-6 text-primary-400" />, title: 'Better Decisions', desc: 'AI-powered guidance for livelihood decisions.' },
              { icon: <Globe className="w-6 h-6 text-primary-400" />, title: 'Local Languages', desc: 'Communicate naturally in regional languages.' },
              { icon: <Mic className="w-6 h-6 text-primary-400" />, title: 'Accessible', desc: 'Voice and accessibility-first design.' },
              { icon: <WifiOff className="w-6 h-6 text-primary-400" />, title: 'Low Connectivity', desc: 'Designed for unreliable internet.' },
              { icon: <BookOpen className="w-6 h-6 text-primary-400" />, title: 'Public Services', desc: 'Simplifies access to government information.' },
              { icon: <ShieldCheck className="w-6 h-6 text-primary-400" />, title: 'Trust & Responsible AI', desc: 'AI Saathi supports decisions. It does not replace professionals.' }
            ].map((f, i) => (
              <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}