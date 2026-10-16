import Logo from "../Logo";

const footerLinks = {
    Product: [
        "Vibe Tracker",
        "Crisis Shield",
        "War Room",
        "Knowledge Vault",
    ],
    Company: ["About", "Pricing", "Contact", "Careers"],
    Legal: ["Privacy", "Terms", "Security"],
};

export default function Footer() {
    return (
        <footer className="border-t border-white/10 px-6 pb-8 pt-20">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-4">
                            <Logo square="h-16 w-16" dot="h-4 w-4" />
                            <div className="text-3xl font-black tracking-[-0.07em] text-white md:text-7xl">
                                INSIGHT
                                <br />
                                <span className="text-[#0fff37]">STREAM</span>
                            </div>
                        </div>

                        <p className="mt-7 max-w-sm text-sm leading-6 text-white/35">
                            Intelligence for brands that want to understand the
                            conversation before everyone else.
                        </p>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#0fff37]">
                                {category}
                            </h3>

                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-white/40 transition-colors hover:text-white"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-7 text-[10px] uppercase tracking-wider text-white/25 sm:flex-row sm:items-center sm:justify-between">
                    <span>© 2026 InsightStream. All rights reserved.</span>

                    <span className="font-mono">
                        Built for signal. Designed for clarity.
                    </span>
                </div>
            </div>
        </footer>
    );
}