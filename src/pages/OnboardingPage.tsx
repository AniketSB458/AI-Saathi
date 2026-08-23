import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAppContext, Persona, Language } from '../context/AppContext';
import { Leaf, Fish, Scissors, Store, Accessibility, User } from 'lucide-react';

export default function OnboardingPage() {
  const { profile, setProfile } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [localProfile, setLocalProfile] = useState(profile);

  const personas = [
    { id: 'Farmer', label: 'Farmer', icon: <Leaf className="w-8 h-8" /> },
    { id: 'Fisherman', label: 'Fisherman', icon: <Fish className="w-8 h-8" /> },
    { id: 'Artisan', label: 'Artisan', icon: <Scissors className="w-8 h-8" /> },
    { id: 'Street Vendor', label: 'Street Vendor', icon: <Store className="w-8 h-8" /> },
    { id: 'Person with Disability', label: 'Person with Disability', icon: <Accessibility className="w-8 h-8" /> },
    { id: 'Citizen', label: 'Citizen', icon: <User className="w-8 h-8" /> }
  ];

  const languages = ['English', 'Hindi', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Kannada'];

  const handleNext = () => {
    if (step === 1 && localProfile.persona) setStep(2);
    else if (step === 2 && localProfile.location) setStep(3);
    else if (step === 3 && localProfile.language) {
      setProfile(localProfile);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xl w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i <= step ? 'w-8 bg-emerald-600' : 'w-4 bg-slate-200'}`} />
            ))}
          </div>
          <button onClick={() => navigate('/')} className="text-sm text-slate-500 hover:text-slate-700">Cancel</button>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">How can AI Saathi help you?</h2>
            <p className="text-slate-600 mb-8">Select your occupation to personalize your experience.</p>
            <div className="grid grid-cols-2 gap-4">
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setLocalProfile({ ...localProfile, persona: p.id as Persona })}
                  className={`p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center transition-all border-2 ${localProfile.persona === p.id ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-600 hover:border-emerald-200 hover:bg-slate-50'}`}
                >
                  {p.icon}
                  <span className="font-semibold">{p.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Where are you located?</h2>
            <p className="text-slate-600 mb-8">This helps us find local schemes and weather.</p>
            <input
              type="text"
              placeholder="e.g. Pune, Maharashtra"
              value={localProfile.location}
              onChange={(e) => setLocalProfile({ ...localProfile, location: e.target.value })}
              className="w-full text-xl p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-600 focus:outline-none mb-8"
              autoFocus
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Choose your language</h2>
            <p className="text-slate-600 mb-8">You can change this later.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocalProfile({ ...localProfile, language: lang as Language })}
                  className={`p-4 rounded-xl font-semibold transition-all border-2 ${localProfile.language === lang ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-600 hover:border-emerald-200 hover:bg-slate-50'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !localProfile.persona) ||
              (step === 2 && !localProfile.location) ||
              (step === 3 && !localProfile.language)
            }
            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {step === 3 ? 'Start Using AI Saathi' : 'Continue'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}