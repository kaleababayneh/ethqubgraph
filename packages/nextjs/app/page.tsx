"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { Balance } from "~~/components/scaffold-eth";
import HomeTopHeader from "~~/components/custom/HomeTopHeader";
import Header from "~~/components/custom/Header";
import HomeBody from "~~/components/custom/HomeBody";


const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  return (
   <div className="container">
   
    <HomeTopHeader />
    <Header  />
    <HomeBody />

    </div>
  );
};

export default Home;
