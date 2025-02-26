"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { ThirdwebProvider } from "thirdweb/react";


import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CirclesSDK } from "../contexts/CirclesSDK";
import { Profile } from '@circles-sdk/profiles';


// import Dashboard from "./circles-components/dashboard";
// import CirclesOnboarding from "./circles-components/circlesonboarding";

import { Climate_Crisis} from "next/font/google"
import { Anek_Bangla } from "next/font/google";

const ClimateCrisis = Climate_Crisis({
  variable: "--font-climate-crisis",
  subsets: ["latin"],
  axes: ["YEAR"]
});

const AnekBangla = Anek_Bangla({
  variable: "--font-anek-bangla",
  subsets: ["latin"],
});

// export const metadata = getMetadata({ title: " ETHqub", description: " ETHqub: Community Saving & Lending",  });
// TEST

import { CirclesConfig, Sdk } from '@circles-sdk/sdk';
import {BrowserProviderContractRunner} from "@circles-sdk/adapter-ethers"



export const circlesConfig: CirclesConfig = {
  circlesRpcUrl: "https://static.94.138.251.148.clients.your-server.de/rpc/",
  v1HubAddress: "0x29b9a7fbb8995b2423a71cc17cf9810798f6c543",
  v2HubAddress: "0x3D61f0A272eC69d65F5CFF097212079aaFDe8267",
  migrationAddress: "0x28141b6743c8569Ad8B20Ac09046Ba26F9Fb1c90",
  nameRegistryAddress: "0x8D1BEBbf5b8DFCef0F7E2039e4106A76Cb66f968",
  baseGroupMintPolicy: "0x79Cbc9C7077dF161b92a745345A6Ade3fC626A60",
  profileServiceUrl: "https://static.94.138.251.148.clients.your-server.de/profiles/",
};


export let cropWidth: number = 256;
export let cropHeight: number = 256;
export let imageDataUrl: string | undefined;
 

const WalletAddress = "0x7a30d670ebEb9620E35bC6034AeE69c4Fa5BC50B";
const IpfsAddress = "bafkreib7ad4v3uij2fych73wgu2r3zwhosjbzrjipxaehcr7ispu7b7hdu";
const Address2 =  "0xb2c687872791f1f39e2b9e52508a7b6963ff1d7b";



const newProfile: Profile = {
  name: "Kaleab Avatar Name",
  description: "Kaleab Updated description for the avatar.",
  imageUrl: "ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
  // previewImageUrl : "ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
};



const ScaffoldEthApp =  ({ children }: { children: React.ReactNode }) => {

    React.useEffect(() => {
      const fetchAvatar = async () => {
        const adapter = new BrowserProviderContractRunner();
        await adapter.init();

        const sdk = new Sdk(adapter, circlesConfig);

        let avatar = await sdk.getAvatar(WalletAddress);

        // avatar.updateProfile(newProfile);

        // console.log("Avatar 12345:", avatar);

        // const isTrusted = await avatar.trusts(Address2);

       // avatar.

        // console.log(isTrusted); 
        const receipt = await avatar.updateProfile(newProfile);
        console.log("Metadata updated successfully:", receipt);
        console.log("Avatar 678910:", avatar);


 
      };
      fetchAvatar();
    }, []);




  //const avatarInfo =  circlesData.getAvatarInfo("0xAvatarAddress");
  return (
    <html suppressHydrationWarning>
      <body className={`${ClimateCrisis.variable} ${AnekBangla.variable} dark`}>
      <ThirdwebProvider>
          <ThemeProvider enableSystem>
            <ScaffoldEthAppWithProviders>  
              <CirclesSDK>
                <Router>
                    {children}
                  </Router>
              </CirclesSDK>
            </ScaffoldEthAppWithProviders>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;

{/*
  
      return (
        <CirclesSDK>
          <Router>
                          <Routes>
                            {/* Route for Circles Onboarding *
                            <Route
                              path="/"
                              element={
                                <CirclesOnboarding setTrustRelations={setTrustRelations} />
                              }
                            />

                            {/* Route for Dashboard *
                            <Route
                              path="/dashboard"
                              element={<Dashboard trustRelations={trustRelations} />}
                            />
                          </Routes>
          </Router>
        </CirclesSDK>
      );
    }

  
  */}

function dispatch(arg0: string, arg1: { dataUrl: string; }) {
  throw new Error("Function not implemented.");
}
