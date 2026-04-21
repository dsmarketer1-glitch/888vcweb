export const SITE_CONTENT = {
  ticker: [
    "50+ Startups Invested",
    "$1Bn+ Combined Valuation",
    "$100Mn+ Syndicated",
    "Cross-Border India–US Accelerator",
    "200+ VC Fund Partners",
    "1000+ Angels, CFOs, CXOs",
    "GRO8 Club — Invite-Only"
  ],
  nav: {
    logo: "888vc",
    links: [
      { label: "Investors", href: "/investors" },
      { 
        label: "Program", 
        href: "#", 
        hasDropdown: true,
        dropdownItems: [
          { label: "Gro8 Accelerator Program", href: "/startup" },
          { label: "Gro8 Club", href: "https://gro8.club/" }
        ]
      },
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "FAQ", href: "#" }
    ],
    cta: "Join Our Community",
    ctaHref: "/startup"
  },
  hero: {
    slides: [
      {
        eyebrow: "EARLY-STAGE VENTURE CAPITAL · INDIA × US",
        title: "Backing Those Who Dare to Build Beyond Limits",
        bgImage: "/assets/webimages/Homepage/Hero/1.JPG"
      },
      {
        eyebrow: "DYNAMIC SECTOR FOCUS · GLOBAL IMPACT",
        title: "Backing Those Who Dare to Redefine Industries",
        bgImage: "/assets/webimages/Homepage/Hero/2.JPG"
      },
      {
        eyebrow: "CROSS-BORDER ACCELERATION · INDIA × US",
        title: "Backing Those Who Dare to Go Cross-Border",
        bgImage: "/assets/webimages/Homepage/Hero/3.JPG"
      },
      {
        eyebrow: "LONG-TERM VISION · STRATEGIC CAPITAL",
        title: "Backing Those Who Dare to Create Generational Companies",
        bgImage: "/assets/webimages/Homepage/Hero/4.jpg"
      }
    ]
  },
  statsStrip: [
    { value: 50, suffix: "+", label: "STARTUPS INVESTED" },
    { prefix: "$", value: 1, suffix: "Bn+", label: "COMBINED VALUATION" },
    { value: 200, suffix: "+", label: "SEED/EARLY VC FUNDS" },
    { value: 1000, suffix: "+", label: "ANGELS, CFOS, CXOS" },
    { value: 100, suffix: "+", label: "CXOS FROM THE US" },
    { value: 50, suffix: "+", label: "FAMILY OFFICES" }
  ],
  valueProps: {
    tag: "WHAT WE OFFER",
    title: "Top Global Accelerator Fund",
    description: "A global community of successful founders and strategic angels — supporting early-stage startups with funding, business development, and global networking.",
    cards: [
      {
        title: "Startups",
        description: "Fast & flexible funding built for founders. Mentorship, market access, and growth resources to expand internationally.",
        cta: "Apply Now →",
        href: "/startup",
        image: "/assets/webimages/Homepage/ValueProps/Startup.jpg"
      },
      {
        title: "Investors",
        description: "Connect with pre-vetted startups across dynamic sectors with cross-border routes to US and UAE markets.",
        cta: "Join Network →",
        href: "/investors",
        image: "/assets/webimages/Homepage/ValueProps/Investor.jpg"
      },
      {
        title: "Ecosystem Partners",
        description: "Curated global community of founders, investors and funds. Product credits and services at every growth stage.",
        cta: "Learn More →",
        href: "/about",
        image: "/assets/webimages/Homepage/ValueProps/Ecosystem%20Partner.jpg"
      }
    ]
  },
  portfolio: {
    tag: "OUR PORTFOLIO",
    title: "50+ Companies. $1Bn+ Combined Valuation.",
    items: [
      { name: "Babai Tiffins", category: "Food Tech", image: "/assets/webimages/Portfolio/Thumbnail/Babai%20Tiffins.png", logo: "/assets/webimages/Portfolio/Logo/Babai%20Tiffins.png" },
      { name: "Multipl", category: "Fintech", image: "/assets/webimages/Portfolio/Thumbnail/Multipl.png", logo: "/assets/webimages/Portfolio/Logo/Multipl.png", badge: "Series A" },
      { name: "DaanVeda", category: "Social Impact", image: "/assets/webimages/Portfolio/Thumbnail/DaanVeda.png", logo: "/assets/webimages/Portfolio/Logo/DaanVeda.png" },
      { name: "UKHI", category: "CleanTech", image: "/assets/webimages/Portfolio/Thumbnail/UKHI.png", logo: "/assets/webimages/Portfolio/Logo/UKHI.png" },
      { name: "GetCrest.ai", category: "AI", image: "/assets/webimages/Portfolio/Thumbnail/GetCrest%20ai.png", logo: "/assets/webimages/Portfolio/Logo/GetCrest.png" },
      { name: "HomeCapital", category: "Proptech", image: "/assets/webimages/Portfolio/Thumbnail/HomeCapital.png", logo: "/assets/webimages/Portfolio/Logo/HomeCapital.png" },
      { name: "Pick My Work", category: "Gig Economy", image: "/assets/webimages/Portfolio/Thumbnail/Pick%20My%20Work.png", logo: "/assets/webimages/Portfolio/Logo/Pick%20My%20Work.png" },
      { name: "EcoRatings", category: "ESG / AI", image: "/assets/webimages/Portfolio/Thumbnail/EcoRatings.png", logo: "/assets/webimages/Portfolio/Logo/EcoRatings.png" },
      { name: "Datazip", category: "Data / AI", image: "/assets/webimages/Portfolio/Thumbnail/Datazip.png", logo: "/assets/webimages/Portfolio/Logo/Datazip.png" },
      { name: "G.O.A.T Brand Labs", category: "D2C", image: "/assets/webimages/Portfolio/Thumbnail/G.O.A.T%20Brand%20Labs.png", logo: "/assets/webimages/Portfolio/Logo/G.O.A.T%20Brand%20Labs.png", badge: "Soonicorn" },
      { name: "Sanfe", category: "FemTech", image: "/assets/webimages/Portfolio/Thumbnail/Sanfe.png", logo: "/assets/webimages/Portfolio/Logo/Sanfe.png" },
      { name: "IGoWise", category: "EV / Mobility", image: "/assets/webimages/Portfolio/Thumbnail/IGoWise.png", logo: "/assets/webimages/Portfolio/Logo/IGoWise.png" },
      { name: "Rooter", category: "Gaming", image: "/assets/webimages/Portfolio/Thumbnail/Rooter.png", logo: "/assets/webimages/Portfolio/Logo/Rooter.png", badge: "Series A" }
    ]
  },
  team: {
    tag: "THE TEAM",
    title: "Meet Our Core Team",
    founder: {
      name: "Rohit Bafna",
      role: "FOUNDER & CEO",
      bio: "10+ years of VC experience. Syndicated 100+ investments across AI, Deep Tech, Manufacturing, and Consumer. Master's in Global Finance, Fordham University, New York.",
      image: "/assets/webimages/Homepage/Team/Rohit%20Bafna.png"
    },
    members: [
      { name: "Palak Devpura", role: "Investments & Legal Head", image: "/assets/webimages/Homepage/Team/Palak%20Devpura.png" },
      { name: "Harshita Kushwah", role: "Finance Partner, UAE", image: "/assets/webimages/Homepage/Team/Harshita%20Kushwah.png" },
      { name: "Darshan Doshi", role: "Venture Partner", image: "/assets/webimages/Homepage/Team/Darshan%20Doshi.png" },
      { name: "Kush Vatsaraj", role: "Venture Partner", image: "/assets/webimages/Homepage/Team/Kush%20Vatsaraj.png" },
      { name: "Girish Ahirwar", role: "Technology Advisor, UAE", image: "/assets/webimages/Homepage/Team/Girish%20Ahirwar.png" }
    ]
  },
  gro8: {
    tag: "THE GRO8 PLATFORM",
    title: "Be a part of our all-inclusive ecosystem of change-makers",
    features: [
      {
        title: "Comprehensive Investment Services",
        description: "GRO8 offers SPV formation to Angel Investments, ensuring startups secure timely funding. Fund Formation and Operations support included."
      },
      {
        title: "Global Mentorship & Community",
        description: "Connect entrepreneurs with top mentors globally. Access the exclusive 888vc Club of Leaders — an invite-only community of industry visionaries."
      },
      {
        title: "Cross-Border Investment",
        description: "US–UAE Global Pitch Days and $10M USD syndication. Dollar-based Feeder Offshore Syndicate for seamless cross-border investments."
      }
    ]
  },
  testimonials: {
    tag: "FOUNDER STORIES",
    title: "The 888vc Community",
    description: "With 50+ investments and $100Mn+ syndicated, we're building the largest cross-border community.",
    items: [
      {
        company: "EcoRatings",
        quote: "We are grateful to 888vc for investing in us and building our fund raise. They brought in much needed guidance through their network.",
        author: "Aditi Balbir",
        role: "Co-Founder, EcoRatings",
        image: "/assets/webimages/Homepage/Testimonials/Aditi%20Balbir.png"
      },
      {
        company: "getcrest.ai",
        quote: "888 not only provided us with funds but much needed mentorship and guidance. The team genuinely goes above and beyond.",
        author: "Rahul Vishwakarma",
        role: "Founder, getcrest.ai",
        image: "/assets/webimages/Homepage/Testimonials/Rahul%20Vishwakarma.png"
      },
      {
        company: "PickMyWork",
        quote: "We got the pleasure to meet 888vc, who assisted us by participating in our first round of fundraising and constructing the entire round.",
        author: "Vidyarthi Baddireddy",
        role: "Founder, PickMyWork",
        image: "/assets/webimages/Homepage/Testimonials/Vidyarthi%20Baddireddy.png"
      }
    ]
  },
  news: {
    tag: "LATEST NEWS",
    title: "888vc in the News",
    featured: {
      category: "INC42",
      title: "888VC Launches INR 175 Cr Fund To Back Early Stage Deeptech Startups",
      date: "Sep 22, 2025",
      readTime: "3 min read",
      image: "https://asset.inc42.com/2025/09/888vc-760x570.jpg",
      url: "https://inc42.com/buzz/888vc-launches-inr-175-cr-fund-to-back-early-stage-deeptech-startups/"
    },
    list: [
      { 
        category: "VCCIRCLE", 
        title: "Cross-Border Investment Platform 888VC Floats Maiden VC Fund", 
        date: "Sep 22, 2025", 
        image: "https://assets.vccircle.com/uploads/2022/08/Venturecapitalrfxl.jpg",
        url: "https://www.vccircle.com/crossborder-investment-platform-888vc-floats-maiden-vc-fund"
      },
      { 
        category: "TICE NEWS", 
        title: "888VC Bets Big On India’s Deeptech With Maiden ₹175 Cr Fund", 
        date: "Sep 22, 2025", 
        image: "https://img-cdn.publive.online/fit-in/1200x675/tice-news-prod/media/media_files/2025/09/22/888vc-bets-big-on-indian-deeptech-startups-2025-09-22-21-23-00.jpg",
        url: "https://www.tice.news/tice-trending/888vc-bets-big-on-indias-deeptech-with-maiden-175-cr-fund-10490304"
      },
      { 
        category: "SILICONINDIA", 
        title: "888VC Launches Rs 175 Crore Fund for AI, Deep-Tech & Sustainability Startups", 
        date: "Sep 23, 2025", 
        image: "https://www.siliconindia.com//news/newsimages/vJ1Gnby5.jpg",
        url: "https://www.siliconindia.com/news/startups/888vc-launches-rs-175-crore-fund-for-ai-deeptech--sustainability-startups-nid-237815-cid-19.html"
      },
      { 
        category: "YOURSTORY", 
        title: "Early-stage VC firm 888VC launches Rs 175 Cr fund to back deeptech startups", 
        date: "Sep 22, 2025", 
        image: "https://images.yourstory.com/cs/2/220356402d6d11e9aa979329348d4c3e/funding-1738596571214.png?mode=fit&crop=faces&ar=16%3A9&format=auto&w=1920&q=75",
        url: "https://yourstory.com/2025/09/early-stage-vc-firm-888vc-launches-rs-175-cr-fund"
      }
    ]
  }
};

