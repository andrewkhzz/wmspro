
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';
export type UserRole = 'admin' | 'manager' | 'staff' | 'seller' | 'buyer';

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  subscription_tier?: SubscriptionTier;
  email?: string;
  last_active?: string;
  status?: 'active' | 'suspended' | 'pending';
}

export interface Company {
  id: string;
  name: string;
  tax_id?: string;
  registration_number?: string;
  address: string;
  city: string;
  country: string;
  website?: string;
  email: string;
  phone: string;
  is_own_company: boolean;
  industry?: string;
  logo_url?: string;
  contacts?: Contact[];
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position: string;
  company_id: string;
}

export interface Batch {
  id: string;
  batch_number: string;
  item_id: string;
  item_name: string;
  initial_quantity: number;
  current_quantity: number;
  production_date: string;
  expiry_date: string;
  status: 'active' | 'quarantine' | 'expired';
  location_id: string;
  zone_id?: string;
  bin_id?: string;
}

export interface MarketplaceStory {
  id: string;
  user_id: string;
  full_name: string;
  company: string;
  avatar_url: string;
  content: string;
  tags: string[];
  date: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  items_count: number;
}

export interface Location {
  id: string;
  user_id?: string;
  name: string;
  description?: string;
  location_code: string;
  type: 'home' | 'warehouse' | 'retail' | 'other';
  address: string;
  city: string;
  region?: string;
  postal_code?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  contact_phone?: string;
  contact_email?: string;
  working_hours?: Record<string, string>;
  is_public: boolean;
  is_active: boolean;
  is_default: boolean;
  allow_pickup: boolean;
  items_count: number;
  created_at?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  capacity_volume: number;
  location_id: string;
  zones?: StorageZone[];
}

export interface StorageZone {
  id: string;
  name: string;
  code: string;
  zone_type: 'bulk' | 'rack' | 'shelf' | 'bin' | 'cold' | 'hazardous';
  bins?: StorageBin[];
}

export interface StorageBin {
  id: string;
  code: string;
  is_occupied: boolean;
  current_quantity: number;
  max_volume?: number;
}

export interface Item {
  id: string;
  title: string;
  inventory_number: string;
  quantity: number;
  available_quantity: number;
  reserved_quantity: number;
  price: number;
  status: 'draft' | 'active' | 'sold' | 'archived';
  category_id: number;
  location_id?: string;
  zone_id?: string;
  bin_id?: string;
  image_url?: string;
  condition: string;
  requires_moderation: boolean;
  is_featured?: boolean;
  seller_name?: string;
  seller_rating?: number;
  description?: string;
  tags?: string[];
}

export interface InventoryMovement {
  id: string;
  item_id: string;
  item_name: string;
  batch_id?: string; // Tighter integration with Batch Inventory
  movement_type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  from_location_id?: string;
  from_zone_id?: string;
  to_location_id?: string;
  to_zone_id?: string;
  movement_date: string;
  user?: string;
  notes?: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Alert {
  id: string;
  type: 'low_stock' | 'moderation' | 'expiration' | 'system';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
}

export interface AiChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}
