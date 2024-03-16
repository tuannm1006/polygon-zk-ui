import classNames from 'classnames';
import { CHAINS_ADDRESS, CHAINS_PROJECT, DefaultFcProps } from 'common';
import { FC } from 'react';
import { HtmlTooltip } from 'shared-components';

export const NetworksList: FC<DefaultFcProps> = ({
  selected,
  onNetworkSelected,
  isProjectTab,
  isAddressTab,
  onPageChanged,
}) => {
  const onNetworkChanged = (network: string) => {
    onPageChanged(1);
    onNetworkSelected && onNetworkSelected(network);
  };

  return (
    <div className="flex items-center flex-wrap pb-[10px] border-b-[1px] border-chain">
      {isAddressTab &&
        CHAINS_ADDRESS.map((item) => {
          return (
            <div key={item.value}>
              {item.enabled ? (
                <div
                  className={classNames(
                    'chain p-[1px] h-[40px] mx-[3px] my-[4px] rounded-[40px] flex items-center overflow-hidden hover:!border-[#0db774]',
                    selected === item.value ? 'chain-selected' : 'chain'
                  )}>
                  <a
                    className={classNames(
                      'chain-selected-title flex items-center cursor-pointer h-[38px] px-[8px] rounded-[32px] overflow-hidden',
                      !item.enabled && 'opacity-50'
                    )}
                    key={item.value}
                    onClick={() => {
                      onNetworkChanged(item.value);
                    }}>
                    {item.image && <img src={item.image} alt="img" className="w-[24px] h-[24px] cover mr-[4px]" />}

                    <span
                      className={classNames(
                        'font-medium',
                        selected === item.value ? 'chain-selected-title' : 'chain-title'
                      )}>
                      {item.title}
                    </span>
                  </a>
                </div>
              ) : (
                <HtmlTooltip title="Coming soon" arrow placement="top">
                  <div
                    className={classNames(
                      'chain p-[1px] h-[40px] mx-[3px] my-[4px] rounded-[40px] flex items-center overflow-hidden hover:!border-[#0db774]',
                      selected === item.value ? 'chain-selected' : 'chain'
                    )}>
                    <a
                      className={classNames(
                        'chain-selected-title flex items-center cursor-pointer h-[38px] px-[8px] rounded-[32px] overflow-hidden',
                        !item.enabled && 'opacity-50'
                      )}
                      key={item.value}>
                      {item.image && <img src={item.image} alt="img" className="w-[24px] h-[24px] cover mr-[4px]" />}

                      <span
                        className={classNames(
                          'font-medium ',
                          selected === item.value ? 'chain-selected-title' : 'chain-title'
                        )}>
                        {item.title}
                      </span>
                    </a>
                  </div>
                </HtmlTooltip>
              )}
            </div>
          );
        })}
      {isProjectTab &&
        CHAINS_PROJECT.map((item) => {
          return (
            <div key={item.value}>
              {item.enabled ? (
                <div
                  className={classNames(
                    'chain p-[1px] h-[40px] mx-[3px] my-[4px] rounded-[40px] flex items-center overflow-hidden hover:!border-[#0db774]',
                    selected === item.value ? 'chain-selected' : 'chain'
                  )}>
                  <a
                    className={classNames(
                      'chain-selected-title flex items-center cursor-pointer h-[38px] px-[8px] rounded-[32px] overflow-hidden',
                      !item.enabled && 'opacity-50'
                    )}
                    key={item.value}
                    onClick={() => {
                      onNetworkChanged(item.value);
                    }}>
                    {item.image && <img src={item.image} alt="img" className="w-[24px] h-[24px] cover mr-[4px]" />}

                    <span
                      className={classNames(
                        'font-medium ',
                        selected === item.value ? 'chain-selected-title' : 'chain-title'
                      )}>
                      {item.title}
                    </span>
                  </a>
                </div>
              ) : (
                <HtmlTooltip title="Coming soon" arrow placement="top">
                  <div
                    className={classNames(
                      'chain p-[1px] h-[40px] mx-[3px] my-[4px] rounded-[40px] flex items-center overflow-hidden',
                      selected === item.value ? 'chain-selected' : 'chain'
                    )}>
                    <a
                      className={classNames(
                        'chain-selected-title flex items-center cursor-pointer h-[38px] px-[8px] rounded-[32px] overflow-hidden',
                        !item.enabled && 'opacity-50'
                      )}
                      key={item.value}>
                      {item.image && <img src={item.image} alt="img" className="w-[24px] h-[24px] cover mr-[4px]" />}

                      <span
                        className={classNames(
                          'font-medium ',
                          selected === item.value ? 'chain-selected-title' : 'chain-title'
                        )}>
                        {item.title}
                      </span>
                    </a>
                  </div>
                </HtmlTooltip>
              )}
            </div>
          );
        })}
    </div>
  );
};
