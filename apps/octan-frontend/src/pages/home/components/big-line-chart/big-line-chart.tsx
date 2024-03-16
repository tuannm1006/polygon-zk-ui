import clsx from 'clsx';
import { DefaultFcProps } from 'common';
import { useAppContext } from 'contexts';
import { useEffect } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  Legend,
  Line,
} from 'recharts';
import { getStatisticChartDashboard } from 'services';

const CustomizedAxisTick = ({ x, y, stroke, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        // transform="rotate(-35)"
        fontSize="0.5em">
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white rounded p-3">
        <p className="label">{payload[0].payload.timeDisplay}</p>
        <p className="font-bold text-center">{payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export type BigLineChartProps = DefaultFcProps & {
  caption: string;
  data: {
    [key: string]: any;
  }[];
  color: string;
};

const dummyData = [
  {
    address: ['0xa8138d04a52e36936eecd39b7b856fe8940cb3a5', '0xfa500178de024bf43cfa69b7e636a28ab68f2741'],
    reputation_score: 0,
    timestamp: 0,
  },
  {
    address: ['0xa8138d04a52e36936eecd39b7b856fe8940cb3a5', '0xfa500178de024bf43cfa69b7e636a28ab68f2741'],
    reputation_score: 0,
    timestamp: 0,
  },
];
export const BigLineChart: React.FC<BigLineChartProps> = ({ caption, data, className, color }) => {
  return (
    <div className={clsx(className, 'p-6')}>
      {/*<h2 className="mb-3 font-bold">{caption}</h2>*/}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            // layout="vertical"
            width={500}
            height={300}
            data={data.length > 0 ? data : dummyData}
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis dataKey="reputation_score" />

            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="reputation_score" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
          </LineChart>
        </ResponsiveContainer>
        {/* <AreaChart width={500} height={300} data={data}>
            <CartesianGrid vertical={false} strokeDasharray="4" />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="timeDisplay"
              // dataKey="index"
              tickLine={false}
              tick={<CustomizedAxisTick />}
            />
            <YAxis axisLine={false} />
            <Tooltip content={<CustomTooltip />}></Tooltip>
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  );
};
