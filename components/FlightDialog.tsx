"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FlightDeal } from "@/types/flight";
import { ShareButton } from "@/components/flight/ShareButton";
import { Tag } from "@/components/ui/tag";
import { DealImage } from "@/components/flight/DealImage";
import { FlightRoute } from "@/components/flight/FlightRoute";
import { DealAmenities } from "@/components/flight/DealAmenities";
import { DealDisclaimer } from "@/components/flight/DealDisclaimer";
import { DealPricing } from "@/components/flight/DealPricing";

interface FlightDialogProps {
  deal: FlightDeal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FlightDialog({ deal, open, onOpenChange }: FlightDialogProps) {
  const dealUrl = `https://tripwingz.com/deals/${deal.id}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 sm:p-0">
        <DialogTitle className="sr-only">
          Flight Deal Details for {deal.destination}
        </DialogTitle>
        
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute right-4 sm:right-8 top-4 sm:top-8 z-50"
          aria-label="Close dialog"
        >
          <div className="bg-black/50 backdrop-blur-md rounded-full p-2 hover:bg-black/60 transition-colors">
            <X className="h-4 w-4 text-white" />
          </div>
        </button>
        
        <div className="space-y-6">
          <DealImage 
            image={deal.image}
            destination={deal.destination}
            discount={deal.discount}
            isHot={deal.isHot}
          />

          <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
            <DealPricing 
              price={deal.price}
              originalPrice={deal.originalPrice}
              date={deal.date}
            />

            <FlightRoute 
              departureTime={deal.departureTime}
              arrivalTime={deal.arrivalTime}
              from={deal.from}
              destination={deal.destination}
              duration={deal.duration}
            />

            <div className="flex flex-wrap gap-2">
              {deal.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <img
                  src={deal.dealFinder.avatar}
                  alt={deal.dealFinder.name}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{deal.dealFinder.name}</p>
                  <p className="text-sm text-gray-500">{deal.dealFinder.bio}</p>
                </div>
              </div>
            </div>

            <DealAmenities amenities={deal.amenities} />

            <div className="space-y-3 pb-6">
              <Button 
                className="w-full bg-black text-white hover:bg-black/90 h-11 sm:h-12 text-base sm:text-lg"
                onClick={() => window.open(dealUrl, '_blank')}
              >
                Book Now
              </Button>
              <ShareButton dealUrl={dealUrl} />
              <DealDisclaimer />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}