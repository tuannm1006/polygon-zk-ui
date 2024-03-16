import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import { useClassName } from 'common';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { useAppContext } from 'contexts';
import { useEffect, useState } from 'react';
import {
  ButtonConnect,
  ButtonV2,
  ConfirmModal,
  DialogTypes,
  MintToken,
  OctanLogoBlack,
  chainIds,
} from 'shared-components';
import { useTronlink } from 'use-tronlink';
import { HamburgerMenu, MenuItems, UserMenu } from '../components';
import { HtmlTooltip } from 'shared-components';
import { useReissueSbt } from 'utils';
import toast from 'react-hot-toast';
import classes from './nav.module.scss';

export const Nav = () => {
  const [openMint, setOpenMint] = useState(false);
  const handleOpenMint = () => setOpenMint(true);
  const handleCloseMint = () => setOpenMint(false);
  const [showReissueConfirm, setShowReissueConfirm] = useState(false);
  const appContext = useAppContext();
  const { loggedIn, selectedChainId, signIn, hasSBT, hasRevokedSbt, fetchUserWallets, userInfo } = appContext;

  const reissueSbt = useReissueSbt();

  const logoClassName = useClassName(classes.textLogo, 'mr-1 min-[419px]:mr-6 mt-10px');

  const {
    address, // The connected wallet address
    walletName, // The wallet name
    trxBalance, // The wallet TRX balance
    isConnected, // A boolean checking it is connected or not
  } = useTronlink();

  const handleReissue = () => {
    console.log('handle Reissue');
    setShowReissueConfirm(true);
  };

  const onReissueCancel = () => {
    setShowReissueConfirm(false);
  };

  const onReissueConfirm = () => {
    void onReissue();
  };

  const onReissue = async () => {
    try {
      // setIsInprogress(true);
      console.log('onReissue');

      const transactionHash = await reissueSbt(appContext);
      console.log('transactionHash ::: ', transactionHash);
      if (!!transactionHash) {
        toast.success('Reissue successful');
        await fetchUserWallets();
      }
    } catch (error: any) {
      if (error.json) {
        const data = await error.json();
        toast.error(`Something wrong ${data}`);
      }
    }
    // setIsInprogress(false);
  };

  useEffect(() => {
    switch (selectedChainId) {
      case chainIds.bttc:
      case chainIds.aurora:
      case chainIds.bsc:
      case chainIds.polygon_zk:
        break;
      case chainIds.tron:
        if (!isConnected) {
          return;
        } else {
          signIn(address, {
            accessToken: '',
            refreshToken: '',
          });
        }
        break;
    }
  }, [isConnected, address]);

  console.log(openMint);

  return (
    <AppBar position="static">
      <div className="flex items-center w-full nav">
        <Link className={logoClassName} to="/">
          <OctanLogoBlack />
        </Link>
        <Divider orientation="vertical" variant="middle" textAlign="center" sx={{ height: '40px' }} />
        <div
          className={classNames(
            'flex pl-1 min-[419px]:pl-2 md:pl-6 justify-between w-full border-solid border-slate-300',
            loggedIn ? 'pr-6' : ''
          )}>
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex gap-6 menu-items">
              <MenuItems />
            </div>
            {/* <ResourceSelect
              options={[
                { label: 'Documents', value: 1 },
                { label: 'Blog', value: 2 },
              ]}
              placeholder="Resources"
            /> */}
            {/* <NetworksMenu /> */}
          </div>
          <div className="flex items-center">
            {loggedIn ? (
              <UserMenu />
            ) : (
              <div className="hidden md:block items-center">
                <ButtonConnect title="Connect wallet" arrow={false} />
              </div>
            )}

            <div className="md:hidden">
              <HamburgerMenu />
            </div>
          </div>
        </div>
        {loggedIn && (
          <>
            <Divider
              orientation="vertical"
              variant="middle"
              textAlign="center"
              sx={{ height: '40px', marginRight: '24px' }}
            />
            <div className="hidden md:flex flex-row justify-end w-[180px] items-center">
              {/* <ButtonV2 onClick={handleOpenMint} className="">
                Mint SBT
              </ButtonV2>{' '} */}
              {/* <HtmlTooltip title="Coming soon" arrow={true} placement="bottom"> */}
              <div>
                {!hasRevokedSbt ? (
                  hasSBT ? (
                    <ButtonV2 disabled className="">
                      <span>Mint SBT</span>
                    </ButtonV2>
                  ) : (
                    <ButtonV2 onClick={() => handleOpenMint()} className="">
                      <span>Mint SBT</span>
                    </ButtonV2>
                  )
                ) : (
                  <></>
                )}
                {hasRevokedSbt && (
                  <div>
                    <ButtonV2 className="w-[161px]" onClick={handleReissue}>
                      Re-issue
                    </ButtonV2>

                    <ConfirmModal
                      type={DialogTypes.None}
                      open={showReissueConfirm}
                      handleClose={onReissueCancel}
                      handleConfirm={onReissueConfirm}>
                      <div className="flex flex-col">
                        <div className="flex justify-center">
                          <img src="/assets/images/user-information/confirm-modal-warning.svg" />
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="w-[548px] text-center text-zinc-900 text-[24px] font-medium leading-loose">
                            Do you want to proceed with re-issuing the SBT?
                          </div>
                          <div className="w-[548px] text-center text-zinc-500 text-[18px] font-normal leading-7">
                            Re-issuing soulbound token (SBT) will help you retrieve a previously minted SBT. This SBT
                            will be attached to your primary wallet and will accumulate scores based on the total scores
                            of the remaining imported wallets.
                          </div>
                        </div>
                      </div>
                    </ConfirmModal>
                  </div>
                )}
              </div>
              {/* </HtmlTooltip> */}
            </div>
            {openMint && <MintToken open={openMint} handleClose={handleCloseMint} onConfirm={handleOpenMint} />}
          </>
        )}
      </div>
    </AppBar>
  );
};
