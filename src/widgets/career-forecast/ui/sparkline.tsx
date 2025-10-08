import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: { year: number; value: number }[];
  color: string;
}

export const Sparkline = ({ data, color }: SparklineProps) => (
  <div className="w-20 h-8 opacity-80 hover:opacity-100 transition-opacity">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2} 
          dot={false}
          
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);