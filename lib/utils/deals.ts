// Utility functions for deals
export const generateDiscount = (basePrice: number): {
  discount: number,
  originalPrice: number
} => {
  // Fixed discount range to avoid hydration issues
  const discount = 45;
  const originalPrice = Math.floor(basePrice * (100 / (100 - discount)));
  
  return {
    discount,
    originalPrice
  };
};

export const getBasePrice = (city: string): number => {
  const prices: Record<string, number> = {
    'Paris': 214,
    'Amsterdam': 189,
    'Rome': 245,
    'Barcelona': 199,
    'London': 179
  };
  
  return prices[city] || 199;
};

export const isHotDeal = (city: string): boolean => {
  const hotDeals = ['Paris', 'Barcelona'];
  return hotDeals.includes(city);
};