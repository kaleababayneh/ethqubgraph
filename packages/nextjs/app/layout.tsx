import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";


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

export const metadata = getMetadata({ title: " ETHqub", description: "Community Saving",  });

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className={`${ClimateCrisis.variable} ${AnekBangla.variable}`}>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
