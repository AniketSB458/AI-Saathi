import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, HeartHandshake, Mic, WifiOff, Globe, BookOpen } from 'lucide-react';
import { useAppContext, Persona } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { loadDemoProfile } = useAppContext();
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
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">AI</div>
          <span className="text-xl font-semibold tracking-tight text-emerald-900">AI Saathi</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors hidden sm:block">Language: English</button>
          <Link to="/onboarding" className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-24 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            AI for Everyone. <br /> <span className="text-emerald-600">Opportunity for Everyone.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            AI Saathi brings trusted information, intelligent guidance and essential services closer to the communities that need them most.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/onboarding" className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200">
              Get Started
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto bg-white text-emerald-700 px-8 py-3.5 rounded-full text-base font-semibold border border-emerald-100 hover:bg-emerald-50 transition-all">
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Hackathon Demo Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-16 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 text-emerald-800">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-semibold text-lg">🎯 Hackathon Demo Mode</h3>
          </div>
          <p className="text-emerald-700 mb-6 text-sm">Experience the platform instantly with realistic personas.</p>
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
                className="bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200 py-3 px-4 rounded-xl text-sm font-medium transition-colors shadow-sm"
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
          <div><div className="text-3xl font-bold text-emerald-600 mb-1">7+</div><div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Languages</div></div>
          <div><div className="text-3xl font-bold text-emerald-600 mb-1">6</div><div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Community Profiles</div></div>
          <div><div className="text-3xl font-bold text-emerald-600 mb-1">100%</div><div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Voice-First AI</div></div>
          <div><div className="text-3xl font-bold text-emerald-600 mb-1">Ready</div><div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Low-Connectivity</div></div>
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
              { icon: <HeartHandshake className="w-6 h-6 text-emerald-400" />, title: 'Better Decisions', desc: 'AI-powered guidance for livelihood decisions.' },
              { icon: <Globe className="w-6 h-6 text-emerald-400" />, title: 'Local Languages', desc: 'Communicate naturally in regional languages.' },
              { icon: <Mic className="w-6 h-6 text-emerald-400" />, title: 'Accessible', desc: 'Voice and accessibility-first design.' },
              { icon: <WifiOff className="w-6 h-6 text-emerald-400" />, title: 'Low Connectivity', desc: 'Designed for unreliable internet.' },
              { icon: <BookOpen className="w-6 h-6 text-emerald-400" />, title: 'Public Services', desc: 'Simplifies access to government information.' },
              { icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, title: 'Trust & Responsible AI', desc: 'AI Saathi supports decisions. It does not replace professionals.' }
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