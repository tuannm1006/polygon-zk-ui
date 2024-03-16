import { DefaultFcProps } from 'common';
import { isAddress } from 'ethers/lib/utils.js';
import { FC } from 'react';


export type SearchProps = DefaultFcProps;

export const SearchInput: FC<SearchProps> = ({value, onChange, topAddress}) => {
  return (
    <div className='relative'>
      <div className='w-full h-[40px] rounded-[16px] bg-select px-[10px] lg:px-[16px] py-[10px] flex items-center'>
        <img alt='search' src='/assets/images/icons/search.svg' className='w-[16px] mr-[8px] lg:w-[20px] lg:mr-[16px]' />
        <div className='w-[1px] h-full bg-[#8A939B] mr-[8px] lg:mr-[16px]'/>
        <input className='border-0 outline-0 text-white flex-1 bg-transparent text-[16px] font-bold'
          placeholder='Input address'
          value={value}
          onChange={onChange}
        />
      </div>
      { value && isAddress(value) && topAddress?.length === 0
        && <div className='w-full h-[60px] rounded-[16px] bg-select px-[10px] lg:px-[16px] text-center leading-[60px] absolute left-[0] right-[0] top-[50px]'>
        Don't have this address in system
      </div>
      }

    { value && !isAddress(value)
        && <div className='w-full h-[60px] rounded-[16px] bg-select px-[10px] lg:px-[16px] text-center leading-[60px] absolute left-[0] right-[0] top-[50px]'>
        Please enter valid address
      </div>
      }
      
    </div>
    
  )
}

export default SearchInput
