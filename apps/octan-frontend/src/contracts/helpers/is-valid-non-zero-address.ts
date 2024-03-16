import { ZERO_ADDRESS } from "../constants";

export const isValidNonZeroAddress = (address: string) => !address.localeCompare(ZERO_ADDRESS)