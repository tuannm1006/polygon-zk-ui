import { useAppContext } from './../../contexts/app-context/app-context';
import { isNotEmpty } from "@octan/common";
import { useMemo } from "react";
import { getChainNameBySubDomain } from "utils";

export const useCurrentNetwork = () => {
  const {
    selectedChainId,
    setSelectedChainId,
    chains = []
  } = useAppContext()
  const networks = useMemo(() => chains.filter((chain) => chain.visible), [chains]);
  const selectedNetWork = useMemo(() => {
    const matchedItem = networks.find((network) => {
      return network.id === selectedChainId;
    });
    if (!matchedItem && isNotEmpty(networks)) {
      const chainName = getChainNameBySubDomain();
      const matchedChain = networks.find((nw: any) => nw.name.toLowerCase() === chainName);
      setSelectedChainId(matchedChain ? matchedChain.id : networks[0].id);
    }

    return matchedItem || networks[0];
  }, [networks, selectedChainId]);

  return selectedNetWork
}