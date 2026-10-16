export default function Newsletter() {
    return (
        <section className="px-6 py-24">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-8 md:p-14">
                {/* Background glow */}
                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0fff37]/10 blur-[100px]" />

                <div className="relative z-10">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0fff37]">
                        Stay in the loop
                    </div>

                    <h2 className="mt-5 max-w-3xl">
                        <span className="md:text-4xl text-2xl font-black tracking-[-0.04em] text-white">Intelligence.</span>
                        <br />
                        <span className="text-white/30 md:text-2xl text-xl">Insights. No noise.</span>
                    </h2>

                    <form className="mt-10 flex max-lg:flex-col max-w-2xl gap-3 sm:flex-row">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="h-14 max-lg:rounded-full flex-1 rounded-tl-full rounded-bl-full p-3 border border-white/10 bg-black/40 px-6 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#0fff37]"
                        />

                        <button
                            type="submit"
                            className="md:h-14 h-10 max-lg:rounded-full rounded-tr-full rounded-br-full bg-[#0fff37] px-7 text-xs font-black uppercase tracking-wider text-black transition hover:bg-[#64ff4d]"
                        >
                            Subscribe ↗
                        </button>
                    </form>

                    <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                        No spam. Only signal.
                    </p>
                </div>
            </div>
        </section>
    );
}