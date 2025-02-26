import React, { useState } from "react";
import { Button } from "../components/ui/button";

const PersonalMintComponent = ({ avatarInfo, circlesAddress, handleregi }) => {
  const [totalBalance, setTotalBalance] = useState(0);

  const personalMint = async () => {
    try {
      if (!avatarInfo) {
        throw new Error("Avatar not found");
      }

      await avatarInfo.personalMint();

      // Update total balance after minting
      const Balance = await avatarInfo.getMintableamount(circlesAddress);
      setTotalBalance(totalBalance);

      return { success: true, message: "Personal minting successful" };
    } catch (error) {
      throw new Error(`Error minting Circles: ${error.message}`);
    }
  };
  return (
    <Button
      onClick={personalMint}
      className="mt-2 bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
    >
      Mint Circles
    </Button>
  );
};
export default PersonalMintComponent;
