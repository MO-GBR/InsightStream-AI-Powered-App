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

export type EventType = {
    type: string;
    sentimentChange: number;
    timestamp: string;
    keyword: string;
    mentionsSpike: number;
    explanation: string;
}

export type ChunckType = {
    id: string;
    content: string;
    embedding: number[];
    docId: string;
};

export type ProjectType = {
    id?: string;
    name: string;
    keyword: string
    competitorKeyword?: string;
    brandVoice: string;
};

export type ProjectStore = {
    projects: ProjectType[];
    currentProject: ProjectType | null;

    setProjects: (projects: ProjectType[]) => void;
    setCurrentProject: (project: ProjectType) => void;

    fetchProjects: () => Promise<void>;
};