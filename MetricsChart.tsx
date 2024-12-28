import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TransportMetric } from '../types';

interface MetricsChartProps {
  metrics: TransportMetric[];
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ metrics }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !metrics.length) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear().range([height, 0]);

    x.domain(metrics.map((d) => d.metricName));
    y.domain([0, 10]);

    // Add bars
    svg
      .selectAll('.bar')
      .data(metrics)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.metricName)!)
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.score))
      .attr('height', (d) => height - y(d.score))
      .attr('fill', '#3B82F6')
      .attr('rx', 4);

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g').call(d3.axisLeft(y));

  }, [metrics]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Metrics Distribution</h3>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}
