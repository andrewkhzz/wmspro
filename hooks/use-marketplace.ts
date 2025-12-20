
import { useState, useMemo } from 'react';
import { MOCK_ITEMS } from '../lib/constants';

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  conditions: string[];
}

export function useMarketplace() {
  const [categoryFilter, setCategoryFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    minRating: 0,
    conditions: []
  });

  const featuredItems = useMemo(() => 
    MOCK_ITEMS.filter(item => item.is_featured && item.status === 'active'),
  []);

  const filteredListings = useMemo(() => {
    return MOCK_ITEMS.filter(item => {
      const matchesCategory = categoryFilter === 'all' || item.category_id === categoryFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.seller_name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
      const matchesRating = (item.seller_rating || 0) >= filters.minRating;
      const matchesCondition = filters.conditions.length === 0 || filters.conditions.includes(item.condition);
      
      return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesCondition && item.status === 'active';
    });
  }, [categoryFilter, searchQuery, filters]);

  return {
    featuredItems,
    listings: filteredListings,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters
  };
}
