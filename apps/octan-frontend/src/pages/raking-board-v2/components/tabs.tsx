import classNames from 'classnames';
import { DefaultFcProps, IOption, RANKING_TAB_OPTIONS } from 'common';
import { FC } from 'react';

export type TabsProps = DefaultFcProps;

export const Tabs: FC<TabsProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="flex items-center">
      {RANKING_TAB_OPTIONS.map((item: IOption) => (
        <a
          className={classNames(
            'text-[14px] lg:text-[18px] leading-[18px] lg:leading-[20px] label-text font-medium mr-[20px] lg:mr-[24px] cursor-pointer block py-[10px]',
            currentTab === item.code ? 'border-b-[1px] border-white text-white' : 'pointer-events-none opacity-[0.5]'
          )}
          key={item.code}
          onClick={() => {
            setCurrentTab(item.code);
          }}>
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
