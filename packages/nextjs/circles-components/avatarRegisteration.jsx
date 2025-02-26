import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card";

export function AvatarRegistration({ onRegisterV2 }) {
  const [inviterAddress, setInviterAddress] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    if (!inviterAddress || !avatarName) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await onRegisterV2(inviterAddress, avatarName);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register V2 Avatar</CardTitle>
        <CardDescription>
          Enter your inviter's address and choose a name for your avatar
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inviterAddress">Inviter Address</Label>
            <Input
              id="inviterAddress"
              type="text"
              placeholder="0x..."
              value={inviterAddress}
              onChange={(e) => setInviterAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarName">Avatar Name</Label>
            <Input
              id="avatarName"
              type="text"
              placeholder="Enter your avatar name"
              value={avatarName}
              onChange={(e) => setAvatarName(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRegister} className="w-full">
          Register Avatar
        </Button>
      </CardFooter>
    </Card>
  );
}
