import { Container } from '@mui/material';
import { DefaultFcProps } from 'common';
import { useEffect } from 'react';
import { FC, useState } from 'react';
import { getApiConfig } from 'swagger';
import { toJson } from '@octan/common';
import { formatStringToNumber } from 'utils';

export type ProcessingCapacityHighlightProps = DefaultFcProps;

interface IHightlight {
  CONTAINED_ADDRESSES: string;
  PROCESSED_BLOCKS: string;
  PROCESSED_TRANSACTIONS: string;
}

export const ProcessingCapacityHighlight: FC<ProcessingCapacityHighlightProps> = () => {
  const [highlights, setHighlights] = useState<IHightlight>({
    PROCESSED_TRANSACTIONS: '0',
    PROCESSED_BLOCKS: '0',
    CONTAINED_ADDRESSES: '0',
  });

  useEffect(() => {
    const getHightlights = async () => {
      const { rankingBasePath, ...options } = getApiConfig();

      const result: any = await fetch(`${rankingBasePath}/highlights`, {
        ...options,
        method: 'GET',
        params: JSON.stringify({}),
      }).then(toJson);

      const obj: any = {};

      result.data.forEach((item: any) => {
        obj[item.metric_key] = item.value;
      });

      setHighlights(obj);
    };

    // getHightlights()
  }, []);

  return (
    <Container maxWidth="xl">
      <div className="text-center mb-[46px] mt-[80px]">
        <span className="linear-text text-[24px] font-bold leading-[29px]">Processing Capacity Highlights</span>
      </div>

      <div className="grid grid-cols-12 mx-[-20px]">
        <div className="col-span-12 md:col-span-6 lg:col-span-4 px-[20px] pb-[20px] lg:pb-[40px]">
          <div className="rounded-[24px] linear-bg relative p-[1px] overflow-hidden">
            <div className="bg-main box overflow-hidden">
              <img src="/assets/images/ranking-board/block.png" className="w-[48px] mb-[24px] mx-auto" />
              <p className="label-text text-[18px] mb-[16px] text-center leading-[21px]">Processed Blocks</p>
              <p className="text-[32px] leading-[39px] text-white font-bold text-center mb-0">Over 10.5M blocks</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 px-[20px] pb-[20px] lg:pb-[40px]">
          <div className="rounded-[24px] linear-bg relative p-[1px]">
            <div className="bg-main box">
              <img src="/assets/images/ranking-board/transactions.png" className="w-[48px] mb-[24px] mx-auto" />
              <p className="label-text text-[18px] mb-[16px] text-center leading-[21px]">Processed Transcations</p>
              <p className="text-[32px] leading-[39px] text-white font-bold text-center mb-0">Over 1,537M txns</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 px-[20px] pb-[20px] lg:pb-[40px]">
          <div className="rounded-[24px] linear-bg relative p-[1px]">
            <div className="bg-main box">
              <img src="/assets/images/ranking-board/addresses.png" className="w-[48px] mb-[24px] mx-auto" />
              <p className="label-text text-[18px] mb-[16px] text-center leading-[21px]">Contained Addresses</p>
              <p className="text-[32px] leading-[39px] text-white font-bold text-center mb-0">Over 63M accounts</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProcessingCapacityHighlight;
