import React, { useState } from 'react';
import { ScoreCard } from './components/ScoreCard';
import { MetricsChart } from './components/MetricsChart';
import { EoIScore } from './types';
import { Calculator } from 'lucide-react';

// Sample data - In a real app, this would come from an API
const sampleScore: EoIScore = {
  totalScore: 7.5,
  cityName: "Sample City",
  timestamp: new Date().toISOString(),
  metrics: [
    { metricName: "Public Transport Access", score: 8.0, weight: 0.3 },
    { metricName: "Traffic Congestion", score: 7.0, weight: 0.2 },
    { metricName: "Road Quality", score: 7.8, weight: 0.2 },
    { metricName: "Walkability", score: 8.2, weight: 0.15 },
    { metricName: "Cycling Infrastructure", score: 6.5, weight: 0.15 }
  ]
};

function App() {
  const [score] = useState<EoIScore>(sampleScore);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3">
            <Calculator className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Ease of Living Index Calculator</h1>
          </div>
          <p className="mt-2 text-blue-100">Transportation Domain Analysis</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Current Score</h2>
            <ScoreCard score={score} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Metrics Analysis</h2>
            <MetricsChart metrics={score.metrics} />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About the Transportation EoI</h2>
          <p className="text-gray-600 leading-relaxed">
            The Transportation Domain of the Ease of Living Index evaluates various aspects of urban mobility and accessibility. 
            Key metrics include public transport coverage, traffic conditions, road infrastructure quality, and support for 
            sustainable transportation options like walking and cycling. These factors significantly impact residents' quality 
            of life and city sustainability.
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            © {new Date().getFullYear()} EoI Calculator. Data is for demonstration purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
