import { t } from '../../utils/translations';
import { T } from '../components/T';
import { useAppContext } from '../../context/AppContext';
import { User, MapPin, Globe, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { profile } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t("Your Profile", profile.language)}</h1>
        <p className="text-slate-600">{t("Manage your persona and preferences.", profile.language)}</p>
      </header>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8">
        
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
           <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 shrink-0">
             <User className="w-10 h-10" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-slate-900">{profile.firstName || 'User'}</h2>
             <p className="text-slate-500 font-medium">{profile.persona} • {profile.phoneNo}</p>
           </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-1">Location / State</h3>
              <p className="text-lg font-medium text-slate-900">{profile.location || 'Not specified'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-1">Preferred Language</h3>
              <p className="text-lg font-medium text-slate-900">{profile.language || 'English'}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 mb-1">Digital Literacy Level</h3>
              <p className="text-lg font-medium text-slate-900">Beginner (Optimized UI active)</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
           <button 
             onClick={() => navigate('/onboarding')}
             className="flex-1 bg-primary-50 text-primary-700 font-semibold py-3 px-6 rounded-xl hover:bg-primary-100 transition-colors"
           >
             Edit Profile
           </button>
           <button 
             onClick={() => navigate('/')}
             className="flex-1 bg-red-50 text-red-600 font-semibold py-3 px-6 rounded-xl hover:bg-red-100 transition-colors"
           >
             Sign Out
           </button>
        </div>

      </div>
    </div>
  );
}
