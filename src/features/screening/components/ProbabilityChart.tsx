import React from 'react';
import type { ClassProbabilities } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  probabilities: ClassProbabilities;
}

export const ProbabilityChart: React.FC<Props> = ({ probabilities }) => {
  const data = [
    { name: 'No DR', value: probabilities['No DR'], color: '#0d9488' }, // teal-600
    { name: 'Mild', value: probabilities['Mild DR'], color: '#14b8a6' }, // teal-500
    { name: 'Moderate', value: probabilities['Moderate DR'], color: '#f59e0b' }, // amber-500
    { name: 'Severe', value: probabilities['Severe DR'], color: '#ef4444' }, // red-500
    { name: 'Proliferative', value: probabilities['Proliferative DR'], color: '#b91c1c' }, // red-700
  ];

  return (
    <div className="w-full h-72 mt-2">
      <h4 className="text-sm font-semibold text-ink-400 mb-6 uppercase tracking-widest">5-Class Probability Distribution</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 30, left: 60, bottom: 0 }}
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#7588b0', fontSize: 13, fontWeight: 500 }}
            dx={-10}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(26, 35, 58, 0.5)' }} // ink-800/50
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const val = typeof payload[0].value === 'number' ? payload[0].value : 0;
                return (
                  <div className="bg-ink-950 border border-ink-800 p-3 rounded-lg shadow-2xl text-sm backdrop-blur-md">
                    <span className="text-ink-300 font-medium">{payload[0].payload.name}: </span>
                    <span className="text-paper-50 font-bold tabular-nums ml-1">{val.toFixed(1)}%</span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
