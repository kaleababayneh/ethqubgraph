"use client";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import HomeTopHeader from "~~/components/custom/HomeTopHeader";
import Header from "~~/components/custom/Header";
import HomeBody from "~~/components/custom/HomeBody";


const Home: NextPage = () => {


  

  return (
   <div className="container">
      <div  className="custom-sticky"> 
        <HomeTopHeader />
        <Header  />
      </div>
      <HomeBody />
    </div>
  );
};

export default Home;
