import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

export function InvitePeoplePopup({ isOpen, onClose, onInvite }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async () => {
    if (!address) {
      setError('Please enter an address');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await onInvite(address); // Call the provided onInvite function
      onClose(); // Close the dialog
    } catch (err) {
      console.error('Error inviting user:', err);
      setError('Failed to invite user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite People to Circles</DialogTitle>
          <DialogDescription>
            Enter the address of the person you want to invite to the Circles network.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="col-span-3"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleInvite} disabled={isLoading}>
            {isLoading ? 'Inviting...' : 'Invite'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
