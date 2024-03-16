import { FC } from 'react';
import { DefaultFcProps } from 'common';
import { ShowMoreProjectIcon } from './show-more-project-button';

export const ProjectCard: FC<DefaultFcProps> = ({ project_name, total_contract }) => {
  return (
    <div className="flex flex-row items-center min-w-[150px]">
      {/* <div className="">
        <img src="/assets/images/icons/project.svg" />
      </div> */}
      <div className="flex  flex-col ml-2">
        <div className="font-normal leading-[22px] text-[14px] text-[#4185EC]"> {project_name} </div>
        <div className="flex flex-row mt-1 text-[#898989]">{total_contract} contracts</div>
      </div>
    </div>
  );
};

export const ProjectChainList: FC<DefaultFcProps> = ({ chains }) => {
  const renderChains = () => {
    if (!chains || chains.length < 0) {
      return <></>;
    }

    return (
      <>
        {chains.slice(0, 3).map((c: any) => {
          return (
            <a href={c.url} className="mr-2" key={c.chainId}>
              <img alt={c.name} width="16px" height="16px" src={`/assets/images/networks/${c.chainId}.svg`} />
            </a>
          );
        })}
        {chains.length > 3 && <ShowMoreProjectIcon chains={chains} />}
      </>
    );
  };

  return <>{renderChains()}</>;
};
