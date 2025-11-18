import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ProjectOverview from './components/ProjectOverview';
import Deliverables from './components/Deliverables';
import Methodology from './components/Methodology';
import Tools from './components/Tools';
import Results from './components/Results';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'overview':
        return <ProjectOverview />;
      case 'deliverables':
        return <Deliverables />;
      case 'methodology':
        return <Methodology />;
      case 'tools':
        return <Tools />;
      case 'results':
        return <Results />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Portfolio de Gouvernance des Données - PETROSEN | Décembre 2024 – Juillet 2025
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Data Manager / Data Steward
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
