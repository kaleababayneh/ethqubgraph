import { createConfig, http } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});