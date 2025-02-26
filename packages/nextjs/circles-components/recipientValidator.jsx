import React from "react";
import { validateRecipient } from "../utils/validateRecipient";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const RecipientValidator = ({
  recipient,
  setRecipient,
  recipientIsValid,
  setRecipientIsValid,
}) => {
  const handleValidateRecipient = () => {
    const isValid = validateRecipient(recipient);
    setRecipientIsValid(isValid);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="recipient">Recipient Address</Label>
      <Input
        id="recipient"
        type="text"
        placeholder="Enter recipient address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        onBlur={handleValidateRecipient}
      />
      {!recipientIsValid && (
        <p className="text-red-500">Please enter a valid recipient address</p>
      )}
    </div>
  );
};

export default RecipientValidator;
