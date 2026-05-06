export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
  featured: boolean;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "27zero Agency",
    description: "Marketing agency website built on Webflow with CMS, animations and full branding integration.",
    tags: ["Webflow", "JavaScript", "Figma"],
    image: "/27zero-home.png",
    url: "https://www.27zero.agency/en",
    featured: true,
    category: ""
  },
  {
    id: 2,
    title: "Doctums",
    description: "Educational consulting website built on Webflow with CMS, animations and full branding integration.",
    tags: ["Webflow", "JavaScript", "Figma"],
    image: "/doctums.png",
    url: "https://www.doctums.com/",
    featured: false,
    category: ""
  },
  {
    id: 3,
    title: "Student First",
    description: "Professional website built on Webflow with CMS configuration and clean layout.",
    tags: ["Webflow", "JavaScript", "Figma"],
    image: "/student-first.png",
    url: "https://www.studentfirst.com/",
    featured: false,
    category: ""
  },
  {
    id: 4,
    title: "Portfolio",
    description: "Personal portfolio rebuilt with Next.js 15, TypeScript and Tailwind CSS. Version 2 features GSAP animations, a fully refactored component architecture, and code developed with Claude Code alongside hands-on programming.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Claude Code"],
    image: "/projects/porfolio.png",
    url: "https://portfolio-santiagolopez.vercel.app/",
    featured: true,
    category: ""
  },
  {
    id: 5,
    title: "Garaje de Ideas",
    description: "Full Webflow development for a Spanish digital product agency working with brands like IKEA, Iberdrola and Banco Santander. Built advanced interactions with GSAP, integrated external libraries like Swiper.js and Lenis, handled CMS collections, custom JavaScript features, and HubSpot integration.",
    tags: ["Webflow", "JavaScript", "GSAP", "Finsweet", "Swiper.js", "Lenis", "Lottiefiles", "Figma"],
    image: "/projects/garaje.png",
    url: "https://www.garajedeideas.com/es",
    featured: true,
    category: ""
  },
  {
    id: 6,
    title: "Unit21",
    description: "Webflow development for an AI-powered fraud and AML platform trusted by leading fintechs. Led new branding implementation, built new pages, and managed large-scale CMS collections to handle complex product data and content requirements.",
    tags: ["Webflow", "JavaScript", "Finsweet", "Claude"],
    image: "/projects/unit21.png",
    url: "https://www.unit21.ai/",
    featured: true,
    category: ""
  },
  {
    id: 7,
    title: "TrewUp",
    description: "Full Webflow build from scratch for a CPG trade spend analytics platform. Developed custom interactions with JS and CSS, and handled full CMS migration and content automation for a data-heavy product.",
    tags: ["Webflow", "JavaScript", "CSS"],
    image: "/projects/trewup.png",
    url: "https://www.trewup.com/",
    featured: true,
    category: ""
  },
  {
    id: 8,
    title: "Dataventure",
    description: "Collaborative Webflow development for a European performance marketing group. Built custom features, implemented advanced animations and user interactions, and contributed to completing the site alongside an existing dev team.",
    tags: ["Webflow", "JavaScript", "GSAP", "Lenis", "CSS", "Claude"],
    image: "/projects/dataventure.png",
    url: "https://www.dataventure.com/",
    featured: false,
    category: ""
  },
  {
    id: 9,
    title: "Energy Domain",
    description: "Full content migration to Webflow for an oil & gas data and marketplace platform. Managed large volumes of structured data across CMS collections, including scraping and library integrations to display complex information according to client specs.",
    tags: ["Webflow", "Finsweet", "Swiper.js", "Google Sheets"],
    image: "/projects/energydomain.png",
    url: "https://www.energydomain.com/",
    featured: true,
    category: ""
  },
  {
    id: 10,
    title: "Founders Makers",
    description: "Webflow development for a UK-based creative agency working with brands like Diageo, L'Oréal and Penguin Random House. Built clean, polished animations with GSAP and Lenis, with a strong focus on performance and scalability for future growth.",
    tags: ["Webflow", "JavaScript", "GSAP", "Lenis"],
    image: "/projects/foundersmakers.png",
    url: "https://www.founders-makers.com/",
    featured: true,
    category: ""
  },
  {
    id: 11,
    title: "Kordis",
    description: "Figma-to-Webflow build for a financial operating platform serving SMBs and fractional CFOs. Implemented a new design system within an existing project, migrating away from a legacy setup with minimal third-party dependencies to maximize performance.",
    tags: ["Webflow", "JavaScript", "Figma", "CSS"],
    image: "/projects/kordis.png",
    url: "https://www.kordis.io/",
    featured: false,
    category: ""
  },
  {
    id: 12,
    title: "Mashgin",
    description: "Full site rebrand and redevelopment for the world's fastest AI checkout system, trusted by 8,000+ locations including the Kansas City Chiefs and Palisades Tahoe. Implemented advanced Webflow interactions and custom JS, managed large CMS collections, and iterated across multiple product updates.",
    tags: ["Webflow", "JavaScript", "Finsweet", "Webflow Interactions", "Claude"],
    image: "/projects/mashgin.png",
    url: "https://www.mashgin.com/",
    featured: true,
    category: ""
  },
  {
    id: 13,
    title: "Orchestra",
    description: "Full Webflow build from scratch for a data and AI orchestration platform used by companies like Experian and Skyscanner. Focused on scalability, performance, and mobile UX recommendations throughout the development process.",
    tags: ["Webflow", "JavaScript", "CSS"],
    image: "/projects/orchestra.png",
    url: "https://www.getorchestra.io/",
    featured: false,
    category: ""
  },
  {
    id: 14,
    title: "Poplin",
    description: "Feature development and design system integration for an on-demand laundry platform. Built complex custom features with JS while adapting to an existing codebase, keeping the site clean and consistent.",
    tags: ["Webflow", "JavaScript"],
    image: "/projects/poplin.png",
    url: "https://poplin.co/",
    featured: false,
    category: ""
  },
  {
    id: 15,
    title: "TalkPush",
    description: "Webflow implementation of new client branding with full componentization for long-term scalability. Developed custom JS features and native Webflow interactions to match specific design requirements.",
    tags: ["Webflow", "JavaScript", "Figma", "CSS"],
    image: "/projects/talkpush.png",
    url: "https://www.talkpush.com/",
    featured: false,
    category: ""
  },
  {
    id: 16,
    title: "Userled",
    description: "Custom page development within an established design and development system for a B2B personalization platform.",
    tags: ["Webflow"],
    image: "/projects/userled.png",
    url: "https://www.userled.io/",
    featured: false,
    category: ""
  }
];