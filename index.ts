export interface TransportMetric {
  metricName: string;
  score: number;
  weight: number;
}

export interface EoIScore {
  totalScore: number;
  metrics: TransportMetric[];
  cityName: string;
  timestamp: string;
}
