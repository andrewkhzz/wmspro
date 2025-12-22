
import { Item, Warehouse, InventoryMovement, Alert, Category, Location, Profile, MarketplaceStory, Batch, Company } from './types';

export const APP_NAME = "NexusAI WMS";

export const MOCK_COMPANIES: Company[] = [
  {
    id: "comp-001",
    name: "Nexus Logistics Group",
    tax_id: "RU-123456789",
    registration_number: "REG-2024-NX",
    address: "123 Industrial Parkway",
    city: "Moscow",
    country: "Russia",
    website: "https://nexus-logistics.ai",
    email: "ops@nexus-logistics.ai",
    phone: "+7 (495) 123-45-67",
    is_own_company: true,
    industry: "Logistics & Supply Chain",
    logo_url: "https://picsum.photos/seed/nexus/200/200"
  },
  {
    id: "comp-002",
    name: "MegaTools Ltd",
    tax_id: "DE-987654321",
    address: "45 Werkstattstrasse",
    city: "Berlin",
    country: "Germany",
    website: "https://megatools.de",
    email: "sales@megatools.de",
    phone: "+49 30 123456",
    is_own_company: false,
    industry: "Industrial Manufacturing",
    logo_url: "https://picsum.photos/seed/megatools/200/200",
    contacts: [
      {
        id: "con-001",
        first_name: "Hans",
        last_name: "Mueller",
        email: "h.mueller@megatools.de",
        phone: "+49 170 5550011",
        position: "Procurement Manager",
        company_id: "comp-002"
      }
    ]
  },
  {
    id: "comp-003",
    name: "Global Parts Corp",
    tax_id: "US-555666777",
    address: "888 Component Ave",
    city: "Chicago",
    country: "USA",
    email: "info@globalparts.com",
    phone: "+1 312 555 0199",
    is_own_company: false,
    industry: "Distribution",
    logo_url: "https://picsum.photos/seed/globalparts/200/200"
  }
];

export const MOCK_PROFILES: Profile[] = [
  {
    id: "u-001",
    username: "alex_admin",
    full_name: "Alex Manager",
    role: "admin",
    avatar_url: "https://picsum.photos/id/64/100/100",
    subscription_tier: "enterprise",
    email: "alex@nexusai.com",
    last_active: "2 mins ago",
    status: "active"
  },
  {
    id: "u-002",
    username: "sarah_parts",
    full_name: "Sarah Jenkins",
    role: "seller",
    avatar_url: "https://picsum.photos/id/65/100/100",
    subscription_tier: "pro",
    email: "sarah@industrial-parts.com",
    last_active: "1 hour ago",
    status: "active"
  },
  {
    id: "u-003",
    username: "mike_ops",
    full_name: "Mike Rodriguez",
    role: "manager",
    avatar_url: "https://picsum.photos/id/66/100/100",
    subscription_tier: "pro",
    email: "mike@logistics.com",
    last_active: "5 mins ago",
    status: "active"
  }
];

export const MOCK_BATCHES: Batch[] = [
  {
    id: "bat-001",
    batch_number: "LOT-2024-A1",
    item_id: "item-101",
    item_name: "Bosch Professional Drill 18V",
    initial_quantity: 50,
    current_quantity: 45,
    production_date: "2024-01-15",
    expiry_date: "2025-01-15",
    status: "active",
    location_id: "loc-001"
  },
  {
    id: "bat-002",
    batch_number: "LOT-2023-Z9",
    item_id: "item-106",
    item_name: "Precision Sensor Module",
    initial_quantity: 100,
    current_quantity: 10,
    production_date: "2023-05-20",
    expiry_date: "2024-05-20",
    status: "expired",
    location_id: "loc-002"
  }
];

export const MOCK_STORIES: MarketplaceStory[] = [
  {
    id: "story-1",
    user_id: "u-002",
    full_name: "Sarah Jenkins",
    company: "Industrial Power Ltd",
    avatar_url: "https://picsum.photos/id/65/100/100",
    content: "NexusMarket allowed us to offload 500+ surplus bearings in just 48 hours. The automated logistics integration is a game changer for industrial sellers.",
    tags: ["Surplus", "Logistics", "Industrial"],
    date: "May 12, 2024"
  },
  {
    id: "story-2",
    user_id: "u-004",
    full_name: "Anna Volkova",
    company: "TechSupply RU",
    avatar_url: "https://picsum.photos/id/67/100/100",
    content: "Found critical Bosch components for our production line at 20% below retail. Verified sellers and real-time tracking give us peace of mind.",
    tags: ["Procurement", "Cost Saving", "Verified"],
    date: "May 10, 2024"
  }
];

export const MOCK_LOCATIONS: Location[] = [
  {
    id: "loc-001",
    name: "Main Logistics Hub",
    location_code: "HUB01",
    type: "warehouse",
    address: "123 Industrial Parkway",
    city: "Moscow",
    region: "Moscow Oblast",
    country: "Russia",
    postal_code: "101000",
    is_active: true,
    is_default: true,
    is_public: false,
    allow_pickup: true,
    items_count: 1250,
    latitude: 55.7558,
    longitude: 37.6173
  },
  {
    id: "loc-002",
    name: "Downtown Retail Store",
    location_code: "RET02",
    type: "retail",
    address: "45 Tverskaya St",
    city: "Moscow",
    country: "Russia",
    postal_code: "125009",
    is_active: true,
    is_default: false,
    is_public: true,
    allow_pickup: true,
    items_count: 340,
    latitude: 55.7602,
    longitude: 37.6114
  },
  {
    id: "loc-003",
    name: "Satellite Annex",
    location_code: "SAT03",
    type: "warehouse",
    address: "88 Storage Ln",
    city: "Saint Petersburg",
    country: "Russia",
    is_active: true,
    is_default: false,
    is_public: false,
    allow_pickup: false,
    items_count: 0,
    latitude: 59.9343,
    longitude: 30.3351
  }
];

