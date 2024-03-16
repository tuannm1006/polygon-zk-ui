import { isNotEmpty } from '@octan/common';
import axios from 'axios';
import { DefaultFcProps } from 'common';
import { useState } from 'react';
import { OctanLogo } from 'shared-components';
import classes from './footer-information.module.scss';
export type FooterInformationProps = DefaultFcProps;

type SocialNetworkModel = {
  id: number;
  name: string;
  url: string;
  icon: string;
};

const socialNetworks: SocialNetworkModel[] = [
  {
    id: 1,
    name: 'Twitter',
    url: 'https://twitter.com/OctanNetwork',
    icon: '/assets/images/social-networks/twitter.svg',
  },
  {
    id: 2,
    name: 'Telegram',
    url: 'https://t.me/OctanNetworkANN',
    icon: '/assets/images/social-networks/telegram.svg',
  },
  {
    id: 3,
    name: 'Discord',
    url: 'https://discord.com/invite/tAwtJghr6R',
    icon: '/assets/images/social-networks/discord.svg',
  },
  {
    id: 4,
    name: 'Github',
    url: 'https://github.com/Octan-Labs',
    icon: '/assets/images/social-networks/github.svg',
  },
  {
    id: 5,
    name: 'Medium',
    url: 'https://medium.com/@OctanNetwork',
    icon: '/assets/images/social-networks/medium.svg',
  },
  {
    id: 6,
    name: 'Facebook',
    url: 'https://www.facebook.com/OctanNetworkOfficial',
    icon: '/assets/images/social-networks/facebook.svg',
  },
  {
    id: 7,
    name: 'info@octan.network',
    url: 'mailto:info@octan.network',
    icon: '/assets/images/social-networks/gmail.svg',
  },
];

export const FooterInformation: React.FC<FooterInformationProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const combinedClassName = [className, classes.footerInformationContainer, 'flex flex-col items-center gap-3 '].join(
    ' '
  );

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmitSubcribe = (e: any) => {
    e.preventDefault();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const objt = { email, date: today.toUTCString() };
    axios
      .post('https://sheet.best/api/sheets/7d775a92-3423-4814-8661-31b3d695b7a9', objt)
      .then((res) => console.log('Subcribe success!'));
  };

  return (
    <>
      <div className="w-full min-h-[307px] pt-[40px] sm:px-[80px] flex items-center gap-[10px]">
        <div className="w-full flex flex-col items-start gap-6">
          <div className="flex max-[1430px]:flex-wrap items-start gap-8 self-stretch">
            <div className="flex flex-col items-start gap-4 pr-[15px] min-w-[230px]">
              <div className="w-40 h-[42px] relative">
                <div className="w-[30.87px] h-[41.98px] left-[0.01px] top-[0.04px] absolute">
                  <OctanLogo />
                </div>
              </div>
              <div className="self-stretch text-zinc-400 text-sm font-normal leading-snug">
                Assist organizations to extract Web3 insights & onchain performance efficiently by Reputation Ranking &
                onchain data analytics
              </div>
            </div>
            <div className="flex self-stretch max-[1044px]:flex-wrap max-[1044px]:gap-8 max-sm:gap-4 min-[1430px]:gap-[65px]">
              <div className="w-[164px] sm:w-48 flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch text-white text-base font-medium leading-relaxed">Quick links</div>
                <div className="self-stretch text-zinc-400 hover:!text-[#0db774] text-sm font-normal leading-snug">
                  <a href="https://octan.network/">Home</a>
                </div>
                <div className="self-stretch text-zinc-400 hover:!text-[#0db774] text-sm font-normal leading-snug">
                  <a href="https://docs.octan.network/" target="_blank">
                    Documents
                  </a>
                </div>
                <div className="self-stretch text-zinc-400 hover:!text-[#0db774] text-sm font-normal leading-snug">
                  <a target="_blank" href="https://octan.network/blog/contact-us/">
                    Contact us
                  </a>
                </div>
              </div>
              <div className="min-[400px]:w-[164px] sm:w-48 flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch text-white text-base font-medium leading-relaxed">Company</div>
                <div className="self-stretch text-zinc-400 hover:!text-[#0db774] text-sm font-normal leading-snug">
                  <a href="https://octan.network/blog/" target="_blank">
                    Blog
                  </a>
                </div>
                <div className="self-stretch text-zinc-400 hover:!text-[#0db774] text-sm font-normal leading-snug">
                  Terms
                </div>
              </div>
              <div className="min-[400px]:w-[164px] sm:w-48 flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch text-white text-base font-medium leading-relaxed">Products</div>
                <div className="self-stretch text-zinc-400 hover:!text-[#0db774] text-sm font-normal leading-snug">
                  <a href="https://octan.network/">Reputation board</a>
                </div>
                <div className="self-stretch text-zinc-400 hover:!text-[#0db774] text-sm font-normal leading-snug">
                  <a href="https://octan.network/blog/coming-soon/" target="_blank">
                    Soulbound tokens
                  </a>
                </div>
                <div className="self-stretch text-zinc-400 hover:!text-[#0db774] text-sm font-normal leading-snug">
                  <a href="https://octan.network/blog/analytics-services/" target="_blank">
                    Analytics services
                  </a>
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch text-white text-base font-medium leading-relaxed">Join Newsletter</div>
                <div className="self-stretch h-[78px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-white text-sm font-normal leading-snug">
                    Sign up for our newsletter
                  </div>
                  <div className="flex relative items-center">
                    <form className="flex items-center" onSubmit={handleSubmitSubcribe}>
                      <input
                        type="text"
                        name="email"
                        value={email}
                        style={{ background: 'linear-gradient(180deg, #01202c 0%, #000f15 100%)' }}
                        className="min-w-[250px] max-[1430px]:min-w-[258px] max-[] pl-4 pr-2 py-2 rounded-[90px] border border-zinc-600 justify-end items-center gap-[18px] inline-flex"
                        placeholder="Enter your email"
                        onChange={handleChange}
                      />
                      <button type="submit" className="absolute right-2">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="32" rx="16" fill="#0DB774" />
                          <path
                            d="M16.8333 11.625L21 16M21 16L16.8333 20.375M21 16L11 16"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                  <div className="self-stretch text-zinc-400 text-sm font-normal leading-snug">info@octan.network</div>
                </div>
              </div>
            </div>
          </div>
          {/* seperate div */}
          <div className="flex w-full flex-col">
            <div className="flex flex-col min-[1420px]:pl-[262px]">
              <div className="self-stretch text-white text-base font-medium leading-relaxed">Social</div>
              <div className="flex flew-row gap-6 mt-2 mb-6 flex-wrap min-[1430px]:flex-nowrap min-[1430px]:w-[694.953px]">
                {socialNetworks
                  .filter((socialNetwork) => isNotEmpty(socialNetwork.url))
                  .map((socialNetwork) => (
                    <a key={socialNetwork.id} href={socialNetwork.url} target={'_blank'}>
                      <div className="flex gap-2">
                        <img src={socialNetwork.icon} alt={socialNetwork.name} className="w-[32px] h-[32px]" />
                        <span className="flex items-center text-[14px] hover:!text-[#0db774] leading-[22px] font-normal not-italic">
                          {socialNetwork.name}
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
            <div></div>
          </div>
          {/* seperate div */}
          <div className="self-stretch h-[53px] pb-4 flex-col justify-center items-center gap-4 flex">
            <div className="self-stretch h-px bg-zinc-500" />
            <div className="justify-start items-start gap-[554px] inline-flex">
              <div className="text-zinc-400 text-xs font-normal leading-tight">
                Copyright © 2023 Octan. All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
