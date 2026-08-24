import { t } from '../../utils/translations';
import { T } from '../components/T';
import { TrendingUp, DollarSign, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../../context/AppContext';

export default function Opportunities() {
  const { profile } = useAppContext();

  return (
    <div className="space-y-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t("Grow & Opportunities", profile.language)}</h1>
          <p className="text-slate-600">{t("Smart insights to improve your livelihood.", profile.language)}</p>
        </div>
      </header>

      {profile.persona === 'Artisan' || profile.persona === 'Street Vendor' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t("Smart Pricing", profile.language)}</h3>
            <p className="text-slate-600 mb-4">{t("Based on local demand, suggested selling price for your current product is slightly higher.", profile.language)}</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-sm text-slate-500 mb-1">{t("Suggested Range", profile.language)}</div>
              <div className="text-2xl font-bold text-primary-600">₹150 - ₹180</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Demand Insight</h3>
            <p className="text-slate-600 mb-4">Upcoming local festival in 2 weeks. Demand for decorative items and sweets will increase by 40%.</p>
            <button className="text-primary-600 font-semibold flex items-center gap-2 hover:underline">
              Ask AI for preparation tips →
            </button>
          </motion.div>
        </div>
      ) : profile.persona === 'Farmer' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Crop Advisor</h3>
            <p className="text-slate-600 mb-4">Based on recent rain patterns in {profile.location}, short-duration pulses are highly recommended for the next sowing cycle.</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-900">Suggested: Green Gram (Moong)</div>
              <div className="text-sm text-slate-500 mt-1">Duration: 60-65 days • Low water need</div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
          <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">More insights coming soon</h3>
          <p className="text-slate-600">We are gathering market data for your occupation.</p>
        </div>
      )}
    </div>
  );
}