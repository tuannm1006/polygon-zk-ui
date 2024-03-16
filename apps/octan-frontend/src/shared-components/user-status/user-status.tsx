import clsx from 'clsx';
import { DefaultFcProps } from 'common';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ConfirmMintToken,
  CountdownClock,
  Dialog,
  DialogMintSuccess,
  DialogTypes,
  GradientButton,
  OutlinedGradientButton,
} from 'shared-components';
import { useEmit, useMintSbt } from 'utils';

import classes from './user-status.module.scss';
import { chainIds } from 'consts';
import { showModalActions } from '../../app/helpers';
import { useAppContext } from 'contexts';
import { isEmpty, isNil, propOr } from 'ramda';
import { Link } from 'react-router-dom';

const ButtonScore: React.FC<
  DefaultFcProps & {
    active?: boolean;
    text: string;
    score: number;
    onClick: () => void;
  }
> = ({ className, text, score, active, onClick }) => (
  <div className={clsx(classes.btnScore, active && classes.btnScoreActive, className)} onClick={onClick}>
    <span className="text-white font-bold">{text}</span>
    <span className="text-[#8A939B] text-[14px]">Reputation Score</span>
    <span className="linear-text font-bold">{score >= 0 ? score : '-'}</span>
  </div>
);

const ButtonImage: React.FC<DefaultFcProps & { active?: boolean }> = ({ className, text, active }) => {
  return (
    <div className={clsx('absolute', className)}>
      <div className="relative w-[215px] h-[42px]">
        <img
          className="absolute top-0 left-0"
          src={
            active ? '/assets/images/user-information/button-active.png' : '/assets/images/user-information/button.png'
          }
          height={42}
          width={215}
          alt={text}
        />
        <div className={clsx('flex justify-center items-center w-full h-full', active && 'linear-text')}>{text}</div>
      </div>
    </div>
  );
};

export type UserStatusProps = DefaultFcProps;