export const MOCK_WAREHOUSES: Warehouse[] = [
  {
    id: "wh-001",
    name: "Central Logistics Hub",
    code: "CLH01",
    capacity_volume: 50000,
    location_id: "loc-001",
    zones: [
      {
        id: "zn-001",
        name: "High Rack A",
        code: "HRA",
        zone_type: "rack",
        bins: [
          { id: "bn-1", code: "A-01-01", is_occupied: true, current_quantity: 50 },
          { id: "bn-2", code: "A-01-02", is_occupied: true, current_quantity: 120 },
          { id: "bn-3", code: "A-01-03", is_occupied: false, current_quantity: 0 },
        ]
      },
      {
        id: "zn-002",
        name: "Cold Storage",
        code: "CS1",
        zone_type: "cold",
        bins: [
            { id: "bn-4", code: "C-01-01", is_occupied: true, current_quantity: 300 },
        ]
      }
    ]
  },
  {
    id: "wh-002",
    name: "Urban Distribution Center",
    code: "UDC02",
    capacity_volume: 15000,
    location_id: "loc-002",
    zones: []
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics", items_count: 145 },
  { id: 2, name: "Industrial Parts", slug: "industrial-parts", items_count: 890 },
  { id: 3, name: "Office Supplies", slug: "office-supplies", items_count: 320 },
  { id: 4, name: "Raw Materials", slug: "raw-materials", items_count: 55 },
];

export const MOCK_ITEMS: Item[] = [
  {
    id: "item-101",
    title: "Bosch Professional Drill 18V",
    inventory_number: "TLS-2023-001",
    quantity: 45,
    available_quantity: 40,
    reserved_quantity: 5,
    price: 125.00,
    status: 'active',
    category_id: 2,
    location_id: "loc-001",
    condition: "new",
    requires_moderation: false,
    image_url: "https://picsum.photos/400/300?random=1",
    is_featured: true,
    seller_name: "MegaTools Ltd",
    seller_rating: 4.8,
    tags: ["trending", "ai-price-matched"]
  },
  {
    id: "item-103",
    title: "Dell Latitude 5420 Laptop",
    inventory_number: "ELE-2023-123",
    quantity: 12,
    available_quantity: 10,
    reserved_quantity: 2,
    price: 650.00,
    status: 'active',
    category_id: 1,
    location_id: "loc-002",
    condition: "used_good",
    requires_moderation: false,
    image_url: "https://picsum.photos/400/300?random=3",
    is_featured: true,
    seller_name: "TechResale Pro",
    seller_rating: 4.9,
    tags: ["eco-friendly"]
  },
  ...Array.from({ length: 28 }).map((_, i) => ({
    id: `item-extra-${i}`,
    title: [
      "Heavy Duty Hydraulic Jack", "Digital Multimeter Pro", "Welding Helmet Auto-Dark",
      "Steel Storage Cabinet", "Industrial Floor Fan", "LED High Bay Light",
      "Circuit Breaker 3-Phase", "Pneumatic Impact Wrench", "Pallet Jack 2.5T",
      "Safety Harness Kit", "Laser Distance Meter", "Heavy Duty Workbench",
      "Angle Grinder 125mm", "Concrete Mixer 140L", "Extension Ladder 6m",
      "Torque Wrench Set", "Generator 5kW Petrol", "Air Compressor 50L",
      "Solar Panel 400W", "Electric Motor 2HP", "Industrial Scale 300kg",
      "Welding Machine Inverter", "Pressure Washer 150Bar", "Submersible Pump",
      "Hydraulic Hose 10m", "Infrared Thermometer", "Safety Goggles Bulk", "Hand Tool Set 150pcs"
    ][i % 28],
    inventory_number: `SKU-${2024 + i}-${1000 + i}`,
    quantity: Math.floor(Math.random() * 100) + 1,
    available_quantity: Math.floor(Math.random() * 50) + 1,
    reserved_quantity: 5,
    price: [45, 120, 89, 450, 230, 110, 65, 180, 320, 75, 45, 550, 65, 890, 210, 145, 1200, 450, 300, 180, 290, 650, 320, 190, 85, 35, 15, 220][i % 28],
    status: 'active',
    category_id: (i % 4) + 1,
    location_id: i % 2 === 0 ? "loc-001" : "loc-002",
    condition: i % 3 === 0 ? "new" : "used_good",
    requires_moderation: false,
    image_url: `https://picsum.photos/400/300?random=${10 + i}`,
    is_featured: i % 7 === 0,
    seller_name: ["MegaTools Ltd", "TechResale Pro", "Parts Express", "Industrial Supply Co"][i % 4],
    seller_rating: (4 + Math.random()).toFixed(1) as unknown as number,
    tags: i % 5 === 0 ? ["trending"] : i % 3 === 0 ? ["eco-friendly"] : []
  }))
] as Item[];

export const MOCK_MOVEMENTS: InventoryMovement[] = [
  {
    id: "mov-1",
    item_id: "item-101",
    item_name: "Bosch Professional Drill 18V",
    movement_type: "in",
    quantity: 50,
    movement_date: new Date().toISOString(),
    user: "Alex Manager",
    notes: "Initial stock intake",
    status: 'completed'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alert-1",
    type: "low_stock",
    message: "Hydraulic Pump Unit is below minimum threshold (2)",
    severity: "high",
    date: new Date().toISOString()
  }
];
