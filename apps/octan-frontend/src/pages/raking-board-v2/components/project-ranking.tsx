import { DefaultFcProps, SELECT_ROWS_OPTIONS } from 'common';
import { FC } from 'react';
import SelectField from './select-field';

export type ProjectRankingProps = DefaultFcProps;


export const ProjectRanking: FC<ProjectRankingProps> = () => {
  return (
   <div>
    <div className='flex items-center flex-wrap mx-[-8px] pb-[20px] lg:pb-[40px] border-b-[1px] border-gray'>
      <div className='w-[calc(50%-8px)] lg:w-[177px] h-[44px] mr-[16px] lg:mr-[24px]'>
        <SelectField options={SELECT_ROWS_OPTIONS}
          value='BNB Chain'
        />
      </div>
      <div className='w-[calc(50%-8px)] lg:w-[177px] h-[44px]'>
        <SelectField options={SELECT_ROWS_OPTIONS}
          value='Category'
        />
      </div>
     
    </div>
    <div className='table-responsive'>
    <table className='ranking-table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Reputation Score</th>
          <th>Category</th>
          <th>Users</th>
          <th>Social channels</th>
          <th>Website/ CMC</th>
          <th>Volume</th>
          <th>Users growth</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        { Array.from({length: 10}).map((item, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
              <div className='flex items-center'>
                <img src='/assets/images/networks/bsc.png' className='w-[32px] mr-[16px]'/>
                <span className='text-[16px] font-bold leading-[19px] text-white'>
                  Coin98
                </span>
              </div>
            </td>
            <td><span className='linear-text'>200</span></td>
            <td>Metaverse</td>
            <td>2000</td>
            <td>
              <div className='flex items-center'>
                <a className='w-[24px] h-[24px] rounded-[6px] bg-select flex items-center justify-center mx-[6px]'>
                  <img src='/assets/images/icons/telegram.png' className='w-[13px]'/>
                </a>
                <a className='w-[24px] h-[24px] rounded-[6px] bg-select flex items-center justify-center mx-[6px]'>
                  <img src='/assets/images/icons/twitter.png' className='w-[13px]'/>
                </a>
                <a className='w-[24px] h-[24px] rounded-[6px] bg-select flex items-center justify-center mx-[6px]'>
                  <img src='/assets/images/icons/facebook.png' className='w-[10px]'/>
                </a>
              </div>
            </td>
            <td>
              <div className='flex items-center'>
                <a className='mx-[6px]'>
                  <img src='/assets/images/icons/web.svg' className='w-[28px]'/>
                </a>
              </div>
            </td>
            <td>
              $1,200,000
            </td>
            <td>
              chart
            </td>
            <td><img src='/assets/images/icons/star-active.svg' className='w-[24px]' alt='star'/></td>

          </tr>
        )) }
        
      </tbody>
    </table>
    </div>
   </div>
  )
}

export default ProjectRanking
