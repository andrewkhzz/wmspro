
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';
export type UserRole = 'admin' | 'manager' | 'staff' | 'seller' | 'buyer';
export type SellerType = 'individual' | 'enterprise';

export interface SellerMetrics {
  reliability: number;
  delivery_speed: number;
  integrity_score: number;
  verification_date: string;
}

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
  hourly_rate?: number; 
  department?: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  ai_enhanced?: boolean;
}

// Added AiChatMessage for AI Assistant functionality
export interface AiChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface Conversation {
  id: string;
  type: 'marketplace' | 'support';
  participants: Profile[];
  last_message?: string;
  last_message_time: string;
  unread_count: number;
  subject?: string; // e.g., "Re: Bosch Drill 18V"
  context_id?: string; // e.g., itemId or orderId
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface MarketplaceStory {
  id: string;
  user_id: string;
  full_name: string;
  company: string;
  avatar_url: string;
  title: string; // descriptive title
  content: string;
  cover_image?: string; // AI generated cover
  tags: string[];
  date: string;
  status: 'draft' | 'published'; // management status
  views: number; // engagement tracking
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  items_count: number;
  parent_id?: number;
  description?: string;
  icon_name?: string;
  custom_icon_url?: string;
  color_code?: string;
  metadata?: {
    is_hazardous?: boolean;
    requires_special_handling?: boolean;
    storage_temp_min?: number;
    storage_temp_max?: number;
  };
}

// Added storage components for warehouse management
export interface StorageBin {
  id: string;
  code: string;
  is_occupied: boolean;
  current_quantity: number;
  max_volume?: number;
}

export interface StorageZone {
  id: string;
  name: string;
  code: string;
  zone_type: 'bulk' | 'rack' | 'shelf' | 'bin' | 'cold' | 'hazardous';
  bins?: StorageBin[];
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  capacity_volume: number;
  location_id: string;
  zones?: StorageZone[];
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
  seller_type?: SellerType;
  seller_metrics?: SellerMetrics;
  description?: string;
  tags?: string[];
}

// Added InventoryMovement for tracking asset migrations
/* Fix: Added batch_id to InventoryMovement interface */
export interface InventoryMovement {
  id: string;
  item_id: string;
  item_name: string;
  movement_type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  batch_id?: string;
  from_location_id?: string;
  from_zone_id?: string;
  to_location_id?: string;
  to_zone_id?: string;
  movement_date: string;
  user?: string;
  notes?: string;
  status?: 'completed' | 'pending';
}

// Added Alert interface
export interface Alert {
  id: string;
  type: 'low_stock' | 'moderation' | 'expiration' | 'system';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
}

// Added Batch interface for lot tracking
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
}

// Added Contact and Company for business management
export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  is_own_company: boolean;
  industry?: string;
  website?: string;
  tax_id?: string;
  logo_url?: string;
  contacts?: Contact[];
}

// Added personnel management interfaces
export interface WorkShift {
  id: string;
  user_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'active' | 'completed' | 'scheduled';
}

export interface TimeLog {
  id: string;
  user_id: string;
  shift_id: string;
  clock_in: string;
  clock_out?: string;
  notes?: string;
}

export interface PayrollRecord {
  id: string;
  user_id: string;
  amount: number;
  bonus: number;
  period: string;
  status: 'paid' | 'pending';
  processed_at?: string;
}
