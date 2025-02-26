import { ethers } from "ethers";

export const validateRecipient = (recipient) => {
  return ethers.isAddress(recipient);
};