export type Chain = {
  id: string;
  name: string;
  url?: string;
  testnet_url?: string;
  grpc_url?: string;
  testnet_grpc_url?: string;
  // ws_url: string;
  // testnet_ws_url: string;
  // desc: string;
  // is_support: boolean;
  chain_id?: number;
  chain_id_testnet?: number;
  // created_at: number;
  // updated_at: number;

  icon: string;
  subDomain?: string,
  visible: boolean;
  enable: boolean;

  nativeCurrency?: {
    name: string;
    decimals: number;
    symbol: string;
  },
  testnet_nativeCurrency?: {
    name: string;
    decimals: number;
    symbol: string;
  },
}