export const UserStatus: React.FC<UserStatusProps> = ({ className }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [textOfButton, setTextOfButton] = useState('');

  const [activeButtonIndex, setActiveButtonIndex] = useState(-1);

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

  const appContext = useAppContext();

  const {
    userInfo,
    userAddress,
    hasRevokedSbt,
    loggedIn,
    hasSBT,
    selectedChain,
    reputationScore,
    nextUpdateReputationScore,
  } = appContext;

  const mintSbt = useMintSbt();

  const verifiedEmail = useMemo(() => !!userInfo?.isVerifyEmail, [userInfo]);

  const [inprogress, setInprogress] = useState(false);
  const [openMintToken, setOpenMintToken] = useState(false);

  const gotoProfile = () => {
    navigate('/profile/account-setting');
  };

  const emit = useEmit();

  const mintOnBsc = async () => {
    try {
      if (hasSBT) {
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: 'You minted already',
        });
        return;
      }
      setInprogress(true);

      const transactionHash = await mintSbt(appContext);
      if (!!transactionHash) {
        setTxHash(transactionHash);
        setIsOpenSuccess(true);
      }
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        emit({
          action: showModalActions.showWarning,
          type: DialogTypes.Error,
          title: 'Error',
          subTitle: propOr('Something wrong', 'message', data),
        });
      }
    }

    setInprogress(false);
  };

  const mint = () => {
    if (!selectedChain) return;
    switch (selectedChain.id) {
      case chainIds.polygon_zk:
        mintOnBsc();
        break;
    }
  };

  const onMintNowClick = () => {
    if (verifiedEmail) setOpenMintToken(true);
    else {
      if (isEmpty(userInfo)) {
        setTitle('Update profile');
        setSubTitle('You need to Update your profile!');
        setTextOfButton('Go to Profile ->');
      } else {
        setTitle('Verify Email');
        setSubTitle('You need to verify your email!');
        setTextOfButton('Go to Verify ->');
      }
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className={clsx(className, 'flex justify-center')}>
        <div className="flex flex-col items-center md:pt-[110px] w-full lg:w-[847px] relative">
          <div className="mb-6 py-44 md:py-0">
            {/* <img className="w-64 md:w-auto" src="/assets/images/user-information/character.svg" alt="user info" /> */}
            <img
              className="w-64 md:w-auto"
              src={
                loggedIn
                  ? '/assets/images/user-information/character-active.svg'
                  : '/assets/images/user-information/character.svg'
              }
              alt="user info"
            />

            <ButtonImage
              text="Telegram"
              className="right-1/2 translate-x-1/2 md:translate-x-0 md:right-[72px] md:bottom-40 top-[420px] md:top-[90px]"
              // active={true}
            />
            <i className={clsx(classes.line, classes.line1, false && classes.active, 'hidden md:block')} />
            <ButtonImage
              text="Facebook"
              className="right-1/2 translate-x-1/2 md:translate-x-0 md:right-[72px] md:bottom-[calc(10rem-56px)] top-[480px] md:top-[158px]"
            />
            <i className={clsx(classes.line, classes.line2, 'hidden md:block')} />
            <ButtonImage
              text="KYC"
              className="right-1/2 translate-x-1/2 md:translate-x-0 md:right-[72px] md:bottom-[calc(10rem-112px)] top-[540px] md:top-[223px]"
            />
            <i className={clsx(classes.line, classes.line3, 'hidden md:block')} />

            <ButtonImage
              text="Email"
              className="left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[65px] top-0 md:top-[90px]"
              active={verifiedEmail}
            />
            <i className={clsx(classes.line, classes.line4, verifiedEmail && classes.active, 'hidden md:block')} />
            <ButtonImage
              text="Twitter"
              className="left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[65px] top-14 md:top-[158px]"
            />
            <i className={clsx(classes.line, classes.line5, 'hidden md:block')} />
            <ButtonImage
              text="Discord"
              className="left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[65px] top-28 md:top-[223px]"
            />
            <i className={clsx(classes.line, classes.line6, 'hidden md:block')} />
          </div>
          {!loggedIn ? (
            <div className="flex flex-row gap-3 items-center">
              <h1 className="text-2xl font-bold text-white">Reputation Score:</h1>
              <span className="linear-text">-</span>
            </div>
          ) : hasSBT ? (
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-wrap flex-col sm:flex-row gap-3 items-center mb-6">
                <ButtonScore
                  text="Global"
                  score={isNil(reputationScore) ? -1 : Number(reputationScore)}
                  active={activeButtonIndex === 1}
                  onClick={() => setActiveButtonIndex(1)}
                />
                <ButtonScore
                  text="Defi"
                  score={-1}
                  active={activeButtonIndex === 2}
                  onClick={() => setActiveButtonIndex(2)}
                />
                <ButtonScore
                  text="NFT"
                  score={-1}
                  active={activeButtonIndex === 3}
                  onClick={() => setActiveButtonIndex(3)}
                />
                <ButtonScore
                  text="DAO"
                  score={-1}
                  active={activeButtonIndex === 4}
                  onClick={() => setActiveButtonIndex(4)}
                />
                <ButtonScore
                  text="Gamefi"
                  score={-1}
                  active={activeButtonIndex === 5}
                  onClick={() => setActiveButtonIndex(5)}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <Link to="/profile/account-setting">
                  <OutlinedGradientButton className="w-full md:w-[230px] h-[48px]">
                    Account Management
                  </OutlinedGradientButton>
                </Link>
                {/* <GradientButton
                  onClick={gotoProfile}><span className='text-[14px]'>Next update in:</span></GradientButton> */}
                <GradientButton disabled onClick={gotoProfile}>
                  <span className="text-[14px] mr-3">Next update in:</span>
                  {/* <CountdownClock finnishAt={nextUpdateReputationScore || new Date()} /> */}
                  <span className="linear-text text-[20px]">Coming soon</span>
                </GradientButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <span className="text-lg">You haven't had SBT on {selectedChain?.name}:</span>
              <div className="flex flex-row gap-3 justify-center">
                <Link to="/profile/account-setting">
                  <OutlinedGradientButton className="w-full md:w-[230px] h-[48px]">
                    Account Management
                  </OutlinedGradientButton>
                </Link>
                <GradientButton
                  disabled={inprogress || (!!userInfo?.primaryWallet && userInfo?.primaryWallet !== userAddress)}
                  onClick={onMintNowClick}>
                  {hasRevokedSbt ? 'Re-Issue SBT' : 'Mint SBT'}
                </GradientButton>
              </div>
              {!!userInfo?.primaryWallet && userInfo?.primaryWallet !== userAddress && (
                <span>
                  You need to connect primary wallet to Octan Network to {hasRevokedSbt ? 'Re-Issue SBT' : 'Mint SBT'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <Dialog
          type={DialogTypes.Warning}
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          title={title}
          subTitle={subTitle}>
          <GradientButton fullWidth onClick={gotoProfile}>
            {textOfButton}
          </GradientButton>
        </Dialog>
      )}
      {isOpenSuccess && (
        <DialogMintSuccess txHash={txHash} open={isOpenSuccess} handleClose={() => setIsOpenSuccess(false)} />
      )}
      {openMintToken && (
        <ConfirmMintToken
          open={openMintToken}
          handleClose={() => setOpenMintToken(false)}
          onConfirm={() => {
            setOpenMintToken(false);
            mint();
          }}
        />
      )}
    </>
  );
};
