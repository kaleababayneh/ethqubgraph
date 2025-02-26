import React, { useEffect } from "react";

const TrustRelations = ({
  avatarInfo,
  setTrustedCircles,
  setTrustRelations,
}) => {
  useEffect(() => {
    const trustRelationsHandle = async () => {
      try {
        const trustRelations = await avatarInfo.getTrustRelations("");
        console.log("Trust Relations:", trustRelations);

        // Map relations for trustedCircles and differentiate by type
        const trustedCircles = trustRelations
          .filter((rel) => rel.relation === "trusts")
          .map((rel) => rel.objectAvatar);

        const mappedRelations = trustRelations.map((rel) => ({
          timestamp: rel.timestamp,
          objectAvatar: rel.objectAvatar,
          relation:
            rel.relation === "trustedBy"
              ? "Incoming Trust"
              : rel.relation === "trusts"
              ? "Outgoing Trust"
              : rel.relation === "mutuallyTrusts"
              ? "Mutually Trusted"
              : "Unknown Relation",
        }));

        // Set state
        setTrustedCircles(trustedCircles);
        setTrustRelations(mappedRelations);

        console.log(mappedRelations, "Mapped Data");
      } catch (error) {
        console.error("Error processing trust relations:", error);
      }
    };

    if (avatarInfo) {
      trustRelationsHandle(); // Call the function here
    }
  }, [avatarInfo, setTrustedCircles, setTrustRelations]);

  return null;
};

export default TrustRelations;
