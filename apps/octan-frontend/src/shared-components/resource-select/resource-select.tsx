import clsx from 'clsx';
import { DefaultFcProps } from 'common';
import { FC, useState } from 'react';
import { useOutsideClick } from './useComponentVisible';
export type ResourceSelectProps = DefaultFcProps;

const MenuProps = {
  PaperProps: {
    style: {
      marginTop: '8px',
      background: '#ffffff',
      // borderRadius: '8px',
      // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '26px',
    },
  },
};

export const ResourceSelect: FC<ResourceSelectProps> = ({ options, value, onChange, placeholder, isHamburger }) => {
  const [openSelect, setOpenSelect] = useState(false);

  const ref = useOutsideClick(() => {
    setOpenSelect(false);
  });

  const handleOnClick = () => {
    setOpenSelect(!openSelect);
  };

  return (
    <div
      className={clsx(
        'h-full py-[29px] flex lg:justify-center lg:items-center gap-2 inline-flex cursor-pointer relative',
        isHamburger && '!pl-8 !py-0'
      )}
      onClick={handleOnClick}>
      <div
        className={clsx(
          'h-6 flex items-center text-center text-[#898989] hover:!text-[#0db774] text-sm font-medium leading-snug gap-[8px]',
          openSelect && 'text-emerald-500',
          isHamburger && '!h-[28px] !text-lg !font-bold'
        )}>
        Resources
      </div>
      <div className="h-6 pt-[4px]">
        {!openSelect && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.2002 6.39998L8.0002 9.59998L4.8002 6.39997"
              stroke={openSelect ? '#0DB774' : '#898989'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {openSelect && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.19922 14.4001L11.9992 9.6001L16.7992 14.4001"
              stroke={openSelect ? '#0DB774' : '#898989'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {openSelect && (
        <div
          ref={ref}
          className="w-[200px] h-32 py-2 bg-white rounded shadow flex-col justify-center items-start gap-3 inline-flex absolute top-[70px] z-50">
          <a
            href="https://octan.network/blog/"
            target="_blank"
            className="self-stretch !p-3 hover:bg-neutral-200 text-zinc-900 hover:!text-[#0db774] justify-start items-center gap-3 inline-flex">
            <div className="text-sm font-normal leading-relaxed">
              <a href="https://docs.octan.network/" target="_blank">
                Documents
              </a>
            </div>
          </a>
          <a
            href="https://octan.network/blog/"
            target="_blank"
            className="self-stretch !p-3 hover:bg-neutral-200 text-zinc-900 hover:!text-[#0db774] justify-start items-center gap-3 inline-flex">
            <div className="text-sm font-normal leading-relaxed">Blog</div>
            {/* <div className="w-5 h-5 relative">
              <div className="w-[14.40px] h-[15.31px] left-[3.37px] top-[2.39px] absolute"></div>
            </div> */}
          </a>
        </div>
      )}
    </div>
  );
  // return (

  //   <Select
  //     sx={{
  //       boxShadow: 'none',
  //       fontSize: '14px',
  //       '.MuiOutlinedInput-notchedOutline': { border: 0 },
  //       '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
  //         border: 0,
  //         color: '#0DB774',
  //       },
  //       '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
  //         border: 0, //'1px solid #0DB774',
  //         color: '#0DB774',
  //       },
  //       '&:hover': {
  //         '&& fieldset': {
  //           border: 0, //'1px solid #0DB774',
  //           color: '#0DB774',
  //         },
  //       },
  //     }}
  //     className=" select-field-input "
  //     value={value}
  //     onChange={onChange}
  //     displayEmpty
  //     inputProps={{ 'aria-label': 'Without label' }}
  //     // input={<OutlinedInput className="h-full text-[14px] font-normal" />}
  //     IconComponent={ExpandMoreIcon}
  //     renderValue={(selected) => {
  //       if (!selected) {
  //         return <p className="text-black-1c text-[14px] font-normal mt-[2px]">{placeholder}</p>;
  //       }
  //       return <p className="text-black-1c text-[14px] leading-[22px] font-normal mt-[2px]">{selected}</p>;
  //     }}
  //     MenuProps={{
  //       ...{
  //         anchorOrigin: {
  //           vertical: 'bottom',
  //           horizontal: 'right',
  //         },
  //         transformOrigin: {
  //           vertical: 'top',
  //           horizontal: 'right',
  //         },
  //       },
  //       ...MenuProps,
  //     }}
  //     classes={{
  //       icon: 'text-green',
  //     }}>
  //     {/* <MenuItem
  //       value=""
  //       classes={{
  //         root: 'menu-item',
  //       }}
  //       disabled>
  //       {placeholder}
  //     </MenuItem> */}
  //     {options.map((option: IOption) => (
  //       <MenuItem
  //         key={`${option.code}`}
  //         //   sx={{ width: '120px' }}
  //         value={option.code}
  //         classes={{
  //           root: 'menu-item',
  //         }}>
  //         {option.label}
  //       </MenuItem>
  //     ))}
  //   </Select>
  // );
};

export default ResourceSelect;
