import { useEffect, useState } from 'react';
import { Search, Lightbulb, Hammer, Users } from 'lucide-react';
import { supabase, MethodologyStep } from '../lib/supabase';

export default function Methodology() {
  const [steps, setSteps] = useState<MethodologyStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    const { data, error } = await supabase
      .from('methodology_steps')
      .select('*')
      .order('step_number');

    if (!error && data) {
      setSteps(data);
    }
    setLoading(false);
  };

  const getStepIcon = (stepNumber: number) => {
    const icons = [Search, Lightbulb, Hammer, Users];
    return icons[stepNumber - 1] || Search;
  };

  const getStepColor = (stepNumber: number) => {
    const colors = [
      { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
      { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
      { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
      { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
    ];
    return colors[stepNumber - 1] || colors[0];
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Méthodologie de Mise en Œuvre</h2>
        <p className="text-gray-600">
          Approche structurée en 4 phases pour garantir le succès du projet
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = getStepIcon(step.step_number);
            const colors = getStepColor(step.step_number);
            const isEven = index % 2 === 0;

            return (
              <div key={step.id} className={`relative ${isEven ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-left'}`}>
                <div className={`lg:absolute lg:top-0 ${isEven ? 'lg:right-0 lg:pr-12' : 'lg:left-0 lg:pl-12'} w-full lg:w-1/2`}>
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <div className={`inline-flex items-center space-x-3 ${colors.light} px-4 py-2 rounded-lg mb-4`}>
                      <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className="text-white" size={20} />
                      </div>
                      <span className={`font-bold ${colors.text}`}>Étape {step.step_number}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Activités clés :</h4>
                      <ul className="space-y-2">
                        {step.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start space-x-2">
                            <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full mt-2 flex-shrink-0`}></div>
                            <span className="text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2">
                  <div className={`w-16 h-16 ${colors.bg} rounded-full border-4 border-white shadow-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{step.step_number}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Cadre de Référence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-3">DAMA-DMBOK</h4>
            <p className="text-gray-600 mb-4">
              Alignement avec le référentiel international de gouvernance des données
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Data Governance Framework</li>
              <li>• Data Quality Management</li>
              <li>• Metadata Management</li>
              <li>• Data Security & Privacy</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-3">Bonnes Pratiques</h4>
            <p className="text-gray-600 mb-4">
              Standards et processus définis pour PETROSEN
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Définition des rôles et responsabilités</li>
              <li>• Processus de validation des données</li>
              <li>• Cycle de vie des données</li>
              <li>• Documentation et traçabilité</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
