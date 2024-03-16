import { Container } from '@mui/material';
import { DefaultFcProps } from 'common';
import { FC } from 'react';


export type RankingMonthlyHighlightProps = DefaultFcProps;

export const RankingBoard: FC<RankingMonthlyHighlightProps> = () => {
  return (
    <Container maxWidth="xl">
      <div className='text-center mb-[46px] mt-[80px]'>
      <span className='linear-text text-[24px] font-bold leading-[29px]'>
        Monthly Highlight
      </span>
      </div>

      <div className='grid grid-cols-12 mx-[-20px]'>
        <div className='col-span-12 md:col-span-6 lg:col-span-4 px-[20px] pb-[20px] lg:pb-[40px]'>
          <div className='box'>
            <h3 className='text-[20px] font-bold leading-[24px] mb-[24px] label-text'>
              Communities
            </h3>
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex flex-row items-center mb-[16px]">
                <div className="flex-1 flex items-center pr-[10px]">
                  <div className='w-[33px] mr-[4px]'>
                    {index === 1
                      &&  <img src="/assets/images/ad.svg" alt="ad" className='w-full' />
                    }
                   
                  </div>
                  <img className="w-[32px] h-[32px] mr-[16px]" src="/assets/images/logos/axie.png" alt="logo" />
                  <span className="font-bold text-white text-[16px] leading-[19px] flex-1">Axie</span>
                </div>
                <div className='flex items-center justify-between flex-1'>
                  <p className="label-text text-[16px] font-medium leading-[20px] mr-[10px] text-left">VN</p>
                  <div className="text-right">
                    <span className="linear-text font-bold">1000</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-12 md:col-span-6 lg:col-span-4 px-[20px] pb-[20px] lg:pb-[40px]'>
          <div className='box'>
            <h3 className='text-[20px] font-bold leading-[24px] mb-[24px] label-text'>
              Projects
            </h3>
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex flex-row items-center mb-[16px]">
                <div className="flex-1 flex items-center pr-[10px]">
                  <div className='w-[33px] mr-[4px]'>
                    {index === 2
                      &&  <img src="/assets/images/ad.svg" alt="ad" className='w-full' />
                    }
                   
                  </div>
                  <img className="w-[32px] h-[32px] mr-[16px]" src="/assets/images/logos/axie.png" alt="logo" />
                  <span className="font-bold text-white text-[16px] leading-[19px] flex-1">Axie</span>
                </div>
                <div className='flex items-center justify-between flex-1'>
                  <p className="label-text text-[16px] font-medium leading-[20px] mr-[10px] text-left">VN</p>
                  <div className="text-right">
                    <span className="linear-text font-bold">1000</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-12 md:col-span-6 lg:col-span-4 px-[20px] pb-[20px] lg:pb-[40px]'>
          <div className='box'>
            <h3 className='text-[20px] font-bold leading-[24px] mb-[24px] label-text'>
              KOL
            </h3>
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex flex-row items-center mb-[16px]">
                <div className="flex-1 flex items-center pr-[10px]">
                  <span className="font-bold text-white text-[16px] leading-[19px] flex-1">Axie</span>
                </div>
                <div className='flex items-center justify-between flex-1'>
                  <p className="label-text text-[16px] font-medium leading-[20px] mr-[10px] text-left">VN</p>
                  <div className="text-right">
                    <span className="linear-text font-bold">1000</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </Container>
  )
}

export default RankingBoard
