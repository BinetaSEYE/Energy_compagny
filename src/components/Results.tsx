import { TrendingUp, Award, Users, Shield, Zap, CheckCircle2 } from 'lucide-react';

export default function Results() {
  const achievements = [
    {
      icon: TrendingUp,
      title: 'Amélioration de la Qualité',
      value: '+45%',
      description: 'Amélioration mesurée de la qualité et disponibilité des données',
      color: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Adoption Utilisateurs',
      value: '27',
      description: 'Utilisateurs formés aux bonnes pratiques de data stewardship',
      color: 'from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Conformité DAMA',
      value: '100%',
      description: 'Alignement complet avec les référentiels DAMA-DMBOK',
      color: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Sources Intégrées',
      value: '8',
      description: 'Sources de données interfacées et consolidées',
      color: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const impacts = [
    {
      title: 'Catalogue Centralisé',
      description: 'Adoption d\'un catalogue centralisé pour le suivi du cycle de vie des données',
      icon: CheckCircle2
    },
    {
      title: 'Écosystème Durable',
      description: 'Création d\'un écosystème de gestion durable et d\'une meilleure collaboration IT/métier',
      icon: CheckCircle2
    },
    {
      title: 'Processus Standardisés',
      description: 'Mise en place de processus standardisés pour la qualité des données',
      icon: CheckCircle2
    },
    {
      title: 'Culture Data',
      description: 'Promotion d\'une culture de la donnée au sein de l\'organisation',
      icon: CheckCircle2
    }
  ];

  const futureProjects = [
    {
      title: 'IA & Machine Learning',
      description: 'Utilisation des données gouvernées pour des modèles prédictifs',
      icon: Zap,
      status: 'Planifié'
    },
    {
      title: 'Data Mesh Architecture',
      description: 'Décentralisation de la gouvernance par domaine métier',
      icon: Shield,
      status: 'En étude'
    },
    {
      title: 'Real-time Analytics',
      description: 'Dashboards temps réel pour la prise de décision rapide',
      icon: TrendingUp,
      status: 'Planifié'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Résultats & Impact</h2>
        <p className="text-gray-600">
          Synthèse des accomplissements et de la valeur créée
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 duration-300"
            >
              <div className={`bg-gradient-to-r ${achievement.color} p-4`}>
                <Icon className="text-white" size={32} />
              </div>
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{achievement.title}</h3>
                <div className={`text-4xl font-bold ${achievement.textColor} mb-3`}>
                  {achievement.value}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{achievement.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Impact Organisationnel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="text-green-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{impact.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{impact.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparaison Avant / Après</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-900">Indicateur</th>
                <th className="text-center py-3 px-4 font-bold text-gray-900">Avant</th>
                <th className="text-center py-3 px-4 font-bold text-gray-900">Cible</th>
                <th className="text-center py-3 px-4 font-bold text-gray-900">Résultat</th>
                <th className="text-center py-3 px-4 font-bold text-gray-900">Progression</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Qualité des données', before: '55%', target: '80%', result: '79%', progress: '+45%' },
                { name: 'Disponibilité des données', before: '60%', target: '90%', result: '88%', progress: '+47%' },
                { name: 'Sources interfacées', before: '3', target: '8', result: '8', progress: '+167%' },
                { name: 'Utilisateurs formés', before: '0', target: '25', result: '27', progress: '+100%' }
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-900">{row.name}</td>
                  <td className="text-center py-4 px-4 text-gray-600">{row.before}</td>
                  <td className="text-center py-4 px-4 text-gray-600">{row.target}</td>
                  <td className="text-center py-4 px-4 font-bold text-blue-600">{row.result}</td>
                  <td className="text-center py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {row.progress}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Perspectives & Évolutions Futures</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
                  {project.status}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{project.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Conclusion</h3>
        <p className="text-lg text-blue-50 leading-relaxed max-w-3xl mx-auto">
          Le projet de gouvernance des données chez PETROSEN a permis de créer un cadre solide et durable
          pour la gestion des données de simulation. Les résultats dépassent les objectifs initiaux avec
          une amélioration significative de la qualité, une adoption réussie par les équipes, et la mise
          en place d'une culture data qui bénéficiera à l'organisation sur le long terme.
        </p>
      </div>
    </div>
  );
}
