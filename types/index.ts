export type NavLink = {
    name: string;
    href: string;
};

export type ButtonProps = {
    onClick?: () => void;
    href?: string;
    className?: string;
    px?: string;
    white?: boolean;
    children?: React.ReactNode;
};

export type FeatureType = {
    hashtag: string;
    title: string;
    description: string;
    card?: string;
};

export type PricingPlan = {
    name: string;
    price: number;
    features: string[];
}