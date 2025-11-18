import { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { supabase, Tool } from '../lib/supabase';

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('category');

    if (!error && data) {
      setTools(data);
    }
    setLoading(false);
  };

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Icons.Box;
    const Icon = (Icons as any)[iconName];
    return Icon || Icons.Box;
  };

  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Data':
        return { bg: 'from-blue-500 to-blue-600', border: 'border-blue-200', light: 'bg-blue-50' };
      case 'ETL / Simulation':
        return { bg: 'from-green-500 to-green-600', border: 'border-green-200', light: 'bg-green-50' };
      case 'Collaboration':
        return { bg: 'from-orange-500 to-orange-600', border: 'border-orange-200', light: 'bg-orange-50' };
      case 'Gouvernance':
        return { bg: 'from-purple-500 to-purple-600', border: 'border-purple-200', light: 'bg-purple-50' };
      default:
        return { bg: 'from-gray-500 to-gray-600', border: 'border-gray-200', light: 'bg-gray-50' };
    }
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Technologies & Outils</h2>
        <p className="text-gray-600">
          Stack technologique complet pour la gouvernance des données
        </p>
      </div>

      {Object.entries(groupedTools).map(([category, categoryTools]) => {
        const colors = getCategoryColor(category);

        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`h-1 flex-grow bg-gradient-to-r ${colors.bg} rounded-full`}></div>
              <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
              <div className={`h-1 flex-grow bg-gradient-to-l ${colors.bg} rounded-full`}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryTools.map((tool) => {
                const Icon = getIcon(tool.icon);

                return (
                  <div
                    key={tool.id}
                    className={`bg-white rounded-xl p-6 border-2 ${colors.border} hover:shadow-lg transition-all hover:scale-105 duration-300`}
                  >
                    <div className={`w-14 h-14 ${colors.light} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="text-gray-700" size={28} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{tool.name}</h4>
                    {tool.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Architecture Technique</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icons.Database className="text-blue-600" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-3">Collecte & Stockage</h4>
            <p className="text-sm text-gray-600 mb-3">
              Ingestion des données depuis multiples sources (CMG, Fluent, bases internes)
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">SQL</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Python</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Pandas</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icons.Settings className="text-green-600" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-3">Traitement & Qualité</h4>
            <p className="text-sm text-gray-600 mb-3">
              Validation, nettoyage et enrichissement des données avec audits automatisés
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">ETL</span>
              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Audit Scripts</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icons.BarChart3 className="text-orange-600" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-3">Visualisation & Partage</h4>
            <p className="text-sm text-gray-600 mb-3">
              Dashboards interactifs et catalogue de données pour tous les utilisateurs
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">Power BI</span>
              <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">Azure Catalog</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
