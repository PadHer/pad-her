export const CAMPAIGNS = [
  {
    id: "camp_1",
    name: "Sanitary Pads Drive Q2 2026",
    raised: 487000,
    goal: 800000,
    donors: 145,
  },
  {
    id: "camp_2",
    name: "Rural Schools Menstrual Ed",
    raised: 215000,
    goal: 500000,
    donors: 82,
  },
  {
    id: "camp_3",
    name: "Lagos Community Outreach",
    raised: 890000,
    goal: 1000000,
    donors: 310,
  }
];

export const IMPACT_STATS = {
  girlsReached: "10K+",
  padsDistributed: "50K+",
  communities: "15+"
};

export const DONOR_USER = {
  name: "Ngozi Adeyemi",
  email: "ngozi.adeyemi@example.com",
  totalDonated: 45000,
  donationsCount: 8,
};

export const RECENT_DONATIONS = [
  { id: "don_1", name: "Amara", amount: 5000, time: "2 mins ago" },
  { id: "don_2", name: "Chisom", amount: 2500, time: "5 mins ago" },
  { id: "don_3", name: "Fatima", amount: 10000, time: "12 mins ago" },
  { id: "don_4", name: "Oluwaseun", amount: 1000, time: "15 mins ago" },
  { id: "don_5", name: "Anonymous", amount: 50000, time: "1 hr ago" },
  { id: "don_6", name: "Tariq", amount: 3000, time: "2 hrs ago" },
  { id: "don_7", name: "Aisha", amount: 7500, time: "3 hrs ago" },
  { id: "don_8", name: "Kemi", amount: 2000, time: "4 hrs ago" },
];

export const DONOR_HISTORY = [
  { id: "hist_1", date: "2026-04-12", amount: 5000, campaign: "Sanitary Pads Drive Q2 2026", status: "Completed" },
  { id: "hist_2", date: "2026-03-01", amount: 10000, campaign: "Rural Schools Menstrual Ed", status: "Completed" },
  { id: "hist_3", date: "2026-01-15", amount: 2500, campaign: "Lagos Community Outreach", status: "Completed" },
  { id: "hist_4", date: "2025-11-20", amount: 5000, campaign: "End of Year Drive", status: "Completed" },
  { id: "hist_5", date: "2025-09-05", amount: 5000, campaign: "Back to School Pads", status: "Completed" },
  { id: "hist_6", date: "2025-07-18", amount: 7500, campaign: "Summer Workshop Support", status: "Completed" },
  { id: "hist_7", date: "2025-05-10", amount: 5000, campaign: "Sanitary Pads Drive Q2 2025", status: "Completed" },
  { id: "hist_8", date: "2025-02-28", amount: 5000, campaign: "First Quarter Outreach", status: "Completed" },
];

export const ADMIN_STATS = {
  totalRaised: 12500000,
  totalDonors: 3450,
  thisMonth: 845000,
  padsDistributed: 52400
};

export const ADMIN_MONTHLY_DATA = [
  { month: 'Jan', amount: 400000 },
  { month: 'Feb', amount: 300000 },
  { month: 'Mar', amount: 550000 },
  { month: 'Apr', amount: 480000 },
  { month: 'May', amount: 700000 },
  { month: 'Jun', amount: 650000 },
  { month: 'Jul', amount: 800000 },
  { month: 'Aug', amount: 950000 },
  { month: 'Sep', amount: 1100000 },
  { month: 'Oct', amount: 1050000 },
  { month: 'Nov', amount: 1300000 },
  { month: 'Dec', amount: 2100000 },
];

