import MagneticButton from "./MagneticButton";

export default function PricingCard({
    title,
    price,
    features,
    popular
}: {
    title: string;
    price: string;
    features: string[];
    popular?: boolean;
}) {
    return (
        <div
            className={`relative mx-auto max-w-md overflow-hidden rounded-3xl border p-8 ${
                popular
                    ? "border-[#0fff37]/50 bg-[#0fff37]/[0.04]"
                    : "border-white/10 bg-white/[0.025]"
                }`
            }
        >
            {popular && (
                <div className="absolute right-5 top-5 rounded-full bg-[#0fff37] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-black">
                    Recommended
                </div>
            )}

            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#0fff37]">PLAN_01</div>

            <h3 className="mt-8 text-2xl font-bold text-white">{title}</h3>

            <div className="mt-5">
                <span className="text-5xl font-black tracking-tight text-white">{price.split("/")[0]}</span>
                <span className="text-white/40">/{price.split("/")[1]}</span>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <ul className="space-y-4">
                {features.map((feature) => (
                    <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-white/60"
                    >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0fff37]/10 text-xs text-[#0fff37]">
                            ✓
                        </span>

                        {feature}
                    </li>
                ))}
            </ul>

            <MagneticButton className="mt-10 w-full justify-center">
                Get started
            </MagneticButton>
        </div>
    );
}