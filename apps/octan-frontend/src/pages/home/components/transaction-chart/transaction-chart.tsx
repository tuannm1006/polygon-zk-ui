import { DefaultFcProps } from "common";
import { chartOptions } from "../../data";
import { useMemo } from "react";
import { Panel } from "shared-components";
import { SmallLineChart } from "../small-line-chart";
import clsx from "clsx";
import { pathOr } from "ramda";
import { useAppContext } from "contexts";
import { DataKeys } from "consts";

export type TransactionChartProps = DefaultFcProps & {
  data: any[],
  onClick?: () => void,
};

export const TransactionChart: React.FC<TransactionChartProps> = ({
  className,
  data,
  onClick
}) => {
  const { loggedIn } = useAppContext()
  const total = useMemo(() => data.reduce((a, b) => a + Number(b.value), 0), [data]);

  return (
    <Panel className={clsx(className, 'relative')} onClick={onClick}>
      <SmallLineChart
        caption={chartOptions[DataKeys.total_transactions].caption}
        value={total}
        data={data}
        dataLabel="index"
        dataKey="value"
        color={chartOptions[DataKeys.total_transactions].color}
      />
      {loggedIn && pathOr(false, [0, 'isDummyData'], data) && <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center text-2xl font-bold text-[#00f09e] opacity-10'>Show in next update</div>}
    </Panel>
  );
}
