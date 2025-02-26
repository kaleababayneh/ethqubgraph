import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";

const ManageTrustAndUntrust = ({
  avatarInfo,
  logTrustRelations,
  trustedCircles,
  setTrustedCircles,
  untrustedCircles,
  setUntrustedCircles,
}) => {
  const [newCircle, setNewCircle] = useState("");

  // Function to trust a new circle
  const trustNewCircle = async () => {
    try {
      if (!avatarInfo) {
        throw new Error("Avatar not found");
      }

      await avatarInfo.trust(newCircle);
      setTrustedCircles((prev) => [...prev, newCircle]);
      setUntrustedCircles((prev) => prev.filter((c) => c !== newCircle));
      setNewCircle("");
    } catch (error) {
      console.error("Error trusting new circle:", error);
    }
  };

  // Function to untrust a circle
  const untrustCircle = async (circle) => {
    try {
      if (!avatarInfo) {
        throw new Error("Avatar not found");
      }

      await avatarInfo.untrust(circle);
      setUntrustedCircles((prev) => [...prev, circle]);
      setTrustedCircles((prev) => prev.filter((c) => c !== circle));
      logTrustRelations();
    } catch (error) {
      console.error("Error untrusting circle:", error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          id="newCircle"
          type="text"
          placeholder="Enter new circle address"
          value={newCircle}
          onChange={(e) => setNewCircle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents form submission or other unintended actions
              trustNewCircle();
            }
          }}
          className="flex-1"
        />
        <Button
          onClick={trustNewCircle} // Trust the new circle without passing newCircle
          className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded"
        >
          Trust
        </Button>
      </div>
      <ScrollArea
        style={{ maxHeight: "150px", overflowY: "auto", marginTop: "10px" }}
        className="custom-scroll-area"
      >
        <div className="space-y-2">
          {[...trustedCircles, ...untrustedCircles].map((circle, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
            >
              <div>{circle}</div>
              {trustedCircles.includes(circle) ? (
                <Button
                  onClick={() => untrustCircle(circle)}
                  variant="outline"
                  size="sm"
                >
                  Untrust
                </Button>
              ) : (
                <Button
                  onClick={() => trustNewCircle(circle)}
                  variant="outline"
                  size="sm"
                >
                  Trust
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ManageTrustAndUntrust;
