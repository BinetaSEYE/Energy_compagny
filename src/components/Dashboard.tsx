import { useEffect, useState } from 'react';
import { TrendingUp, Target, Database, Users, ArrowUp } from 'lucide-react';
import { supabase, KPI } from '../lib/supabase';

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKPIs();
  }, []);

  const fetchKPIs = async () => {
    const { data, error } = await supabase
      .from('kpis')
      .select('*')
      .order('name');

    if (!error && data) {
      setKpis(data);
    }
    setLoading(false);
  };

  const getIcon = (index: number) => {
    const icons = [Database, TrendingUp, Target, Users];
    return icons[index] || Database;
  };

  const getColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-purple-500 to-purple-600',
    ];
    return colors[index] || colors[0];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de bord de la Gouvernance des Données
        </h2>
        <p className="text-gray-600">
          Indicateurs clés de performance | Décembre 2024 – Juillet 2025
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = getIcon(index);
          const colorClass = getColor(index);
          const progress = ((kpi.current_value - kpi.initial_value) / (kpi.target_value - kpi.initial_value)) * 100;

          return (
            <div
              key={kpi.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${colorClass} p-4`}>
                <Icon className="text-white" size={32} />
              </div>
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{kpi.name}</h3>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {kpi.current_value}
                      <span className="text-lg text-gray-500 ml-1">{kpi.unit}</span>
                    </div>
                    {kpi.improvement_percentage !== null && (
                      <div className="flex items-center text-green-600 text-sm font-medium mt-1">
                        <ArrowUp size={16} />
                        <span>+{kpi.improvement_percentage}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Initial: {kpi.initial_value}{kpi.unit}</span>
                    <span>Cible: {kpi.target_value}{kpi.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${colorClass} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-center text-gray-600 font-medium">
                    {progress.toFixed(0)}% de progression
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Impact Global</h3>
          <p className="text-3xl font-bold text-blue-600 mb-1">+45%</p>
          <p className="text-sm text-gray-600">
            Amélioration moyenne de la qualité et disponibilité des données
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Adoption</h3>
          <p className="text-3xl font-bold text-green-600 mb-1">27</p>
          <p className="text-sm text-gray-600">
            Utilisateurs formés aux bonnes pratiques de data stewardship
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Conformité</h3>
          <p className="text-3xl font-bold text-orange-600 mb-1">100%</p>
          <p className="text-sm text-gray-600">
            Alignement avec les référentiels DAMA-DMBOK
          </p>
        </div>
      </div>
    </div>
  );
}
