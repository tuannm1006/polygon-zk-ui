import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { DefaultFcProps } from 'common';
import clsx from 'clsx';
import { isEmpty } from 'ramda';

export type SmallLineChartProps = DefaultFcProps & {
  caption: string;
  value: number;
  data: {
    [key: string]: any,
  }[];
  dataLabel: string,
  dataKey: string,
  color: string;
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

export const SmallLineChart: React.FC<SmallLineChartProps> = ({
  caption,
  value,
  data,
  dataLabel,
  dataKey,
  className,
  color
}) => {
  const linearGradientId = color.replace('#', '')
  return (
    <div className={clsx(className, 'text-center p-6')}>
      <h2 className='text-[18px]'>{caption}</h2>
      <span className='text-[32px] font-bold text-white'>{isEmpty(data) ? '-' : value}</span>
      <div className='h-[150px]'>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}>
            <defs>
              <linearGradient
                id={linearGradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={.25} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey={dataLabel} axisLine={false} tickLine={false} interval={0} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} fillOpacity={1} fill={`url(#${linearGradientId})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
