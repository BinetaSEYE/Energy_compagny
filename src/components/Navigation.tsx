import { BarChart3, BookOpen, Target, Package, Wrench, TrendingUp } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'overview', label: 'Vue d\'ensemble', icon: BookOpen },
    { id: 'deliverables', label: 'Livrables', icon: Package },
    { id: 'methodology', label: 'Méthodologie', icon: Target },
    { id: 'tools', label: 'Technologies', icon: Wrench },
    { id: 'results', label: 'Résultats', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">PETROSEN</h1>
              <p className="text-xs text-gray-500">Data Governance Portfolio</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
