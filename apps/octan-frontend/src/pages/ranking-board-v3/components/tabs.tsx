import classNames from 'classnames';
import { DefaultFcProps, IOption, RANKING_TAB_OPTIONS } from 'common';
import { FC } from 'react';
import { HtmlTooltip } from 'shared-components';

export type TabsProps = DefaultFcProps;

export const Tabs: FC<TabsProps> = ({ currentTab, setCurrentTab }) => {
  const renderTabName = (item: IOption) => {
    if (item.disabled) {
      return (
        <HtmlTooltip title="Coming soon" arrow placement="top">
          <a
            className={classNames(
              'flex w-full justify-center text-[14px] lg:text-[18px] leading-[18px] lg:leading-[20px] font-medium mr-[24px] lg:mr-[24px] cursor-pointer',
              currentTab === item.query ? 'tab-active' : 'tab-inactive'
              // item.disabled ? 'pointer-events-none' : ' '
            )}
            key={item.code}>
            {item.label}
          </a>
        </HtmlTooltip>
      );
    }

    return (
      <a
        className={classNames(
          'flex w-full justify-center text-[14px] hover:!text-[#0db774] lg:text-[18px] leading-[18px] lg:leading-[20px] font-medium mr-[24px] lg:mr-[24px] cursor-pointer',
          currentTab === item.query ? 'tab-active' : 'tab-inactive'
        )}
        key={item.code}
        onClick={() => {
          setCurrentTab(item.query);
        }}>
        {item.label}
      </a>
    );
  };

  return (
    <div className="flex items-center">
      {RANKING_TAB_OPTIONS.map((item: IOption) => (
        <div key={item.code} className="flex flex-col h-[32px]">
          {renderTabName(item)}
          {item.query === currentTab && (
            <div className="flex w-full justify-center mt-[6px]">
              <span className="h-[2px] w-[16px] bg-[#0DB774] rounded"></span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
