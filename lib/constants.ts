
import { Item, Warehouse, InventoryMovement, Alert, Category, Location, Profile, MarketplaceStory, Batch, Company, WorkShift, TimeLog, PayrollRecord, Conversation, ChatMessage } from './types';

export const APP_NAME = "NexusAI WMS";

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
    status: "active",
    hourly_rate: 3500,
    department: "Management"
  },
  {
    id: "u-seller-1",
    username: "megatools_vostok",
    full_name: "Dmitry Tools",
    role: "seller",
    avatar_url: "https://picsum.photos/id/102/100/100",
    email: "dmitry@megatools.ru",
    status: "active"
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "chat-001",
    type: "marketplace",
    participants: [MOCK_PROFILES[0], MOCK_PROFILES[1]],
    last_message: "Is the price negotiable for bulk purchase?",
    last_message_time: new Date().toISOString(),
    unread_count: 2,
    subject: "Siemens S7-1500 Inquiry",
    sentiment: "positive"
  },
  {
    id: "chat-002",
    type: "support",
    participants: [MOCK_PROFILES[0], { id: "cust-01", full_name: "External Client A", role: "buyer", avatar_url: "https://picsum.photos/id/45/100/100" } as any],
    last_message: "The delivery is delayed by 2 days.",
    last_message_time: new Date().toISOString(),
    unread_count: 0,
    subject: "Order #RU-992 Logistic Sync",
    sentiment: "neutral"
  }
];

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    conversation_id: "chat-001",
    sender_id: "u-001",
    sender_name: "Alex Manager",
    text: "Hello Dmitry, I'm interested in the 50 units of Siemens S7-1500.",
    timestamp: "2024-10-24T10:00:00Z",
    status: "read"
  },
  {
    id: "m2",
    conversation_id: "chat-001",
    sender_id: "u-seller-1",
    sender_name: "Dmitry Tools",
    text: "Hello Alex, standard pricing applies, but for 50+ units we can apply a 5% grid discount.",
    timestamp: "2024-10-24T10:05:00Z",
    status: "read"
  }
];

export const MOCK_SHIFTS: WorkShift[] = [
  { id: "s1", user_id: "u-001", date: "2024-10-24", start_time: "08:00", end_time: "17:00", status: "active" }
];

export const MOCK_PAYROLL: PayrollRecord[] = [
  { id: "p1", user_id: "u-001", amount: 240000, bonus: 35000, period: "Sep 2024", status: "paid", processed_at: "2024-09-30" }
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: "comp-001",
    name: "Nexus Logistics Group",
    address: "123 Industrial Parkway",
    city: "Moscow",
    country: "Russia",
    email: "ops@nexus-logistics.ai",
    phone: "+7 (495) 123-45-67",
    is_own_company: true,
    industry: "Logistics & Supply Chain"
  }
];

export const MOCK_BATCHES: Batch[] = [
  {
    id: "bat-001",
    batch_number: "LOT-2024-A1",
    item_id: "item-node-0",
    item_name: "Siemens S7-1500 Controller",
    initial_quantity: 50,
    current_quantity: 45,
    production_date: "2024-01-15",
    expiry_date: "2026-01-15",
    status: "active",
    location_id: "loc-001"
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
    items_count: 850
  },
  {
    id: "loc-002",
    name: "Downtown Distribution",
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
    items_count: 320
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
        bins: [{ id: "bn-1", code: "A-01-01", is_occupied: true, current_quantity: 50 }]
      }
    ]
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics", items_count: 145, icon_name: "Cpu", color_code: "#0052FF", custom_icon_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Industrial", slug: "industrial", items_count: 380, icon_name: "Hammer", color_code: "#F5A623", custom_icon_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Robotics", slug: "robotics", items_count: 95, icon_name: "Activity", color_code: "#9013FE", custom_icon_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Power", slug: "energy", items_count: 210, icon_name: "Zap", color_code: "#D0021B", custom_icon_url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Hydraulics", slug: "hydraulics", items_count: 124, icon_name: "Zap", color_code: "#4A90E2", custom_icon_url: "https://images.unsplash.com/photo-1530124560676-586cad31750a?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Safety", slug: "safety", items_count: 156, icon_name: "ShieldAlert", color_code: "#50E3C2", custom_icon_url: "https://images.unsplash.com/photo-1557333610-90ee4a951ecf?q=80&w=400&auto=format&fit=crop" },
  { id: 7, name: "Materials", slug: "raw-materials", items_count: 88, icon_name: "Layers", color_code: "#7ED321", custom_icon_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop" }
];

