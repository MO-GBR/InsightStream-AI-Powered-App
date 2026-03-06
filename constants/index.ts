import { FeatureType, NavLink, PricingPlan } from "@/types";

export const NavLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
];

export const FeaturesData: FeatureType[] = [
    {
        hashtag: 'Stop_Guessing_Start_Sensing',
        title: 'The Real-Time Vibe Tracker',
        description: `Experience your brand's pulse in high definition. Our Gemini-powered dashboard streams live mentions and visualizes the "digital room" using fluid, real-time animations. Don't just read data—feel the shift as it happens.`,
    },
    {
        hashtag: 'The_Crisis_Shield',
        title: 'Your 24/7 PR Bodyguard.',
        description: 'PR disasters don’t wait for office hours. Crisis Shield monitors sentiment anomalies and pings you the second a trend turns sour. Detect the smoke before the fire spreads and protect your reputation with instant, proactive alerts.',
    },
    {
        hashtag: 'One-Click_Reputation',
        title: 'From Complaint to Compliment in One Click.',
        description: "Never stare at a blank reply box again. Generate perfectly branded responses tailored to your company's unique voice. Whether it’s a professional fix or a witty comeback, our AI drafts the right words so you can close the loop in seconds.",
    },
    {
        hashtag: 'Know_Your_Vibe_Know_Theirs_Better',
        title: 'The War Room',
        description: 'Winning the market requires knowing the scoreboard. Side-by-side competitor benchmarking reveals where your rivals are failing—and where you can win. Spot the gaps in their strategy and capture their customers with data-backed precision.',
    },
    {
        hashtag: 'Your_Brand’s_Morning_Brief —To Go.',
        title: 'Executive Voice Briefing',
        description: 'Too busy for charts? Listen to your data. Get a 60-second AI audio summary of the last 24 hours. Perfect for the commute or between meetings, our Voice Briefing keeps you informed without ever having to open a laptop.',
    },
    {
        hashtag: 'The_Knowledge_Vault',
        title: 'Chat with PDFs',
        description: 'Upload your brand guidelines, market reports, or strategy decks and watch them come to life. InsightStream analyzes live social data through the lens of your internal documents, ensuring every AI insight aligns perfectly with your long-term goals.',
    }
];

export const PricingPlans: PricingPlan[] = [
    {
        name: 'Basic',
        price: 19,
        features: [
            'Real-Time Vibe Tracker',
            'Crisis Shield',
            'One-Click Reputation',
        ],
    },
    {
        name: 'Pro',
        price: 49,
        features: [
            'Real-Time Vibe Tracker',
            'Crisis Shield',
            'One-Click Reputation',
            'The War Room',
            'Executive Voice Briefing',
        ],
    }
];

export const UpcomingFeatures: { feature: string; about: string }[] = [
    {
        feature: 'Voice Commands',
        about: 'Control your experience with voice commands.',
    },
    {
        feature: 'AI-Powered Content Creation',
        about: 'Generate engaging social media posts and responses with AI assistance.',
    },
    {
        feature: 'Advanced Analytics',
        about: 'Get deeper insights into your brand’s performance with enhanced analytics tools.',
    }
];