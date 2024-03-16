import { FC } from 'react';
import { DefaultFcProps, SORT_ORDER } from 'common';
import { InfoIcon, SortIcon } from 'shared-components';

export const TableHeader: FC<DefaultFcProps> = ({
  name,
  title,
  classname,
  onClick,
  field,
  sortKey,
  order,
  sortable = true,
}) => {
  const handleOnClicked = () => {
    if (field !== sortKey || order === SORT_ORDER.NONE) {
      onClick && onClick(field, SORT_ORDER.DESC);
      return;
    }

    if (order === SORT_ORDER.DESC) {
      onClick && onClick(field, SORT_ORDER.ASC);
      return;
    }

    if (order === SORT_ORDER.ASC) {
      onClick && onClick(field, SORT_ORDER.DESC);
    }
  };

  return (
    <div className={classname} onClick={handleOnClicked}>
      {name}
      {sortable && (
        <div className="flex items-center ml-[4px] pointer-cursor mr-[4px]">
          <SortIcon field={field} sortKey={sortKey} order={order} />
        </div>
      )}
      <div className="flex items-center">
        <InfoIcon title={title} arrow placement="top"></InfoIcon>
      </div>
    </div>
  );
};