const ITEM_DATA_POOL = [
  { cat: 1, titles: ["Siemens S7-1500 Controller", "Fluke 87V Multimeter", "Cisco Router IE-4000", "ABB Servo Drive", "Schneider HMI Panel", "Phoenix Power Module", "Omron Laser Sensor", "Honeywell Thermal Hub"] },
  { cat: 2, titles: ["Parker Hydraulic Pump", "Festo Air Cylinder", "SKF Roller Bearing", "Atlas Copco Air Hub", "Worm Gearbox 1:50", "Heavy Load Conveyor", "Industrial Lathe Bit", "Welder Lincoln Pro"] },
  { cat: 3, titles: ["Kuka Robot Arm Base", "Fanuc Teach Pendant", "AMR Navigation Unit", "Cobot Gripper Module", "Universal Robots Arm", "Lidar 360 Scanner", "Robotic Welding Head", "Linear Motion Rail"] },
  { cat: 4, titles: ["Diesel Gen 50kVA", "Solar Grid Inverter", "Battery Array 48V", "High Voltage Breaker", "Transformers 100kVA", "Capacitor Bank Pro", "Busbar Copper 1600A", "UPS Industrial 10kVA"] },
  { cat: 5, titles: ["Hydraulic Hose 25m", "Directional Valve Block", "Telescopic Cylinder", "Pressure Switch Pro", "Fluid Filter 10u", "Nitrile O-Ring Kit", "Vane Displacement Pump", "Flow Control Unit"] },
  { cat: 6, titles: ["Fire Suppression Hub", "PPE Safety Helmet", "Spill Containment Kit", "Arc Flash Harness", "Gas Detection Module", "Security 4K Thermal", "First Aid Unit Large", "Fall Arrest System"] },
  { cat: 7, titles: ["Steel I-Beam 6m", "Copper Plate 2mm", "Aluminum Coil Pro", "Titanium Grade 5 Rod", "Reinforced Mesh Grid", "Carbon Fiber Prepreg", "Stainless Tube 316L", "Bulk Granules 25kg"] }
];

export const MOCK_ITEMS: Item[] = Array.from({ length: 100 }, (_, i) => {
  const dataGroup = ITEM_DATA_POOL[i % ITEM_DATA_POOL.length];
  const title = dataGroup.titles[Math.floor(i / ITEM_DATA_POOL.length) % dataGroup.titles.length];
  const catId = dataGroup.cat;
  
  const rand = Math.random();
  const status = rand < 0.75 ? 'active' : rand < 0.90 ? 'draft' : 'archived';
  const condition = i % 5 === 0 ? "used_good" : i % 8 === 0 ? "used_fair" : "new";
  const isEnterprise = i % 4 !== 0;

  return {
    id: `item-node-${i}`,
    title: title,
    inventory_number: `SKU-${catId}00-${5000 + i}`,
    quantity: Math.floor(Math.random() * 500) + 10,
    available_quantity: Math.floor(Math.random() * 300) + 5,
    reserved_quantity: Math.floor(Math.random() * 50),
    price: 12000 + (Math.random() * 350000),
    status: status as any,
    category_id: catId,
    location_id: i % 2 === 0 ? "loc-001" : "loc-002",
    condition: condition,
    requires_moderation: false,
    image_url: `https://picsum.photos/seed/node-${i+200}/800/800`,
    is_featured: i % 10 === 0,
    seller_name: isEnterprise ? ["Nexus Distro", "Vostok Hub", "Ural Industrial", "Siberian Steel"][i % 4] : ["Artem V.", "Dmitry K.", "Elena S.", "Ivan P."][i % 4],
    seller_rating: 4.2 + (Math.random() * 0.8),
    seller_type: isEnterprise ? 'enterprise' : 'individual',
    seller_metrics: { reliability: 90, delivery_speed: 85, integrity_score: 95, verification_date: "2024-05-12" },
    description: "Verified industrial asset optimized for high-throughput distribution. Full diagnostic trace complete."
  };
});

export const MOCK_MOVEMENTS: InventoryMovement[] = [
  {
    id: "mov-1",
    item_id: "item-node-0",
    item_name: "Siemens S7-1500 Controller",
    movement_type: "in",
    quantity: 100,
    movement_date: new Date().toISOString(),
    user: "Alex Manager",
    status: 'completed'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alert-1",
    type: "low_stock",
    message: "Critical stock level: Siemens S7-1500 Controller (5 units left)",
    severity: "high",
    date: new Date().toISOString()
  }
];

export const MOCK_STORIES: MarketplaceStory[] = [
  {
    id: "story-1",
    user_id: "u-001",
    full_name: "Alex Manager",
    company: "Nexus Logistics Group",
    avatar_url: "https://picsum.photos/id/64/100/100",
    title: "Optimizing the Liquidation Cycle", // Added required title
    content: "The seamless transition from warehouse stock to marketplace listing has reduced our liquidations cycle by 40%.",
    tags: ["Efficiency", "Liquidation"],
    date: "May 10, 2024",
    status: 'published', // Added required status
    views: 1240 // Added required views
  }
];
