import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';
import { CloudRain, Sun, AlertTriangle, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { profile } = useAppContext();

  const getGreeting = () => {
    switch (profile.language) {
      case 'Hindi': return 'नमस्ते';
      case 'Marathi': return 'नमस्कार';
      case 'Bengali': return 'নমস্কার';
      case 'Tamil': return 'வணக்கம்';
      default: return 'Hello';
    }
  };

  const isFarmer = profile.persona === 'Farmer';
  const isFisherman = profile.persona === 'Fisherman';

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{getGreeting()}!</h1>
        <p className="text-slate-600">Here is your update for {profile.location}.</p>
      </header>

      {/* Main AI CTA */}
      <Link to="/dashboard/assistant">
        <motion.div whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.97 }} className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ask AI Saathi anything</h2>
              <p className="text-emerald-100 mb-4 opacity-90">Tap to speak or type your question.</p>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                🎤 <span className="mr-1">{profile.language === 'Marathi' ? 'बोलून विचारा' : profile.language === 'Hindi' ? 'बोलकर पूछें' : 'Tap to Speak'}</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl">🤖</span>
            </div>
          </div>
        </motion.div>
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Weather / Env */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 text-lg">Local Conditions</h3>
            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">DEMO DATA</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            {isFisherman ? (
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Sun className="w-6 h-6" />
              </div>
            )}
            <div>
              <div className="text-2xl font-bold">{isFisherman ? 'High Wind' : '32°C'}</div>
              <div className="text-slate-500 text-sm">{isFisherman ? 'Avoid going to sea' : 'Sunny, clear skies'}</div>
            </div>
          </div>
          {isFarmer && (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm mt-4">
              <span className="font-semibold block mb-1">AI Recommendation:</span>
              Good weather for harvesting today. Expect rain in 2 days.
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center space-y-4">
          <h3 className="font-bold text-slate-900 text-lg mb-2">Quick Actions</h3>
          <Link to="/dashboard/schemes" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">🏛️</div>
              <span className="font-medium">Check Eligible Schemes</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>
          <Link to="/dashboard/opportunities" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-600"><TrendingUp className="w-5 h-5" /></div>
              <span className="font-medium">Market Opportunities</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}