export const ADMIN_RECENT_DONATIONS = [
  { id: "ad_1", name: "Amara N.", email: "amara@example.com", amount: 5000, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-14" },
  { id: "ad_2", name: "Chisom O.", email: "chisom@example.com", amount: 2500, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-14" },
  { id: "ad_3", name: "Fatima A.", email: "fatima@example.com", amount: 10000, campaign: "Rural Schools Menstrual Ed", date: "2026-05-14" },
  { id: "ad_4", name: "Oluwaseun M.", email: "oluwaseun@example.com", amount: 1000, campaign: "Lagos Community Outreach", date: "2026-05-14" },
  { id: "ad_5", name: "Anonymous", email: "hidden@anonymous.org", amount: 50000, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-13" },
  { id: "ad_6", name: "Tariq S.", email: "tariq@example.com", amount: 3000, campaign: "Lagos Community Outreach", date: "2026-05-13" },
  { id: "ad_7", name: "Aisha B.", email: "aisha@example.com", amount: 7500, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-13" },
  { id: "ad_8", name: "Kemi L.", email: "kemi@example.com", amount: 2000, campaign: "Rural Schools Menstrual Ed", date: "2026-05-12" },
  { id: "ad_9", name: "David E.", email: "david@example.com", amount: 15000, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-12" },
  { id: "ad_10", name: "Zainab R.", email: "zainab@example.com", amount: 5000, campaign: "Lagos Community Outreach", date: "2026-05-12" },
  { id: "ad_11", name: "Emmanuel K.", email: "emma@example.com", amount: 25000, campaign: "Rural Schools Menstrual Ed", date: "2026-05-11" },
  { id: "ad_12", name: "Grace T.", email: "grace@example.com", amount: 1000, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-11" },
  { id: "ad_13", name: "Sarah M.", email: "sarah@example.com", amount: 5000, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-10" },
  { id: "ad_14", name: "Ibrahim D.", email: "ibrahim@example.com", amount: 10000, campaign: "Lagos Community Outreach", date: "2026-05-10" },
  { id: "ad_15", name: "Joy P.", email: "joy@example.com", amount: 2000, campaign: "Rural Schools Menstrual Ed", date: "2026-05-09" },
];

export const ALL_DONATIONS = [
  ...ADMIN_RECENT_DONATIONS.map(d => ({ ...d, status: d.amount > 5000 ? "confirmed" : "pending" })),
  { id: "ad_16", name: "Michael O.", email: "michael@example.com", amount: 12000, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-08", status: "confirmed" },
  { id: "ad_17", name: "Esther B.", email: "esther@example.com", amount: 3000, campaign: "Rural Schools Menstrual Ed", date: "2026-05-08", status: "pending" },
  { id: "ad_18", name: "Victor N.", email: "victor@example.com", amount: 45000, campaign: "Lagos Community Outreach", date: "2026-05-07", status: "confirmed" },
  { id: "ad_19", name: "Ruth C.", email: "ruth@example.com", amount: 1500, campaign: "Sanitary Pads Drive Q2 2026", date: "2026-05-07", status: "pending" },
  { id: "ad_20", name: "Daniel K.", email: "daniel@example.com", amount: 8000, campaign: "Rural Schools Menstrual Ed", date: "2026-05-06", status: "confirmed" }
];

export const EVENTS = [
  { id: "ev_1", title: "Q2 Pads Distribution", type: "campaign", date: "2026-06-15", location: "Lagos", description: "Main distribution event for Q2.", capacity: 500, attendees: 120, status: "upcoming" },
  { id: "ev_2", title: "Menstrual Health Workshop", type: "workshop", date: "2026-05-20", location: "Ikeja", description: "Educational workshop for teens.", capacity: 100, attendees: 85, status: "upcoming" },
  { id: "ev_3", title: "Rural Schools Outreach", type: "outreach", date: "2026-05-10", location: "Ogun", description: "Visiting schools in Ogun state.", capacity: 300, attendees: 300, status: "completed" },
  { id: "ev_4", title: "Community Health Drive", type: "campaign", date: "2026-07-01", location: "Abuja", description: "Health drive in Abuja.", capacity: 1000, attendees: 0, status: "upcoming" },
  { id: "ev_5", title: "Volunteer Training", type: "workshop", date: "2026-05-25", location: "Online", description: "Training for new volunteers.", capacity: 50, attendees: 45, status: "upcoming" },
  { id: "ev_6", title: "Hygiene Essentials Giveaway", type: "outreach", date: "2026-04-15", location: "Ibadan", description: "Giving away hygiene kits.", capacity: 200, attendees: 200, status: "completed" },
  { id: "ev_7", title: "Annual Charity Gala", type: "campaign", date: "2026-12-10", location: "Lagos", description: "End of year fundraising gala.", capacity: 250, attendees: 50, status: "upcoming" },
  { id: "ev_8", title: "School Health Talk", type: "workshop", date: "2026-06-05", location: "Port Harcourt", description: "Health talk in secondary schools.", capacity: 150, attendees: 10, status: "upcoming" }
];

export const BLOG_POSTS = [
  { id: "bp_1", title: "Why Menstrual Education Matters", author: "Ngozi A.", date: "2026-05-10", status: "published", tags: ["Education", "Health"], excerpt: "A look into the importance of educating teens.", content: "Full content..." },
  { id: "bp_2", title: "Highlights from our Q1 Drive", author: "PadHer Team", date: "2026-04-05", status: "published", tags: ["Campaigns", "Impact"], excerpt: "See what we achieved in Q1.", content: "Full content..." },
  { id: "bp_3", title: "Breaking the Stigma", author: "Chioma E.", date: "2026-05-15", status: "draft", tags: ["Stigma", "Community"], excerpt: "How we can break the silence.", content: "Full content..." },
  { id: "bp_4", title: "Volunteer Spotlight: Amina", author: "PadHer Team", date: "2026-03-20", status: "published", tags: ["Volunteers"], excerpt: "Meet Amina, our star volunteer.", content: "Full content..." },
  { id: "bp_5", title: "Upcoming Events in Lagos", author: "Ngozi A.", date: "2026-05-20", status: "draft", tags: ["Events", "Lagos"], excerpt: "What's happening next month.", content: "Full content..." },
  { id: "bp_6", title: "How to Support PadHer", author: "PadHer Team", date: "2026-02-14", status: "published", tags: ["Donations", "Support"], excerpt: "Different ways you can help our cause.", content: "Full content..." }
];

export const NEWSLETTER_SUBSCRIBERS = [
  { id: "ns_1", name: "Alice M.", email: "alice@example.com", subscribedDate: "2026-01-15", status: "active" },
  { id: "ns_2", name: "Bob T.", email: "bob@example.com", subscribedDate: "2026-02-20", status: "active" },
  { id: "ns_3", name: "Charlie W.", email: "charlie@example.com", subscribedDate: "2026-03-05", status: "unsubscribed" },
  { id: "ns_4", name: "Diana O.", email: "diana@example.com", subscribedDate: "2026-03-10", status: "active" },
  { id: "ns_5", name: "Eve S.", email: "eve@example.com", subscribedDate: "2026-04-01", status: "active" },
  { id: "ns_6", name: "Frank L.", email: "frank@example.com", subscribedDate: "2026-04-12", status: "unsubscribed" },
  { id: "ns_7", name: "Grace H.", email: "grace.h@example.com", subscribedDate: "2026-04-20", status: "active" },
  { id: "ns_8", name: "Henry K.", email: "henry@example.com", subscribedDate: "2026-05-01", status: "active" },
  { id: "ns_9", name: "Ivy P.", email: "ivy@example.com", subscribedDate: "2026-05-05", status: "active" },
  { id: "ns_10", name: "Jack U.", email: "jack@example.com", subscribedDate: "2026-05-10", status: "unsubscribed" },
  { id: "ns_11", name: "Karen D.", email: "karen@example.com", subscribedDate: "2026-05-12", status: "active" },
  { id: "ns_12", name: "Leo F.", email: "leo@example.com", subscribedDate: "2026-05-14", status: "active" }
];

export const VOLUNTEER_ROLES = [
  { id: "vr_1", title: "Event Coordinator", description: "Help organize our outreach events.", requirements: "Organization skills, local to Lagos.", openSlots: 2, applicationsCount: 5 },
  { id: "vr_2", title: "Content Writer", description: "Write blog posts and social content.", requirements: "Excellent writing skills.", openSlots: 1, applicationsCount: 8 },
  { id: "vr_3", title: "Logistics Assistant", description: "Assist with transporting pads.", requirements: "Must have a valid driver's license.", openSlots: 3, applicationsCount: 2 },
  { id: "vr_4", title: "Community Ambassador", description: "Represent PadHer in your community.", requirements: "Passionate about our cause.", openSlots: 5, applicationsCount: 12 },
  { id: "vr_5", title: "Graphic Designer", description: "Create visuals for our campaigns.", requirements: "Experience with design tools.", openSlots: 1, applicationsCount: 4 }
];

export const VOLUNTEER_APPLICANTS = [
  { id: "va_1", name: "Sam B.", email: "sam@example.com", roleId: "vr_1", roleName: "Event Coordinator", appliedDate: "2026-05-01", status: "pending" },
  { id: "va_2", name: "Tina Y.", email: "tina@example.com", roleId: "vr_2", roleName: "Content Writer", appliedDate: "2026-05-02", status: "accepted" },
  { id: "va_3", name: "Umar G.", email: "umar@example.com", roleId: "vr_3", roleName: "Logistics Assistant", appliedDate: "2026-05-03", status: "pending" },
  { id: "va_4", name: "Vera L.", email: "vera@example.com", roleId: "vr_4", roleName: "Community Ambassador", appliedDate: "2026-05-04", status: "rejected" },
  { id: "va_5", name: "Will C.", email: "will@example.com", roleId: "vr_5", roleName: "Graphic Designer", appliedDate: "2026-05-05", status: "pending" },
  { id: "va_6", name: "Xena M.", email: "xena@example.com", roleId: "vr_1", roleName: "Event Coordinator", appliedDate: "2026-05-06", status: "accepted" },
  { id: "va_7", name: "Yusuf H.", email: "yusuf@example.com", roleId: "vr_2", roleName: "Content Writer", appliedDate: "2026-05-07", status: "pending" },
  { id: "va_8", name: "Zara O.", email: "zara@example.com", roleId: "vr_4", roleName: "Community Ambassador", appliedDate: "2026-05-08", status: "accepted" },
  { id: "va_9", name: "Adam V.", email: "adam@example.com", roleId: "vr_4", roleName: "Community Ambassador", appliedDate: "2026-05-09", status: "pending" },
  { id: "va_10", name: "Bella N.", email: "bella@example.com", roleId: "vr_1", roleName: "Event Coordinator", appliedDate: "2026-05-10", status: "pending" }
];

export const EVENT_ATTENDEES = [
  { id: "ea_1", name: "Chris J.", email: "chris@example.com", eventId: "ev_2", eventName: "Menstrual Health Workshop", registrationDate: "2026-05-01", ticketType: "free" },
  { id: "ea_2", name: "Dana P.", email: "dana@example.com", eventId: "ev_2", eventName: "Menstrual Health Workshop", registrationDate: "2026-05-02", ticketType: "paid" },
  { id: "ea_3", name: "Evan R.", email: "evan@example.com", eventId: "ev_1", eventName: "Q2 Pads Distribution", registrationDate: "2026-05-03", ticketType: "free" },
  { id: "ea_4", name: "Fiona S.", email: "fiona@example.com", eventId: "ev_1", eventName: "Q2 Pads Distribution", registrationDate: "2026-05-04", ticketType: "free" },
  { id: "ea_5", name: "George W.", email: "george@example.com", eventId: "ev_5", eventName: "Volunteer Training", registrationDate: "2026-05-05", ticketType: "free" },
  { id: "ea_6", name: "Hannah Z.", email: "hannah@example.com", eventId: "ev_5", eventName: "Volunteer Training", registrationDate: "2026-05-06", ticketType: "free" },
  { id: "ea_7", name: "Ian B.", email: "ian@example.com", eventId: "ev_7", eventName: "Annual Charity Gala", registrationDate: "2026-05-07", ticketType: "paid" },
  { id: "ea_8", name: "Julia F.", email: "julia@example.com", eventId: "ev_7", eventName: "Annual Charity Gala", registrationDate: "2026-05-08", ticketType: "paid" },
  { id: "ea_9", name: "Kevin L.", email: "kevin@example.com", eventId: "ev_2", eventName: "Menstrual Health Workshop", registrationDate: "2026-05-09", ticketType: "free" },
  { id: "ea_10", name: "Laura M.", email: "laura@example.com", eventId: "ev_1", eventName: "Q2 Pads Distribution", registrationDate: "2026-05-10", ticketType: "free" },
  { id: "ea_11", name: "Mike N.", email: "mike@example.com", eventId: "ev_8", eventName: "School Health Talk", registrationDate: "2026-05-11", ticketType: "free" },
  { id: "ea_12", name: "Nina T.", email: "nina@example.com", eventId: "ev_8", eventName: "School Health Talk", registrationDate: "2026-05-12", ticketType: "free" }
];
