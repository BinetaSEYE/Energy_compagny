import { useEffect, useState } from 'react';
import { Calendar, Target, CheckCircle2 } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

export default function ProjectOverview() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      setProject(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return <div>Aucun projet trouvé</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar size={32} />
          <span className="text-lg font-medium">{project.period}</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
        <p className="text-xl text-blue-50">{project.description}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Contexte du Projet</h3>
        <p className="text-gray-700 leading-relaxed text-lg">{project.context}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Objectifs</h3>
          </div>
          <ul className="space-y-4">
            {project.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-gray-700 leading-relaxed">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Résultats</h3>
          </div>
          <ul className="space-y-4">
            {project.results.map((result, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700 leading-relaxed">{result}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Timeline du Projet</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          <div className="space-y-6">
            {[
              { date: 'Décembre 2024', title: 'Lancement du projet', desc: 'Diagnostic initial et cartographie des données' },
              { date: 'Janvier 2025', title: 'Conception', desc: 'Définition des politiques et du modèle de données' },
              { date: 'Février - Avril 2025', title: 'Implémentation', desc: 'Développement des outils et déploiement du catalogue' },
              { date: 'Mai - Juillet 2025', title: 'Formation & Adoption', desc: 'Ateliers utilisateurs et optimisation continue' }
            ].map((phase, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-0 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-sm font-semibold text-blue-600 mb-1">{phase.date}</div>
                  <div className="font-bold text-gray-900 mb-1">{phase.title}</div>
                  <div className="text-sm text-gray-600">{phase.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
