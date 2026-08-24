import { t } from '../../utils/translations';
import { T } from '../components/T';
import { AlertTriangle, CloudRain, Bell, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../../context/AppContext';

export default function Alerts() {
  const { profile } = useAppContext();
  
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected in next 24 hours in your area. Avoid applying fertilizers today.',
      time: '2 hours ago',
      icon: <CloudRain className="w-6 h-6" />,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      relevantFor: ['Farmer', 'Fisherman', 'Street Vendor']
    },
    {
      id: 2,
      type: 'danger',
      title: 'High Wind Warning',
      message: 'Wind speed exceeding 45 km/h. Not safe for sea ventures today.',
      time: '5 hours ago',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-100',
      relevantFor: ['Fisherman']
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheme Deadline',
      message: 'Last date to apply for PM-KISAN is approaching next week.',
      time: '1 day ago',
      icon: <Bell className="w-6 h-6" />,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      relevantFor: ['Farmer']
    },
    {
      id: 4,
      type: 'success',
      title: 'Market Opportunity',
      message: 'Demand for organic vegetables is high in nearby town market this weekend.',
      time: '2 days ago',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'text-primary-600',
      bg: 'bg-primary-50',
      border: 'border-primary-100',
      relevantFor: ['Farmer', 'Street Vendor']
    }
  ];

  const filteredAlerts = alerts.filter(a => a.relevantFor.includes(profile.persona || ''));

  return (
    <div className="space-y-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t("Important Alerts", profile.language)}</h1>
          <p className="text-slate-600">{t("Time-sensitive information for you.", profile.language)}</p>
        </div>
      </header>

      {filteredAlerts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No new alerts for you at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={alert.id}
              className={`p-6 rounded-3xl border ${alert.border} ${alert.bg} flex gap-4`}
            >
              <div className={`mt-1 ${alert.color}`}>
                {alert.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-lg ${alert.color}`}>{alert.title}</h3>
                  <span className="text-xs font-medium text-slate-500">{alert.time}</span>
                </div>
                <p className="text-slate-700">{alert.message}</p>
                
                <div className="mt-4 flex gap-3">
                  <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
                    Listen
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
                    Share
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