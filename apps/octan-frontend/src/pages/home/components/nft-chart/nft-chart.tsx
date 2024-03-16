import { DefaultFcProps } from "common";
import { chartOptions } from "../../data";
import { useEffect, useMemo } from "react";
import { Panel } from "shared-components";
import { SmallLineChart } from "../small-line-chart";
import clsx from "clsx";
import { pathOr } from "ramda";
import { useAppContext } from "contexts";
import { DataKeys } from "consts";

export type NftChartProps = DefaultFcProps & {
  data: any[],
  onClick?: () => void,
};

export const NftChart: React.FC<NftChartProps> = ({
  className,
  data,
  onClick
}) => {
  const {
    loggedIn,
    setReputationScore,
  } = useAppContext()
  const total: number = useMemo(() => data.reduce((a, b) => a + Number(b.value), 0), [data]);

  useEffect(() => {
    setReputationScore(total + '')
  }, [total])

  return (
    <Panel className={clsx(className, 'relative')} onClick={onClick}>
      <SmallLineChart
        caption={chartOptions[DataKeys.total_reputation_score].caption}
        value={total}
        data={data}
        dataLabel="index"
        dataKey="value"
        color={chartOptions[DataKeys.total_reputation_score].color}
      />
      {loggedIn && pathOr(false, [0, 'isDummyData'], data) && <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center text-2xl font-bold text-[#00f09e] opacity-10'>Show in next update</div>}
    </Panel>
  );
}
