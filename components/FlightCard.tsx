"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { FlightDeal } from "@/types/flight";
import { FlightDialog } from "@/components/FlightDialog";
import { Flame } from "lucide-react";
import { useState } from "react";

interface FlightCardProps {
  deal: FlightDeal;
}

export function FlightCard({ deal }: FlightCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative h-48">
          <img
            src={deal.image}
            alt={deal.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 hover:bg-white text-black">
              {deal.class}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {deal.isHot && (
              <Badge className="bg-red-100/90 text-red-700 flex items-center gap-1">
                <Flame className="h-3 w-3" />
                HOT
              </Badge>
            )}
            <Badge className="bg-green-100/90 text-green-800">
              {deal.discount}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">{deal.destination}</h3>
            <span className="text-xs text-gray-500">{deal.postedAt}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <p>{deal.date} · {deal.stops}</p>
            <p>From {deal.from}</p>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-xl font-bold text-gray-900">{deal.price}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">{deal.originalPrice}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {deal.tags.map((tag) => (
              <Tag key={tag} tag={tag} size="sm" />
            ))}
          </div>
        </div>
      </Card>
      <FlightDialog 
        deal={deal} 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
}