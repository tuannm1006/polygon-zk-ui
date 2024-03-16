import { DefaultFcProps, SELECT_ROWS_OPTIONS } from 'common';
import { FC } from 'react';
import SelectField from './select-field';

export type SBTOwnerRankingProps = DefaultFcProps;


export const SBTOwnerRanking: FC<SBTOwnerRankingProps> = () => {
  return (
   <div>
    <div className='flex items-center flex-wrap mx-[-8px] pb-[20px] lg:pb-[40px] border-b-[1px] border-gray'>
      <div className='w-[calc(50%-8px)] lg:w-[177px] h-[44px] mr-[16px] lg:mr-[24px] mb-[16px] lg:mb-0'>
        <SelectField options={SELECT_ROWS_OPTIONS}
          value='BNB Chain'
        />
      </div>
      <div className='w-[calc(50%-8px)] lg:w-[177px] h-[44px] lg:mr-[24px] mb-[16px] lg:mb-0'>
        <SelectField options={SELECT_ROWS_OPTIONS}
          value='ALL'
        />
      </div>
      <div className='w-[calc(50%-8px)] lg:w-[177px] h-[44px] mr-[16px] lg:mr-[24px]'>
        <SelectField options={SELECT_ROWS_OPTIONS}
          value='Community'
        />
      </div>
      <div className='w-[calc(50%-8px)] lg:w-[177px] h-[44px]'>
        <SelectField options={SELECT_ROWS_OPTIONS}
          value='Project'
        />
      </div>
    </div>
    <div className='table-responsive'>
    <table className='ranking-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Reputation Score</th>
          <th>Total Transaction</th>
          <th>Total Gas Burn</th>
          <th>Total Volume</th>
          <th>KYC proof</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        { Array.from({length: 10}).map((item, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>alexa</td>
            <td><span className='linear-text'>200</span></td>
            <td>14.657</td>
            <td>14.657</td>
            <td>14.657</td>
            <td>Email</td>
            <td><img src='/assets/images/icons/star-active.svg' className='w-[24px]' alt='star'/></td>

          </tr>
        )) }
        
      </tbody>
    </table>
    </div>
   </div>
  )
}

export default SBTOwnerRanking
