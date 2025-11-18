import { useEffect, useState } from 'react';
import { Package, CheckCircle2, FileText, Database, GraduationCap, Settings } from 'lucide-react';
import { supabase, Deliverable } from '../lib/supabase';

export default function Deliverables() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliverables();
  }, []);

  const fetchDeliverables = async () => {
    const { data, error } = await supabase
      .from('deliverables')
      .select('*')
      .order('category');

    if (!error && data) {
      setDeliverables(data);
    }
    setLoading(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Documentation':
        return FileText;
      case 'Architecture':
        return Database;
      case 'Technique':
        return Settings;
      case 'Plateforme':
        return Package;
      case 'Formation':
        return GraduationCap;
      default:
        return Package;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Documentation':
        return 'from-blue-500 to-blue-600';
      case 'Architecture':
        return 'from-purple-500 to-purple-600';
      case 'Technique':
        return 'from-orange-500 to-orange-600';
      case 'Plateforme':
        return 'from-green-500 to-green-600';
      case 'Formation':
        return 'from-pink-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const groupedDeliverables = deliverables.reduce((acc, deliverable) => {
    if (!acc[deliverable.category]) {
      acc[deliverable.category] = [];
    }
    acc[deliverable.category].push(deliverable);
    return acc;
  }, {} as Record<string, Deliverable[]>);

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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Livrables du Projet</h2>
        <p className="text-gray-600">
          7 livrables majeurs déployés avec succès
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedDeliverables).map(([category, items]) => {
          const Icon = getCategoryIcon(category);
          const colorClass = getCategoryColor(category);

          return items.map((deliverable) => (
            <div
              key={deliverable.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 duration-300"
            >
              <div className={`bg-gradient-to-r ${colorClass} p-6`}>
                <div className="flex items-center justify-between">
                  <Icon className="text-white" size={32} />
                  <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">{category}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{deliverable.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{deliverable.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progression</span>
                    <span className="font-bold text-gray-900">{deliverable.completion_percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${colorClass} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${deliverable.completion_percentage}%` }}
                    ></div>
                  </div>
                </div>

                {deliverable.completion_percentage === 100 && (
                  <div className="mt-4 flex items-center space-x-2 text-green-600">
                    <CheckCircle2 size={20} />
                    <span className="font-medium text-sm">Livré avec succès</span>
                  </div>
                )}
              </div>
            </div>
          ));
        })}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Projets Dérivés - Qualité</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Digitalisation de processus qualité',
              desc: 'Automatisation de la gestion des plans d\'action avec Power Apps'
            },
            {
              title: 'Dashboards Power BI',
              desc: 'Tableaux de bord de performance (audits, réclamations, usines)'
            },
            {
              title: 'Analyse des données',
              desc: 'Détection d\'anomalies et recommandations pour amélioration continue'
            },
            {
              title: 'Optimisation des workflows',
              desc: 'Automatisations avec Power Automate et audit des temps'
            }
          ].map((project, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-1">{project.title}</h4>
              <p className="text-sm text-gray-600">{project.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
