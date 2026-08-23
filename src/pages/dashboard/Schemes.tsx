import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Loader2, FileText, CheckCircle, Info, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface Scheme {
  name: string;
  whoCanApply: string;
  mainBenefit: string;
  documents: string[];
  process: string;
  confidence: string;
}

export default function Schemes() {
  const { profile } = useAppContext();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await fetch('/api/schemes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            persona: profile.persona,
            state: profile.location,
            age: '30-40', // default for demo
            language: profile.language
          })
        });
        if (!res.ok) {
          throw new Error('Server returned an error');
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setSchemes(data);
        } else {
          setSchemes([]);
          setError('Failed to parse schemes.');
        }
      } catch (err) {
        setError('Failed to load schemes.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchemes();
  }, [profile]);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Government Schemes</h1>
        <p className="text-slate-600 mb-4">AI-recommended schemes intelligently matched to your profile.</p>
        
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-sm font-semibold border border-blue-100">
            <UserIcon className="w-4 h-4" />
            Filtering for: {profile.persona}
          </span>
          {profile.location && (
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-sm font-semibold border border-blue-100">
              <MapPin className="w-4 h-4" />
              State: {profile.location}
            </span>
          )}
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="font-medium text-lg">Finding the best schemes for you...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
          {error}
        </div>
      ) : schemes.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-sm">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Schemes Found</h3>
          <p className="text-slate-500">We couldn't find any specific schemes matching your profile right now.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {schemes.map((scheme, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-slate-900 flex-1 pr-4">{scheme.name}</h2>
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                    <CheckCircle className="w-3 h-3" />
                    {scheme.confidence} Match
                  </span>
                </div>
                
                <p className="text-lg text-slate-700 mb-6">{scheme.mainBenefit}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-emerald-600" /> Who Can Apply?
                    </h3>
                    <p className="text-slate-600 text-sm">{scheme.whoCanApply}</p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" /> Required Documents
                    </h3>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                      {scheme.documents.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                   <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Info className="w-4 h-4" />
                      <span>{scheme.process}</span>
                   </div>
                   <button className="w-full sm:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
                     How to Apply
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}