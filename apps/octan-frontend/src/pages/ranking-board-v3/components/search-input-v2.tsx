import { FC, useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { DefaultFcProps } from 'common';
import { OctanInput } from 'shared-components';

let timeout: any;

export const SearchInputV2: FC<DefaultFcProps> = ({ value, onChange, validateFunc, invalidMsg, width, network }) => {
  const [text, setText] = useState<string>(value);

  const handleSearchChanged = (e: any) => {
    emitSearchChanged(e.target.value);
  };

  const handleClearSearch = () => {
    emitSearchChanged('');
  };

  useEffect(() => {
    emitSearchChanged('');
  }, [network]);

  const emitSearchChanged = (val: string) => {
    setText(val);
    clearTimeout(timeout);

    if (val.length == 0) {
      onChange && onChange(val);
    } else if (!validateFunc || (validateFunc && validateFunc(val))) {
      timeout = setTimeout(() => {
        onChange && onChange(val);
      }, 200);
    }
  };

  const calculateInputProps = (val: string) => {
    const baseProp = {
      style: {
        fontFamily: 'Centra No2',
        fontSize: '16px',
        lineHeight: '26px',
        fontWeight: 400,
        height: 42,
      },
      startAdornment: (
        <InputAdornment position="start">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.9265 17.0401L20.3996 20.4001M19.2796 11.4401C19.2796 15.77 15.7695 19.2801 11.4396 19.2801C7.1097 19.2801 3.59961 15.77 3.59961 11.4401C3.59961 7.11019 7.1097 3.6001 11.4396 3.6001C15.7695 3.6001 19.2796 7.11019 19.2796 11.4401Z"
              stroke="#B6B6B6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </InputAdornment>
      ),
    };

    if (val.length > 0) {
      return {
        ...baseProp,
        ...{
          endAdornment: (
            <InputAdornment position="end" onClick={handleClearSearch} className="cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.1016 9.31302C16.4921 8.92249 16.4921 8.28933 16.1016 7.89881C15.7111 7.50828 15.0779 7.50828 14.6874 7.89881L16.1016 9.31302ZM7.89917 14.687C7.50865 15.0776 7.50865 15.7107 7.89917 16.1012C8.28969 16.4918 8.92286 16.4918 9.31338 16.1012L7.89917 14.687ZM14.6874 16.1012C15.0779 16.4918 15.7111 16.4918 16.1016 16.1012C16.4921 15.7107 16.4921 15.0776 16.1016 14.687L14.6874 16.1012ZM9.31338 7.8988C8.92286 7.50828 8.28969 7.50828 7.89917 7.8988C7.50865 8.28933 7.50865 8.92249 7.89917 9.31302L9.31338 7.8988ZM20.6004 12C20.6004 16.7497 16.75 20.6 12.0004 20.6V22.6C17.8546 22.6 22.6004 17.8542 22.6004 12H20.6004ZM12.0004 20.6C7.25074 20.6 3.40039 16.7497 3.40039 12H1.40039C1.40039 17.8542 6.14617 22.6 12.0004 22.6V20.6ZM3.40039 12C3.40039 7.25038 7.25074 3.40002 12.0004 3.40002V1.40002C6.14617 1.40002 1.40039 6.14581 1.40039 12H3.40039ZM12.0004 3.40002C16.75 3.40002 20.6004 7.25038 20.6004 12H22.6004C22.6004 6.14581 17.8546 1.40002 12.0004 1.40002V3.40002ZM14.6874 7.89881L11.2933 11.2929L12.7075 12.7071L16.1016 9.31302L14.6874 7.89881ZM11.2933 11.2929L7.89917 14.687L9.31338 16.1012L12.7075 12.7071L11.2933 11.2929ZM16.1016 14.687L12.7075 11.2929L11.2933 12.7071L14.6874 16.1012L16.1016 14.687ZM12.7075 11.2929L9.31338 7.8988L7.89917 9.31302L11.2933 12.7071L12.7075 11.2929Z"
                  fill="#B6B6B6"
                />
              </svg>
            </InputAdornment>
          ),
        },
      };
    }

    return baseProp;
  };
  return (
    <>
      <OctanInput
        sx={{ width }}
        value={text}
        onChange={handleSearchChanged}
        placeholder="Search"
        InputProps={calculateInputProps(text)}></OctanInput>
      {text.length > 0 && validateFunc && !validateFunc(text) && (
        <div className="text-[#FF4747] text-[16px] font-normal leading-26px">{invalidMsg}</div>
      )}
    </>
  );
};
