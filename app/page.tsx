"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FlightCard } from "@/components/FlightCard";
import { SuggestDealSection } from "@/components/SuggestDealSection";
import { TripTags } from "@/components/filters/TripTags";
import { RegionSelect } from "@/components/filters/RegionSelect";
import { DealsHeader } from "@/components/deals/DealsHeader";
import type { TripTag, FlightDeal } from "@/types/flight";
import type { SortOption } from "@/components/filters/SortSelect";
import { flightDeals } from "@/data/flightDeals";

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState("EUROPE");
  const [selectedTags, setSelectedTags] = useState<TripTag[]>([]);
  const [currentSort, setCurrentSort] = useState<SortOption>("featured");

  const handleTagSelect = (tag: TripTag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const sortDeals = (deals: FlightDeal[]): FlightDeal[] => {
    const sortedDeals = [...deals];
    
    switch (currentSort) {
      case "price-asc":
        return sortedDeals.sort((a, b) => 
          parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''))
        );
      case "price-desc":
        return sortedDeals.sort((a, b) => 
          parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''))
        );
      case "featured":
      default:
        return sortedDeals.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
    }
  };

  const filteredDeals = sortDeals(
    flightDeals.filter(deal => 
      selectedTags.length === 0 || 
      selectedTags.some(tag => deal.tags.includes(tag))
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Filters Section */}
            <div className="bg-white rounded-xl border border-[#EAEAEA] p-8 space-y-8">
              <RegionSelect
                selectedRegion={selectedRegion}
                onRegionSelect={setSelectedRegion}
              />
              <TripTags
                selectedTags={selectedTags}
                onTagSelect={handleTagSelect}
              />
            </div>

            {/* Deals Grid */}
            <div className="space-y-6">
              <DealsHeader 
                dealsCount={filteredDeals.length}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal) => (
                  <FlightCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>

            <SuggestDealSection />
          </div>
        </div>
      </div>
    </div>
  );
}