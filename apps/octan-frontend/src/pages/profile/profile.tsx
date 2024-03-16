import { Container } from '@mui/material';
import { DefaultFcProps } from 'common';
import { ContentPanel, LeftMenu } from './components';
import { useParams } from 'react-router-dom';
import banner from '../../asserts/images/1id/Octan-banner.png';
import { useAppContext } from 'contexts';
import { useEffect } from 'react';
export type ProfileProps = DefaultFcProps;

const renderContent = (slug: string) => {
  const appContext = useAppContext();
  const { hasSBT } = appContext;
  if (slug === 'account-setting') {
    return (
      <>
        <ContentPanel slug="account-setting" className="w-full mt-6 bg-transparent md:bg-white rounded-2xl p-6" />
        <ContentPanel slug="social-profile" className="w-full mt-6 bg-transparent md:bg-white rounded-2xl p-6" />
        <ContentPanel slug="kyc" className="w-full mt-6 bg-transparent md:bg-white rounded-2xl p-6" />
      </>
    );
  } else if (slug === 'sbts-management') {
    return (
      <>
        <ContentPanel slug="sbts-management" className="w-full mt-6 bg-transparent md:bg-white rounded-2xl p-6 " />
        {hasSBT && (
          <ContentPanel slug="list-wallet" className="w-full mt-6 bg-transparent md:bg-white rounded-2xl p-6 " />
        )}
      </>
    );
  } else {
    return <ContentPanel slug={slug} className="w-full mt-6 bg-transparent md:bg-white rounded-2xl p-6" />;
  }
};

export const Profile: React.FC<ProfileProps> = () => {
  const { slug } = useParams();

  return (
    <Container className="bg-profile app-content profile-page min-h-[80vh] !px-[80px]" maxWidth="xl">
      <section className="flex w-full flex-row gap-6 pb-[200px]">
        <div className="flex flex-col w-full">
          <LeftMenu className="flex flex-col hidden md:block" />
          <div className="w-full mr-6">{renderContent(slug || 'account-setting')}</div>
        </div>
        <img src={banner} className="max-w-[302px] max-h-[537px] mt-10 " alt="Failed" />
      </section>
    </Container>
  );
};
