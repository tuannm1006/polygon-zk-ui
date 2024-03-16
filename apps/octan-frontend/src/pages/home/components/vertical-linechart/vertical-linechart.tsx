import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { DefaultFcProps } from 'common';
import clsx from 'clsx';
import { isEmpty } from 'ramda';

export type VerticalLineChartProps = DefaultFcProps & {
  data: {
    [key: string]: any;
  }[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white rounded p-3">
        <p className="label">{payload[0].payload.timeDisplay}</p>
        <p className="font-bold">{payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export const VerticalLineChart: React.FC<VerticalLineChartProps> = ({ data, className }) => {
  return (
    <div className={clsx(className, 'text-center p-6')}>
      <span className="text-[32px] font-bold text-white">""</span>
      <div className="h-[512px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
