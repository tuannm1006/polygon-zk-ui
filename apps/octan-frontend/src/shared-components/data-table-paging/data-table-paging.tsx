import { FC } from 'react';
import { DefaultFcProps } from 'common';
import { formatStringToNumber } from 'utils';
import Pagination from '@mui/material/Pagination';
import classNames from 'classnames';

export const DataTablePaging: FC<DefaultFcProps> = ({
  totalRecords,
  totalPages,
  pageSize,
  currentPage,
  className,
  onPageChanged,
  showPaging = true,
}) => {
  const min = () => {
    const min = (currentPage - 1) * pageSize + 1;
    return totalRecords < min ? 0 : min;
  };

  const max = () => {
    const max = currentPage * pageSize;
    return max > totalRecords ? totalRecords : max;
  };

  const handlePageChanged = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChanged && onPageChanged(value);
  };

  return (
    <div className={classNames('flex flex-row items-center', className)}>
      <div className="font-normal text-[14px] text-[#898989] leading-[22px] flex flex-row gap-2 ">
        Showing
        <div className="font-bold text-black-1c">
          {formatStringToNumber(min())} - {formatStringToNumber(max())}
        </div>
        out of <div className="font-bold text-black-1c">{formatStringToNumber(totalRecords)}</div>
      </div>
      {showPaging && (
        <div className="ml-auto">
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChanged}
          />
        </div>
      )}
    </div>
  );
};
