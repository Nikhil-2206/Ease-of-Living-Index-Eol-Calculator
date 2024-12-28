import React from 'react';
import { EoIScore } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ScoreCardProps {
  score: EoIScore;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  const isGoodScore = score.totalScore >= 7;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{score.cityName}</h3>
        {isGoodScore ? (
          <TrendingUp className="text-green-500 w-6 h-6" />
        ) : (
          <TrendingDown className="text-red-500 w-6 h-6" />
        )}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Score</span>
          <span className={`text-2xl font-bold ${
            isGoodScore ? 'text-green-500' : 'text-red-500'
          }`}>
            {score.totalScore.toFixed(1)}/10
          </span>
        </div>
        <div className="space-y-2">
          {score.metrics.map((metric) => (
            <div key={metric.metricName} className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{metric.metricName}</span>
              <span className="text-sm font-medium">{metric.score.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-400">
        Last updated: {new Date(score.timestamp).toLocaleDateString()}
      </div>
    </div>
  );
}
