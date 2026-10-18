// All site copy lives here so it can be edited in one place.

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const company = {
  name: "NebTech Innovations",
  phone: "+254 757 450 716",
  phoneHref: "tel:+254757450716",
  whatsappHref:
    "https://wa.me/254757450716?text=" +
    encodeURIComponent("Hi NebTech, I'd like to talk about a project."),
  email: "ccosmas001@gmail.com",
  hours: "Mon – Sat, 8am – 6pm",
  location: "Nairobi & Nakuru, Kenya",
};

export const nav = [
  { label: "Solutions", href: "#solutions" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  title: "Your full‑service software partner.",
  lead:
    "We implement and extend Microsoft Dynamics 365 Business Central, wire it to M-Pesa, Shopify and your CRM, then layer AI on top, so your business runs on one connected system instead of a pile of spreadsheets.",
  tags: [
    "BC Implementation",
    "AL Development",
    "AI Automation",
    "ERP Integration",
    "Power Automate",
    "M-Pesa Integration",
    "Power BI",
    "Custom Software",
    "Web & Mobile Apps",
    "Data Migration",
  ],
};

export const stats = [
  { value: 50, suffix: "+", label: "Business Central implementations" },
  { value: 200, suffix: "+", label: "Automations deployed" },
  { value: 500, suffix: "+", label: "Happy clients" },
  { value: 4, suffix: "h", label: "Typical reply, business hours" },
];

export const solutions = [
  {
    id: "bc",
    title: "Microsoft Dynamics 365 Business Central",
    tagline: "Implement, customise and support your ERP.",
    body:
      "End-to-end Business Central consultancy: from scoping and configuration to go-live and the months after it. We set BC up around how your team actually works.",
    points: [
      "Finance, Sales, Purchasing & Inventory setup",
      "Custom AL extensions and approval workflows",
      "Data migration from QuickBooks, Sage or Excel",
      "Role-based training and ongoing support",
    ],
    cta: "Explore BC services",
    image: img("1460925895917-afdab827c52f"),
    alt: "Laptop showing financial analytics dashboards",
  },
  {
    id: "ai",
    title: "AI Integrations & Automation",
    tagline: "Connect your tools. Automate your workflows.",
    body:
      "One real-time integration layer between your ERP, CRM, M-Pesa, e-commerce store and third-party APIs, with AI that reads, routes and responds so your people don't have to.",
    points: [
      "ERP, CRM, M-Pesa and Shopify integration",
      "Power Automate flows and Power BI reporting",
      "AI bots for invoices, support and lead qualification",
      "REST API and webhook data sync",
    ],
    cta: "Explore integrations",
    image: img("1677442136019-21780ecad995"),
    alt: "Abstract visual representing artificial intelligence",
  },
  {
    id: "software",
    title: "Custom Software Development",
    tagline: "Web and mobile apps, built for you.",
    body:
      "When off-the-shelf won't fit, we build it: customer portals, internal tools, SaaS platforms and dashboards, designed and engineered by the same team that knows your ERP.",
    points: [
      "Web and mobile application development",
      "SaaS and cloud platforms",
      "Operational dashboards and internal tools",
      "UI/UX design",
    ],
    cta: "Start a project",
    image: img("1555066931-4365d14bab8c"),
    alt: "Source code on a developer's monitor",
  },
];

export type ServiceCategory = "Business Central" | "AI & Automation" | "Software";

export const services: {
  title: string;
  category: ServiceCategory;
  body: string;
  icon: "rocket" | "workflow" | "graduation" | "bot" | "code" | "chart";
}[] = [
  {
    title: "BC Implementation & AL Development",
    category: "Business Central",
    body:
      "Full rollout, data migration, AL extensions, approval workflows, user training and hypercare after go-live.",
    icon: "rocket",
  },
  {
    title: "AI Integrations & Process Automation",
    category: "AI & Automation",
    body:
      "Connect ERP, CRM, M-Pesa and Shopify, then automate the hand-offs between them with Power Automate and custom bots.",
    icon: "workflow",
  },
  {
    title: "BC Training & Managed Support",
    category: "Business Central",
    body:
      "On-site, role-based training in Nairobi or Nakuru, plus helpdesk, version upgrades and system monitoring.",
    icon: "graduation",
  },
  {
    title: "AI Chatbots & Intelligent Assistants",
    category: "AI & Automation",
    body:
      "Assistants for customer support, internal helpdesks and lead qualification, on your website or WhatsApp.",
    icon: "bot",
  },
  {
    title: "Custom Web & Mobile Development",
    category: "Software",
    body: "Bespoke web apps, mobile apps and cloud platforms that plug straight into your business data.",
    icon: "code",
  },
  {
    title: "Power Platform & Data Analytics",
    category: "Software",
    body: "Power BI dashboards, Power Apps and Power Automate that turn ERP data into decisions.",
    icon: "chart",
  },
];

export const process = [
  {
    title: "Discover",
    body: "A free call to map your current setup, pain points and goals. You leave with a clear roadmap.",
  },
  {
    title: "Design",
    body: "We scope the solution, integrations and data migration, with fixed milestones you sign off.",
  },
  {
    title: "Build & go live",
    body: "Configuration, AL extensions and integrations, tested against your real data before cut-over.",
  },
  {
    title: "Support",
    body: "Training, hypercare and managed support, so the system keeps up as your business grows.",
  },
];

export const about = {
  title: "East Africa's full-service software partner, built on Business Central and AI.",
  body:
    "NebTech is a Nairobi and Nakuru-based software company with two core specialties: Business Central consultancy and AI-powered integrations. Around them sits a full software house, so one team can carry you from ERP to the apps and dashboards built on top of it.",
  pillars: [
    {
      title: "Business Central specialists",
      body: "Certified consultants across Finance, Sales, Inventory, Manufacturing and Distribution.",
    },
    {
      title: "AI & integration experts",
      body: "Connecting ERP, M-Pesa, e-commerce, CRMs and APIs, with an AI layer on top.",
    },
    {
      title: "Full-service software house",
      body: "Web apps, mobile apps, cloud platforms and Power BI dashboards.",
    },
  ],
  image: img("1531482615713-2afd69097998", 1200),
  alt: "Two developers reviewing code together in a busy office",
};

export const testimonials = [
  {
    quote:
      "NebTech implemented Business Central for our wholesale distribution business in 8 weeks. Our month-end close went from 5 days to half a day. The team's knowledge of local tax requirements was exactly what we needed.",
    name: "Amara Odhiambo",
    role: "Finance Director",
    company: "Savannah Distributors Ltd",
    city: "Nairobi",
  },
  {
    quote:
      "They built a custom AL extension that connected our 12 retail outlets into one BC environment. Stock visibility is now real-time and our inventory write-offs dropped by 60%. Exceptional work.",
    name: "James Kariuki",
    role: "CEO",
    company: "PeakRetail Group",
    city: "Nakuru",
  },
  {
    quote:
      "NebTech integrated Business Central with our production floor systems and M-Pesa payments. The automation they built through Power Automate alone saves us 30+ hours of manual work every week.",
    name: "Sophie van der Berg",
    role: "COO",
    company: "AfriManufacture Ltd",
    city: "Nairobi",
  },
];

export const insights = [
  {
    category: "Business Central",
    date: "2025-05-20",
    title: "Why growing East African businesses are choosing Business Central",
    excerpt: "Multi-currency, KRA VAT compliance and M-Pesa readiness, out of the box.",
    image: img("1522071820081-009f0129c71c", 900),
    alt: "A team working on laptops around a shared table",
  },
  {
    category: "AI & Integration",
    date: "2025-05-06",
    title: "Connecting BC to M-Pesa, Shopify and your CRM with one integration layer",
    excerpt: "How a single real-time sync replaces exports, re-keying and reconciliation.",
    image: img("1563013544-824ae1b704d3", 900),
    alt: "Customer paying online with a card on a laptop",
  },
  {
    category: "AI & Integration",
    date: "2025-04-18",
    title: "Five ways AI automation is changing African businesses",
    excerpt: "From invoice processing to WhatsApp chatbots: where AI pays for itself first.",
    image: img("1516321318423-f06f85e504b3", 900),
    alt: "Two people pointing at a laptop screen while working through a process",
  },
];

export const contact = {
  title: "Tell us what's slowing you down.",
  lead:
    "Describe your ERP, integration or automation challenge. We'll map out a solution and give you a clear roadmap, free of charge.",
  serviceOptions: [
    "Business Central implementation",
    "AL development / customisation",
    "Integrations (M-Pesa, Shopify, CRM)",
    "AI automation / chatbots",
    "Custom web or mobile app",
    "Power BI / Power Platform",
    "Training & support",
    "Something else",
  ],
  image: img("1600880292203-757bb62b4baf", 1200),
};

export const footerServices = [
  "BC Implementation",
  "AL Development",
  "ERP Integration",
  "Power Automate",
  "BC Training",
  "BC Support",
];
