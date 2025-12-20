import React from 'react';
import DashboardStats from '../components/DashboardStats';

interface DashboardPageProps {
  onNavigateMarketplace?: () => void;
}

export default function DashboardPage({ onNavigateMarketplace }: DashboardPageProps) {
  return <DashboardStats onNavigateMarketplace={onNavigateMarketplace} />;
}