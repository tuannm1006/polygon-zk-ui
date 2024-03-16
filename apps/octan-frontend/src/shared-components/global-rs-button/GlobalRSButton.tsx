import { DefaultFcProps } from 'common';
import { InformationIcon } from '../../pages/profile/components/account-setting';
import { DiagramIcon } from '../../pages/profile/components/sbts-management';
import { HtmlTooltip } from '../tooltip';

const checkTooltipGlobalRSButton = (title: any) => {
  switch (title) {
    case 'Global RS':
      return 'Total reputation score of all selected wallets for scoring tied to Soulbound token (SBT), without considering any specific category.';
    case 'DeFi RS':
      return 'Total reputation score of all selected wallets for scoring tied to Soulbound token (SBT), considering only DeFi category.';
    case 'NFT RS':
      return 'Total reputation score of all selected wallets for scoring tied to Soulbound token (SBT), considering only NFT category.';
    case 'GameFi RS':
      return 'Total reputation score of all selected wallets for scoring tied to Soulbound token (SBT), considering only GameFi category.';
    case 'DAO RS':
      return 'Total reputation score of all selected wallets for scoring tied to Soulbound token (SBT), considering only DAO category.';
    case 'SocialFi RS':
      return 'Total reputation score of all selected wallets for scoring tied to Soulbound token (SBT), considering only SocialFi category.';
    default:
      return 'Coming soon';
  }
};

export type GlobalRSProps = DefaultFcProps & {
  title: string;
  totalRs: string;
  totalDia: string;
  isActive?: boolean;
  handleChangeCategory?: any;
  selectCategory?: any;
  loggedIn?: any;
  hasSBT?: any;
};

export const GlobalRS: React.FC<GlobalRSProps> = ({
  title = '',
  totalRs = '',
  totalDia = '',
  isActive = false,
  handleChangeCategory,
  selectCategory,
  loggedIn,
  hasSBT,
}) => {
  if (hasSBT) {
    if (title === 'Onchain Global RS') {
      return (
        <div
          onClick={() => handleChangeCategory(title)}
          className={`flex gap-y-2 flex-col border-2 ${
            selectCategory === title ? 'border-[#0DB774]' : 'border-[#E9E9E9]'
          } rounded-lg p-2 min-w-[144.33px] h-[108px]`}>
          <HtmlTooltip arrow={true} placement="top" title={checkTooltipGlobalRSButton(title)}>
            <div className="flex gap-1.5 text-xs text-black-1c items-center">
              <p>{title}</p>
              <InformationIcon color="#CECECE" />
            </div>
          </HtmlTooltip>
          <div className="linear-text-3 text-xl font-bold">{totalRs ? totalRs : '-'}</div>
          <div className="flex gap-x-[10.5px]">
            <DiagramIcon />
            <p className="linear-text-4 font-bold">{totalDia ? totalDia : '-'}</p>
          </div>
        </div>
      );
    } else {
      return (
        <HtmlTooltip arrow={true} placement="top" title="Coming soon">
          <div
            onClick={() => handleChangeCategory(title)}
            className={`flex gap-y-2 flex-col border-2 ${
              selectCategory === title ? 'border-[#0DB774]' : 'border-[#E9E9E9]'
            } rounded-lg p-2 min-w-[144.33px] h-[108px]`}>
            <HtmlTooltip arrow={true} placement="top" title={checkTooltipGlobalRSButton(title)}>
              <div className="flex gap-1.5 text-xs text-black-1c items-center">
                <p>{title}</p>
                <InformationIcon color="#CECECE" />
              </div>
            </HtmlTooltip>
            <div className="linear-text-3 text-xl font-bold">{totalRs ? totalRs : '-'}</div>
            <div className="flex gap-x-[10.5px]">
              <DiagramIcon />
              <p className="linear-text-4 font-bold">{totalRs ? totalDia : '-'}</p>
            </div>
          </div>
        </HtmlTooltip>
      );
    }
  } else {
    return (
      <div
        onClick={() => handleChangeCategory(title)}
        className={`flex gap-y-2 flex-col border-2 ${
          selectCategory === title ? 'border-[#0DB774]' : 'border-[#E9E9E9]'
        } rounded-lg p-2 min-w-[144.33px] h-[108px]`}>
        <HtmlTooltip arrow={true} placement="top" title={checkTooltipGlobalRSButton(title)}>
          <div className="flex gap-1.5 text-xs text-black-1c items-center">
            <p>{title}</p>
            <InformationIcon color="#CECECE" />
          </div>
        </HtmlTooltip>

        <div className="linear-text-3 text-xl font-bold">{totalRs ? totalRs : '-'}</div>
        <div className="flex gap-x-[10.5px]">
          <DiagramIcon />
          <p className="linear-text-4 font-bold">{totalRs ? totalDia : '-'}</p>
        </div>
      </div>
    );
  }
};
