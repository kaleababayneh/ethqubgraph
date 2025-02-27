"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { ThirdwebProvider } from "thirdweb/react";

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

//export const metadata = getMetadata({ title: " ETHqub", description: " ETHqub: Community Saving & Lending",  });



import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CirclesSDK } from "../contexts/CirclesSDK";



const ScaffoldEthApp =  ({ children }: { children: React.ReactNode }) => {

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

