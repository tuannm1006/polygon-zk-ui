import clsx from 'clsx';
import { DefaultFcProps, useClassName } from 'common';

type CommunityCardProps = DefaultFcProps & {
  isVerify?: boolean;
};

export const CommunityCard: React.FC<CommunityCardProps> = ({ className, isVerify = false }) => {
  const combinedClassName = useClassName(className, "w-full p-6 rounded-3xl border border-[#323232] cursor-pointer");
  return (
    <div className={combinedClassName}>
      <div className="flex justify-between items-center mb-4">
        <img src="/assets/images/communities/one-inch.png" alt="" width={40} height={40} />
        {isVerify && <i className="octan-icon octan-icon--badge-check" />}
      </div>
      <div className={clsx('font-medium', { 'linear-text': !isVerify })}>Comunity with oneinch</div>
    </div>
  );
};
