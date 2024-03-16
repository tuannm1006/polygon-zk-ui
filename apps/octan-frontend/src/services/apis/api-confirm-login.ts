import { toJson } from "@octan/common";
import { API_URL } from "consts";

export const apiConfirmLogin = (chainId: string, addr: string, signature: string) => fetch(`${API_URL}/login`, {
  method: 'POST',
  body: JSON.stringify({
    "wallet_address": addr,
    "chain_id": chainId,
    "signature": signature
  })
})
  .then(toJson);