"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DealFinderProps {
  name: string;
  bio: string;
  avatar: string;
  deals: number;
}

export function DealFinder({ name, bio, avatar, deals }: DealFinderProps) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <Avatar className="h-12 w-12">
        <img src={avatar} alt={name} className="object-cover" />
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <Badge variant="secondary">
            {deals} deals found
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mt-1">{bio}</p>
      </div>
    </div>
  );
}