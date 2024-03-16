import { Carousel } from '@trendyol-js/react-carousel';
import { DefaultFcProps } from 'common';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { isMobile } from 'react-device-detect';
import { ButtonV2 } from 'shared-components';
import { ContainedAddressesSvg } from './contained-addresses-svg';
import { ProcessedBlocksSvg } from './processed-blocks-svg';
import { ProcessedTransactionsSvg } from './processed-txn-svg';

export type RankingBannerV2Props = DefaultFcProps;

export const BannerV2: FC<RankingBannerV2Props> = () => {
  const handleContactUs = () => {
    window.open('https://octan.network/blog/contact-us/', '_blank', 'noreferrer');
  };

  return (
    <div className="banner flex w-full md:gap-6 max-[1247px]:flex-col max-[1247px]:justify-center">
      <div className="banner_looking max-lg:justify-center">
        <div className="w-full min-[1247px]:max-w-[628px] flex-col justify-center min-[1247px]:justify-start items-center min-[1247px]:items-start gap-4 inline-flex">
          <div className="self-stretch">
            <span className="text-zinc-900 text-5xl font-bold leading-[58px]">Octan</span>
            <span className="text-emerald-500 text-5xl font-bold leading-[58px]"> Network</span>
            {/* <span className="text-zinc-900 text-5xl font-bold leading-[58px]"> and </span>
            <span className="text-emerald-500 text-5xl font-bold leading-[58px]">Credibility</span>
            <span className="text-zinc-900 text-5xl font-bold leading-[58px]"> in Web3</span> */}
          </div>
          <div className="self-stretch h-[98px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch text-zinc-900 text-2xl font-medium leading-[34px]">
              Unlock Data Intelligence & Collaborative AI in Web3
            </div>
            <div className="self-stretch text-zinc-600 text-lg font-normal leading-7">
              Powered by Reputation Ranking and decentralized GPU-computing Network, leveraging DePin for onchain data
              analytics and business intelligence, Web3 graph visualization & clustering, advancing collaborative AI/ML
              for data science in Web3
            </div>
            <div className="hidden xl:flex flex-row gap-6 pb-6">
              <ButtonV2 className="" onClick={handleContactUs}>
                Contact us
              </ButtonV2>
              <div className="h-12 py-[11px] rounded--sm justify-center items-center inline-flex">
                <div className="text-center text-emerald-500 text-base font-medium underline leading-relaxed">
                  <a href="https://octan.network/comprehensive-reports" target="_blank">
                    Comprehensive Reports
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner_looking_contact xl:!hidden flex flex-row gap-6">
          <ButtonV2 className="" onClick={handleContactUs}>
            Contact us
          </ButtonV2>
          <div className="h-12 py-[11px] rounded--sm justify-center items-center inline-flex">
            <div className="text-center text-emerald-500 text-base font-medium underline leading-relaxed">
              <a href="https://octan.network/comprehensive-reports" target="_blank">
                Comprehensive Reports
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="banner_hightlight_items max-[1247px]:w-full flex flex-col justify-center">
        <div className="flex flex-col max-[1247px]:w-full max-[1247px]:justify-center">
          <div className="flex justify-center">
            <div className="max-[393px]:w-[250px]">
              <motion.div
                animate={{
                  x: isMobile ? [0, 10] : [0, 10],
                }}
                whileHover={{ scale: 1.2, transition: { duration: 1 } }}
                transition={{ type: 'spring' }}>
                <div className="banner_highlight_item">
                  <ProcessedBlocksSvg className="banner_hightlight_item_icon" />
                  <div className="banner_hightlight_item_info">
                    <div className="text-emerald-500 text-2xl max-[473px]:text-base font-bold leading-[34px]">
                      Over 3B TXNs
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-row max-[393px]:flex-col gap-2 max-[1247px]:justify-center">
            <div className="max-[393px]:w-[250px]">
              <motion.div
                animate={{
                  x: isMobile ? [0, 22] : [0, 10],
                }}
                whileHover={{ scale: 1.2, transition: { duration: 1 } }}
                transition={{ type: 'spring' }}>
                <div className="banner_highlight_item">
                  <ContainedAddressesSvg className="banner_hightlight_item_icon" />
                  <div className="banner_hightlight_item_info">
                    <div className="text-emerald-500 text-2xl max-[473px]:text-base font-bold leading-[34px]">
                      Over 10M Contracts
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="max-[393px]:w-[250px]">
              <motion.div
                animate={{
                  x: isMobile ? [0, 52] : [0, 10],
                }}
                whileHover={{ scale: 1.2, transition: { duration: 1 } }}
                transition={{ type: 'spring' }}>
                <div className="banner_highlight_item">
                  <ProcessedTransactionsSvg className="banner_hightlight_item_icon" />
                  <div className="banner_hightlight_item_info">
                    <div className="text-emerald-500 text-2xl max-[473px]:text-base font-bold leading-[34px]">
                      Over 250M EOAs
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="w-full min-[1247px]:max-w-[628px] h-[94px] flex-col justify-start max-[1247px]:justify-center items-center gap-1 inline-flex">
          <div className="text-center text-zinc-500 text-base font-bold leading-relaxed">OUR CLIENTS</div>
          <div className="self-stretch justify-center min-[1247px]:justify-start inline-flex items-center max-[565px]:gap-1">
            <Carousel
              className="max-w-[628px]"
              show={4}
              slide={1}
              infinite={true}
              // swiping={true}
              swipeOn={0.3}
              responsive>
              <div className="w-[100px] min-[459px]:w-[125px] h-[64px] flex items-center justify-center bg-white rounded-lg">
                <img src="/assets/images/clients/dfinity.svg" className="p-4" />
              </div>
              <div className="w-[100px] min-[459px]:w-[125px] h-[64px] flex items-center justify-center bg-white rounded-lg">
                <img src="/assets/images/clients/block.svg" className="p-4" />
              </div>
              <div className="w-[100px] min-[459px]:w-[125px] h-[64px] flex items-center justify-center bg-white rounded-lg">
                <img src="/assets/images/clients/bnbchain.svg" className="p-4" />
              </div>
              <div className="w-[100px] min-[459px]:w-[125px] h-[64px] flex items-center justify-center bg-white rounded-lg">
                <img src="/assets/images/clients/ethos.svg" className="p-4" />
              </div>
            </Carousel>

            <div className="bg-white rounded-[32px] justify-start items-center min-[459px]:gap-2">
              <a href="https://octan.network/blog/analytics-services" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.5999 7.20001L14.3999 12L9.5999 16.8"
                    stroke="#B6B6B6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
